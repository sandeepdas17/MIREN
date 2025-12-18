import { z } from "zod";

export const confidenceLevels = ["confident", "somewhat", "not-confident"] as const;

export const topicSchema = z.object({
  id: z.string(),
  subjectId: z.string(),
  title: z.string().min(1, "Topic title is required"),
  confidence: z.enum(["confident", "somewhat", "not-confident"]),
});

export const subjectSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Subject name is required"),
  topics: z.array(topicSchema),
});

export const insertSubjectSchema = z.object({
  name: z.string().min(1, "Subject name is required"),
});

export const insertTopicSchema = z.object({
  subjectId: z.string().min(1),
  title: z.string().min(1, "Topic title is required"),
  confidence: z.enum(["confident", "somewhat", "not-confident"]).default("not-confident"),
});

export const updateTopicConfidenceSchema = z.object({
  confidence: z.enum(["confident", "somewhat", "not-confident"]),
});

export type Topic = z.infer<typeof topicSchema>;
export type Subject = z.infer<typeof subjectSchema>;
export type InsertSubject = z.infer<typeof insertSubjectSchema>;
export type InsertTopic = z.infer<typeof insertTopicSchema>;
export type UpdateTopicConfidence = z.infer<typeof updateTopicConfidenceSchema>;
export type ConfidenceLevel = Topic["confidence"];
