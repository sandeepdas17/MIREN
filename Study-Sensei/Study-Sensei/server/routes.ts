import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertSubjectSchema,
  insertTopicSchema,
  updateTopicConfidenceSchema,
} from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Subjects routes
  app.get("/api/subjects", async (_req, res) => {
    try {
      const subjects = await storage.getAllSubjects();
      res.json(subjects);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch subjects" });
    }
  });

  app.post("/api/subjects", async (req, res) => {
    try {
      const data = insertSubjectSchema.parse(req.body);
      const subject = await storage.createSubject(data);
      res.status(201).json(subject);
    } catch (error) {
      res.status(400).json({ error: "Invalid subject data" });
    }
  });

  app.patch("/api/subjects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const data = insertSubjectSchema.parse(req.body);
      const subject = await storage.updateSubject(id, { name: data.name });
      if (!subject) {
        res.status(404).json({ error: "Subject not found" });
        return;
      }
      res.json(subject);
    } catch (error) {
      res.status(400).json({ error: "Invalid subject data" });
    }
  });

  app.delete("/api/subjects/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteSubject(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete subject" });
    }
  });

  // Topics routes
  app.post("/api/topics", async (req, res) => {
    try {
      const data = insertTopicSchema.parse(req.body);
      const topic = await storage.createTopic(data);
      res.status(201).json(topic);
    } catch (error) {
      res.status(400).json({ error: "Invalid topic data" });
    }
  });

  app.patch("/api/topics/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const data = updateTopicConfidenceSchema.parse(req.body);
      const topic = await storage.updateTopicConfidence(id, data.confidence);
      if (!topic) {
        res.status(404).json({ error: "Topic not found" });
        return;
      }
      res.json(topic);
    } catch (error) {
      res.status(400).json({ error: "Invalid topic data" });
    }
  });

  app.delete("/api/topics/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteTopic(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Failed to delete topic" });
    }
  });

  return httpServer;
}
