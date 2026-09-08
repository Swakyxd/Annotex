/**
 * Label form types and validation schemas
 */

export interface LabelFormData {
  value: string;
  confidence: number;
  notes?: string;
}

export interface LabelFormErrors {
  value?: string;
  confidence?: string;
  notes?: string;
}

/**
 * Validation rules for label submissions
 */
export const LABEL_VALIDATION = {
  MIN_VALUE_LENGTH: 1,
  MAX_VALUE_LENGTH: 500,
  MIN_CONFIDENCE: 0,
  MAX_CONFIDENCE: 1,
  MAX_NOTES_LENGTH: 1000,
} as const;

/**
 * Validate label form data
 */
export function validateLabelForm(data: Partial<LabelFormData>): LabelFormErrors {
  const errors: LabelFormErrors = {};

  // Validate value
  if (!data.value || data.value.trim().length === 0) {
    errors.value = 'Label value is required';
  } else if (data.value.length > LABEL_VALIDATION.MAX_VALUE_LENGTH) {
    errors.value = `Label value cannot exceed ${LABEL_VALIDATION.MAX_VALUE_LENGTH} characters`;
  }

  // Validate confidence
  if (data.confidence === null || data.confidence === undefined) {
    errors.confidence = 'Confidence score is required';
  } else if (data.confidence < LABEL_VALIDATION.MIN_CONFIDENCE || data.confidence > LABEL_VALIDATION.MAX_CONFIDENCE) {
    errors.confidence = 'Confidence must be between 0 and 1';
  }

  // Validate notes (optional)
  if (data.notes && data.notes.length > LABEL_VALIDATION.MAX_NOTES_LENGTH) {
    errors.notes = `Notes cannot exceed ${LABEL_VALIDATION.MAX_NOTES_LENGTH} characters`;
  }

  return errors;
}

/**
 * Check if form has any errors
 */
export function hasFormErrors(errors: LabelFormErrors): boolean {
  return Object.values(errors).some((error) => error !== undefined);
}

/**
 * Get error message for a field
 */
export function getFieldError(errors: LabelFormErrors, field: keyof LabelFormErrors): string | undefined {
  return errors[field];
}

/**
 * Confidence level descriptions for UI display
 */
export const CONFIDENCE_LEVELS = {
  VERY_LOW: { min: 0, max: 0.2, label: 'Very Low', color: 'border border-black/10 bg-white/60 text-muted' },
  LOW: { min: 0.2, max: 0.4, label: 'Low', color: 'border border-black/10 bg-white/60 text-foreground' },
  MEDIUM: { min: 0.4, max: 0.6, label: 'Medium', color: 'border border-black/15 bg-white/70 text-foreground' },
  HIGH: { min: 0.6, max: 0.8, label: 'High', color: 'border border-black/20 bg-black/5 text-foreground' },
  VERY_HIGH: { min: 0.8, max: 1, label: 'Very High', color: 'bg-black text-white' },
} as const;

/**
 * Get confidence level for a given value
 */
export function getConfidenceLevel(confidence: number) {
  const level = Object.values(CONFIDENCE_LEVELS).find(
    (l) => confidence >= l.min && confidence <= l.max
  );
  return level || CONFIDENCE_LEVELS.VERY_LOW;
}

/**
 * Common label suggestions for different task types
 */
export const LABEL_SUGGESTIONS = {
  Classification: ['Class A', 'Class B', 'Class C', 'Other'],
  Detection: ['Object Detected', 'No Object', 'Unclear'],
  Segmentation: ['Boundary Defined', 'Incomplete', 'Unable to Segment'],
  Transcription: ['Transcribed', 'Unclear Audio', 'Multiple Speakers'],
  Sentiment: ['Positive', 'Negative', 'Neutral', 'Mixed'],
} as const;

/**
 * Format confidence as percentage
 */
export function formatConfidencePercent(confidence: number): string {
  return `${Math.round(confidence * 100)}%`;
}
