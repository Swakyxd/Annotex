'use client';

import {
  formatConfidencePercent,
  getConfidenceLevel,
  hasFormErrors,
  LABEL_SUGGESTIONS,
  LabelFormData,
  LabelFormErrors,
  validateLabelForm,
} from '@/app/(app)/dashboard/labels/label-form.types';
import { useSubmitLabel } from '@/hooks/use-labels';
import { CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useCallback, useState } from 'react';

interface LabelSubmitFormProps {
  taskId: string;
  taskTitle?: string;
  labelType?: string;
  labelOptions?: string[];
  onSuccess?: () => void;
  onCancel?: () => void;
  autoFocus?: boolean;
}

/** LabelSubmitForm — Submit a label for a task */
export function LabelSubmitForm({
  taskId,
  taskTitle = 'Task',
  labelType,
  labelOptions,
  onSuccess,
  onCancel,
  autoFocus = true,
}: LabelSubmitFormProps) {
  const { submitLabel, isSubmitting, error, feedback } = useSubmitLabel();

  const [formData, setFormData] = useState<LabelFormData>({ value: '', confidence: 0.5, notes: '' });
  const [errors, setErrors] = useState<LabelFormErrors>({});
  const [showSuggestions, setShowSuggestions] = useState(false);

  const effectiveSuggestions =
    labelOptions && labelOptions.length > 0 ? labelOptions : (LABEL_SUGGESTIONS.Classification ?? []);

  const valuePlaceholder =
    labelOptions && labelOptions.length > 0
      ? `Choose from: ${labelOptions.join(', ')}`
      : labelType === 'text'
        ? 'Enter your label text'
        : 'Enter label value';

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, value: e.target.value }));
    if (errors.value) setErrors((prev) => ({ ...prev, value: undefined }));
  };

  const handleConfidenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, confidence: parseFloat(e.target.value) }));
    if (errors.confidence) setErrors((prev) => ({ ...prev, confidence: undefined }));
  };

  const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, notes: e.target.value }));
    if (errors.notes) setErrors((prev) => ({ ...prev, notes: undefined }));
  };

  const handleSuggestionClick = (suggestion: string) => {
    setFormData((prev) => ({ ...prev, value: suggestion }));
    setShowSuggestions(false);
    setErrors((prev) => ({ ...prev, value: undefined }));
  };

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const validationErrors = validateLabelForm(formData);
      if (hasFormErrors(validationErrors)) { setErrors(validationErrors); return; }
      const result = await submitLabel(taskId, { value: formData.value.trim(), confidence: formData.confidence });
      if (result) {
        setFormData({ value: '', confidence: 0.5, notes: '' });
        setErrors({});
        onSuccess?.();
        setTimeout(() => { setFormData({ value: '', confidence: 0.5, notes: '' }); }, 3000);
      }
    },
    [formData, submitLabel, taskId, onSuccess]
  );

  const confidenceLevel = getConfidenceLevel(formData.confidence);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Success feedback */}
      {feedback && (
        <div className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white/80 px-4 py-3">
          <CheckCircle2 className="size-4 shrink-0 text-foreground" aria-hidden="true" />
          <p className="text-sm font-medium">{feedback}</p>
        </div>
      )}

      {/* Error feedback */}
      {error && (
        <div className="flex items-start gap-3 rounded-2xl border border-black/10 bg-white/80 px-4 py-3">
          <AlertCircle className="size-4 shrink-0 text-foreground mt-0.5" aria-hidden="true" />
          <div>
            <p className="text-sm font-semibold">Submission Failed</p>
            <p className="mt-0.5 text-sm text-muted">{error.message}</p>
          </div>
        </div>
      )}

      {/* Label value */}
      <div className="space-y-2">
        <label htmlFor="label-value" className="block text-sm font-semibold">
          Label Value <span className="text-muted font-normal">*</span>
        </label>
        <input
          id="label-value"
          type="text"
          value={formData.value}
          onChange={handleValueChange}
          placeholder={valuePlaceholder}
          list={effectiveSuggestions.length > 0 ? 'label-suggestions' : undefined}
          autoFocus={autoFocus}
          disabled={isSubmitting}
          className={`field text-sm disabled:opacity-50 ${errors.value ? 'border-black/30 ring-0' : ''}`}
        />
        {errors.value && <p className="text-xs text-muted">{errors.value}</p>}

        {effectiveSuggestions.length > 0 && (
          <datalist id="label-suggestions">
            {effectiveSuggestions.map((s) => <option key={s} value={s} />)}
          </datalist>
        )}

        {!formData.value && (
          <div>
            <button
              type="button"
              onClick={() => setShowSuggestions(!showSuggestions)}
              className="text-xs text-muted hover:text-foreground font-medium mt-1 transition"
            >
              {showSuggestions ? 'Hide suggestions' : 'Show suggestions'}
            </button>
            {showSuggestions && (
              <div className="mt-2 flex flex-wrap gap-2">
                {effectiveSuggestions.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => handleSuggestionClick(s)}
                    className="rounded-full border border-black/10 bg-white/70 px-3 py-1 text-xs font-semibold transition hover:bg-white hover:border-black/20"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Confidence score */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label htmlFor="confidence" className="block text-sm font-semibold">
            Confidence Level <span className="text-muted font-normal">*</span>
          </label>
          <span className="rounded-full border border-black/10 bg-white/70 px-2.5 py-1 text-xs font-semibold">
            {confidenceLevel.label} ({formatConfidencePercent(formData.confidence)})
          </span>
        </div>

        <input
          id="confidence"
          type="range"
          min="0"
          max="1"
          step="0.05"
          value={formData.confidence}
          onChange={handleConfidenceChange}
          disabled={isSubmitting}
          className="w-full h-1.5 cursor-pointer appearance-none rounded-full bg-black/10 accent-black disabled:opacity-50"
        />

        <div className="flex justify-between text-[0.65rem] text-muted">
          <span>0%</span><span>25%</span><span>50%</span><span>75%</span><span>100%</span>
        </div>
        {errors.confidence && <p className="text-xs text-muted">{errors.confidence}</p>}
      </div>

      {/* Notes */}
      <div className="space-y-2">
        <label htmlFor="notes" className="block text-sm font-semibold">
          Notes <span className="text-muted font-normal">(Optional)</span>
        </label>
        <textarea
          id="notes"
          value={formData.notes ?? ''}
          onChange={handleNotesChange}
          placeholder="Add any notes about your label submission…"
          disabled={isSubmitting}
          rows={3}
          className={`field text-sm resize-none disabled:opacity-50 ${errors.notes ? 'border-black/30' : ''}`}
        />
        {errors.notes && <p className="text-xs text-muted">{errors.notes}</p>}
        <p className="text-xs text-muted">{(formData.notes ?? '').length} / 1000</p>
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-1">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary flex-1 py-3 text-sm disabled:opacity-50"
        >
          {isSubmitting ? (
            <><Loader2 className="mr-2 inline-block size-4 animate-spin" />Submitting…</>
          ) : (
            'Submit Label'
          )}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="btn-secondary flex-1 py-3 text-sm disabled:opacity-50"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
