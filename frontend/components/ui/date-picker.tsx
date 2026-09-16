"use client";

import { useEffect, useRef, useState } from "react";
import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

const DAYS   = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const MONTHS_SHORT = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const MONTHS_LONG  = [
  "January","February","March","April","May","June",
  "July","August","September","October","November","December",
];

type View = "day" | "month" | "year";

interface DatePickerProps {
  value: string;        // "YYYY-MM-DD"
  onChange: (v: string) => void;
  min?: string;         // "YYYY-MM-DD"
  placeholder?: string;
  id?: string;
}

function parseYMD(str: string): Date | null {
  if (!str) return null;
  const d = new Date(str + "T00:00:00");
  return isNaN(d.getTime()) ? null : d;
}

function toYMD(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Accept typed strings like "09/25/2025", "25-09-2025", "2025-09-25", "Sep 25 2025" */
function parseTyped(raw: string): Date | null {
  if (!raw.trim()) return null;
  // Try native parse first (handles ISO, long-form English, etc.)
  const native = new Date(raw);
  if (!isNaN(native.getTime())) return native;
  // mm/dd/yyyy or dd-mm-yyyy
  const parts = raw.split(/[\\/\-.]/).map(Number);
  if (parts.length === 3) {
    const [a, b, c] = parts;
    // if c looks like a year (>= 1000)
    if (c >= 1000) {
      // mm/dd/yyyy
      const d1 = new Date(c, a - 1, b);
      if (!isNaN(d1.getTime())) return d1;
      // dd/mm/yyyy
      const d2 = new Date(c, b - 1, a);
      if (!isNaN(d2.getTime())) return d2;
    }
    // yyyy-mm-dd already caught above
  }
  return null;
}

export function DatePicker({ value, onChange, min, placeholder = "dd / mm / yyyy", id }: DatePickerProps) {
  const today = new Date(); today.setHours(0,0,0,0);
  const minDate = parseYMD(min ?? "") ?? today;
  const selected = parseYMD(value);

  const [open, setOpen]         = useState(false);
  const [view, setView]         = useState<View>("day");
  const [viewYear, setViewYear]  = useState((selected ?? today).getFullYear());
  const [viewMonth, setViewMonth]= useState((selected ?? today).getMonth());
  // year-picker page: shows 12 years at a time
  const [yearBase, setYearBase]  = useState(Math.floor((selected ?? today).getFullYear() / 12) * 12);
  // typed text in the input
  const [typed, setTyped]        = useState(value ? formatDisplay(value) : "");

  const ref = useRef<HTMLDivElement>(null);

  function formatDisplay(ymd: string): string {
    const d = parseYMD(ymd);
    if (!d) return "";
    return `${String(d.getDate()).padStart(2,"0")} / ${String(d.getMonth()+1).padStart(2,"0")} / ${d.getFullYear()}`;
  }

  // Sync typed display when value prop changes externally
  useEffect(() => {
    setTyped(value ? formatDisplay(value) : "");
  }, [value]);

  // Close on outside click
  useEffect(() => {
    const h = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const openCalendar = () => {
    setView("day");
    setOpen(true);
  };

  const commit = (d: Date) => {
    onChange(toYMD(d));
    setTyped(formatDisplay(toYMD(d)));
    setOpen(false);
  };

  const handleTyped = (raw: string) => {
    setTyped(raw);
    const parsed = parseTyped(raw);
    if (parsed) {
      onChange(toYMD(parsed));
      setViewYear(parsed.getFullYear());
      setViewMonth(parsed.getMonth());
    } else if (!raw.trim()) {
      onChange("");
    }
  };

  // ── Day grid ──────────────────────────────────────────────
  const firstDay     = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth  = new Date(viewYear, viewMonth + 1, 0).getDate();
  const daysInPrev   = new Date(viewYear, viewMonth, 0).getDate();
  const cells: Array<{ date: Date; in: boolean }> = [];
  for (let i = firstDay - 1; i >= 0; i--)
    cells.push({ date: new Date(viewYear, viewMonth - 1, daysInPrev - i), in: false });
  for (let d = 1; d <= daysInMonth; d++)
    cells.push({ date: new Date(viewYear, viewMonth, d), in: true });
  while (cells.length < 42)
    cells.push({ date: new Date(viewYear, viewMonth + 1, cells.length - daysInMonth - firstDay + 1), in: false });

  return (
    <div className="relative" ref={ref}>
      {/* ── Trigger: typeable input + calendar icon ── */}
      <div className="relative flex items-center">
        <input
          id={id}
          type="text"
          className="field w-full text-sm"
          style={{ paddingRight: "2.5rem" }}
          placeholder={placeholder}
          value={typed}
          onChange={(e) => handleTyped(e.target.value)}
          onFocus={() => !open && openCalendar()}
          autoComplete="off"
        />
        <button
          type="button"
          tabIndex={-1}
          onClick={() => open ? setOpen(false) : openCalendar()}
          className="absolute right-3 text-muted transition hover:text-foreground"
          aria-label="Open calendar"
        >
          <CalendarDays className="size-4" />
        </button>
      </div>

      {/* ── Dropdown ── */}
      {open && (
        <div className="absolute left-0 top-full z-50 mt-2 w-72 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-[0_8px_32px_rgba(0,0,0,0.13)]">

          {/* ═══ DAY VIEW ═══ */}
          {view === "day" && (<>
            {/* Header */}
            <div className="flex items-center justify-between border-b border-black/8 px-3 py-2.5">
              <button type="button" onClick={() => {
                if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y-1); }
                else setViewMonth(m => m-1);
              }} className="rounded-xl p-1 text-muted hover:bg-black/5 hover:text-foreground transition">
                <ChevronLeft className="size-4" />
              </button>

              <div className="flex items-center gap-1">
                <button type="button" onClick={() => setView("month")}
                  className="rounded-lg px-2 py-0.5 text-sm font-semibold hover:bg-black/5 transition">
                  {MONTHS_LONG[viewMonth]}
                </button>
                <button type="button" onClick={() => { setYearBase(Math.floor(viewYear/12)*12); setView("year"); }}
                  className="rounded-lg px-2 py-0.5 text-sm font-semibold hover:bg-black/5 transition">
                  {viewYear}
                </button>
              </div>

              <button type="button" onClick={() => {
                if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y+1); }
                else setViewMonth(m => m+1);
              }} className="rounded-xl p-1 text-muted hover:bg-black/5 hover:text-foreground transition">
                <ChevronRight className="size-4" />
              </button>
            </div>

            {/* Day-of-week row */}
            <div className="grid grid-cols-7 border-b border-black/5 px-2 py-1.5">
              {DAYS.map(d => (
                <div key={d} className="text-center text-[0.6rem] font-bold uppercase tracking-widest text-muted/70">{d}</div>
              ))}
            </div>

            {/* Date cells */}
            <div className="grid grid-cols-7 gap-y-0.5 px-2 py-2">
              {cells.map(({ date, in: inM }, i) => {
                const ymd = toYMD(date);
                const isSel   = ymd === value;
                const isToday = ymd === toYMD(today);
                const disabled= date < minDate && !isSel;
                return (
                  <button key={i} type="button" disabled={disabled} onClick={() => commit(date)}
                    className={`mx-auto flex size-8 items-center justify-center rounded-full text-xs font-medium transition
                      ${isSel   ? "bg-black text-white"
                      : isToday ? "border border-black/30 text-foreground hover:bg-black/5"
                      : disabled? "cursor-not-allowed text-black/20"
                      : inM     ? "text-foreground hover:bg-black/5"
                      :           "text-black/25"}`}>
                    {date.getDate()}
                  </button>
                );
              })}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between border-t border-black/8 px-4 py-2">
              <button type="button" onClick={() => commit(today)}
                className="text-xs font-semibold text-foreground hover:text-black/60 transition">Today</button>
              {value && (
                <button type="button" onClick={() => { onChange(""); setTyped(""); setOpen(false); }}
                  className="text-xs font-semibold text-muted hover:text-foreground transition">Clear</button>
              )}
            </div>
          </>)}

          {/* ═══ MONTH VIEW ═══ */}
          {view === "month" && (<>
            <div className="flex items-center justify-between border-b border-black/8 px-3 py-2.5">
              <button type="button" onClick={() => setViewYear(y => y-1)}
                className="rounded-xl p-1 text-muted hover:bg-black/5 transition"><ChevronLeft className="size-4" /></button>
              <button type="button" onClick={() => { setYearBase(Math.floor(viewYear/12)*12); setView("year"); }}
                className="rounded-lg px-2 py-0.5 text-sm font-semibold hover:bg-black/5 transition">{viewYear}</button>
              <button type="button" onClick={() => setViewYear(y => y+1)}
                className="rounded-xl p-1 text-muted hover:bg-black/5 transition"><ChevronRight className="size-4" /></button>
            </div>
            <div className="grid grid-cols-3 gap-2 p-4">
              {MONTHS_SHORT.map((m, i) => {
                const isCur = i === viewMonth && viewYear === (selected?.getFullYear() ?? -1);
                return (
                  <button key={m} type="button"
                    onClick={() => { setViewMonth(i); setView("day"); }}
                    className={`rounded-xl py-2 text-sm font-medium transition
                      ${isCur ? "bg-black text-white" : "hover:bg-black/5 text-foreground"}`}>
                    {m}
                  </button>
                );
              })}
            </div>
          </>)}

          {/* ═══ YEAR VIEW ═══ */}
          {view === "year" && (<>
            <div className="flex items-center justify-between border-b border-black/8 px-3 py-2.5">
              <button type="button" onClick={() => setYearBase(b => b-12)}
                className="rounded-xl p-1 text-muted hover:bg-black/5 transition"><ChevronLeft className="size-4" /></button>
              <span className="text-sm font-semibold">{yearBase}–{yearBase+11}</span>
              <button type="button" onClick={() => setYearBase(b => b+12)}
                className="rounded-xl p-1 text-muted hover:bg-black/5 transition"><ChevronRight className="size-4" /></button>
            </div>
            <div className="grid grid-cols-3 gap-2 p-4">
              {Array.from({ length: 12 }, (_, i) => yearBase + i).map(yr => {
                const isCur = yr === viewYear;
                return (
                  <button key={yr} type="button"
                    onClick={() => { setViewYear(yr); setView("month"); }}
                    className={`rounded-xl py-2 text-sm font-medium transition
                      ${isCur ? "bg-black text-white" : "hover:bg-black/5 text-foreground"}`}>
                    {yr}
                  </button>
                );
              })}
            </div>
          </>)}

        </div>
      )}
    </div>
  );
}
