import _ from "lodash";
import { QuestionService } from "./question-service.mjs";
import { SubmissionService } from "./submission-service.mjs";
import * as json2csv from "json2csv";
import log from "log-beautify";

export class ReportingService {
  constructor() {
    this._questionService = new QuestionService();
    this._submissionService = new SubmissionService();
    this._questionsMap = {};
  }

  async downloadReport() {
    if (_.isEmpty(this._questionsMap)) {
      log.info("Building Question Map");
      const questions = await this._questionService.getAllQuestions();
      questions.forEach(
        (question) => (this._questionsMap[question.varname] = question)
      );
    }
    const submissions = await this._submissionService.getAllSubmissions();

    const groupedSubmissions = _(submissions)
      .groupBy((submission) => submission.uuid)
      .map((submissions, key) => ({ uuid: key, data: submissions }))
      .value();

    let serialNumber = 0;
    const submissionsToParse = groupedSubmissions.map((submission) => {
      let qId = 0;
      const buildObject = submission.data.map((each) => {
        let id = ++qId;
        return {
          [`Question ${id}`]: this._questionsMap[each.questionId]
            ? this._questionsMap[each.questionId].questiontext
            : "",
          [`Answer ${id}`]: each.answer,
          [`Time Taken ${id}`]: each.timeTaken,
        };
      });

      return {
        "Serial Number": ++serialNumber,
        ..._.merge.apply(null, [{}].concat(buildObject)),
      };
    });

    const parser = new json2csv.Parser({ header: true });
    return parser.parse(submissionsToParse);
  }
}
