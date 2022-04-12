import mongoose from "mongoose";
export const Submission = mongoose.model(
  "submissions",
  mongoose.Schema(
    {
      questionId: String,
      answer: String,
      timeTaken: Number,
      uuid: String,
    },
    { timestamps: true }
  )
);
