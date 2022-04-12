import * as express from "express";
import { SubmissionService } from "./service/submission-service.mjs";
import { QuestionService } from "./service/question-service.mjs";
import { ReportingService } from "./service/reporting-service.mjs";
export const buildRoutes = (app) => {
  const router = express.Router();
  const questionService = new QuestionService();
  const reportingService = new ReportingService();
  const submissionService = new SubmissionService();

  router.get("/getQuestions", (request, response) => {
    questionService.getTenQuestions().then((data) => response.send(data));
  });

  router.get("/responses", (request, response) => {
    reportingService.downloadReport().then((data) => {
      response.header("Content-Type", "text/csv");
      response.attachment("Responses.csv");
      response.send(data);
    });
  });

  router.post("/submit", (request, response) => {
    submissionService
      .submitAnswers(request.body)
      .then((data) => response.send(data));
  });

  app.use("/api", router);
};
