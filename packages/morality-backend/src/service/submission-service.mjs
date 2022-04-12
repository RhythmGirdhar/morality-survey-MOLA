import log from "log-beautify";
import { Submission } from "../models/submission.mjs";

export class SubmissionService {
  async getAllSubmissions() {
    try {
      log.info("Fetching all submissions");
      return await Submission.find({});
    } catch (err) {
      log.error("Error: ", err);
    }
  }
  async submitAnswers(params) {
    try {
      const submission = new Submission(params);
      log.ok("Submitted the answer");
      return await submission.save();
    } catch (err) {
      log.error("Error: ", err);
    }
  }
}
