import {
  LabelSubmitSchema,
  LabelValidationSchema,
  TaskCreateSchema,
} from '../schemas.js';

describe('API validation schemas', () => {
  it('rejects malformed task payloads', () => {
    const result = TaskCreateSchema.safeParse({
      title: '',
      description: 'A task',
      datasetId: 'not-a-uuid',
      reward: -1,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors).toEqual(
        expect.objectContaining({
          title: expect.any(Array),
          datasetId: expect.any(Array),
          reward: expect.any(Array),
        })
      );
    }
  });

  it('rejects malformed label payloads before service use', () => {
    const result = LabelSubmitSchema.safeParse({
      taskId: 'not-a-uuid',
      value: '',
      confidence: 2,
    });

    expect(result.success).toBe(false);
  });

  it('requires an explicit validator decision', () => {
    const result = LabelValidationSchema.safeParse({ reason: 'Needs review' });

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.flatten().fieldErrors.isAccepted).toEqual([
        'Either isAccepted or action is required',
      ]);
    }
  });
});
