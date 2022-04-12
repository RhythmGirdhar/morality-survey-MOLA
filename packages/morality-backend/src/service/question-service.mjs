import { Question } from "../models/question.mjs";
import log from "log-beautify";

export class QuestionService {
  async getAllQuestions() {
    try {
      log.warning("Fetching all questions");
      return await Question.find({});
    } catch (err) {
      log.error("Error: ", err);
    }
  }
  async getTenQuestions() {
    try {
      log.ok("Fetching 10 questions");
      return await Question.aggregate([{ $sample: { size: 10 } }]);
    } catch (err) {
      log.error("Error: ", err);
    }
  }
}
