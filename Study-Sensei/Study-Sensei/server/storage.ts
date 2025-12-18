import { randomUUID } from "crypto";
import type { Subject, Topic, InsertSubject, InsertTopic, ConfidenceLevel } from "@shared/schema";

export interface IStorage {
  // Subjects
  getAllSubjects(): Promise<Subject[]>;
  getSubject(id: string): Promise<Subject | undefined>;
  createSubject(subject: InsertSubject): Promise<Subject>;
  updateSubject(id: string, data: { name: string }): Promise<Subject | undefined>;
  deleteSubject(id: string): Promise<void>;

  // Topics
  getTopicsBySubject(subjectId: string): Promise<Topic[]>;
  getTopic(id: string): Promise<Topic | undefined>;
  createTopic(topic: InsertTopic): Promise<Topic>;
  updateTopicConfidence(id: string, confidence: ConfidenceLevel): Promise<Topic | undefined>;
  deleteTopic(id: string): Promise<void>;
}

export class MemStorage implements IStorage {
  private subjects: Map<string, Subject>;
  private topics: Map<string, Topic>;

  constructor() {
    this.subjects = new Map();
    this.topics = new Map();
  }

  // Subjects
  async getAllSubjects(): Promise<Subject[]> {
    const subjectsArray = Array.from(this.subjects.values());
    const result: Subject[] = [];
    for (const subject of subjectsArray) {
      const topics = Array.from(this.topics.values()).filter(t => t.subjectId === subject.id);
      result.push({ ...subject, topics });
    }
    return result;
  }

  async getSubject(id: string): Promise<Subject | undefined> {
    const subject = this.subjects.get(id);
    if (!subject) return undefined;
    const topics = Array.from(this.topics.values()).filter(t => t.subjectId === id);
    return { ...subject, topics };
  }

  async createSubject(data: InsertSubject): Promise<Subject> {
    const id = randomUUID();
    const subject: Subject = { id, name: data.name, topics: [] };
    this.subjects.set(id, subject);
    return subject;
  }

  async updateSubject(id: string, data: { name: string }): Promise<Subject | undefined> {
    const subject = this.subjects.get(id);
    if (!subject) return undefined;
    const updated = { ...subject, name: data.name };
    this.subjects.set(id, updated);
    const topics = Array.from(this.topics.values()).filter(t => t.subjectId === id);
    return { ...updated, topics };
  }

  async deleteSubject(id: string): Promise<void> {
    this.subjects.delete(id);
    const topicsToDelete = Array.from(this.topics.keys()).filter(key => {
      const topic = this.topics.get(key);
      return topic?.subjectId === id;
    });
    topicsToDelete.forEach(key => this.topics.delete(key));
  }

  // Topics
  async getTopicsBySubject(subjectId: string): Promise<Topic[]> {
    return Array.from(this.topics.values()).filter(t => t.subjectId === subjectId);
  }

  async getTopic(id: string): Promise<Topic | undefined> {
    return this.topics.get(id);
  }

  async createTopic(data: InsertTopic): Promise<Topic> {
    const id = randomUUID();
    const topic: Topic = {
      id,
      subjectId: data.subjectId,
      title: data.title,
      confidence: data.confidence,
    };
    this.topics.set(id, topic);
    return topic;
  }

  async updateTopicConfidence(id: string, confidence: ConfidenceLevel): Promise<Topic | undefined> {
    const topic = this.topics.get(id);
    if (!topic) return undefined;
    const updated = { ...topic, confidence };
    this.topics.set(id, updated);
    return updated;
  }

  async deleteTopic(id: string): Promise<void> {
    this.topics.delete(id);
  }
}

export const storage = new MemStorage();
