import { z } from "zod";

export const progressSchema = z.object({
  moduleId: z.string().min(1),
  action: z.enum(["start", "complete"]),
  score: z.number().min(0).max(1).optional(),
  timeSpentSeconds: z.number().int().min(0).optional(),
});

export type ProgressInput = z.infer<typeof progressSchema>;
