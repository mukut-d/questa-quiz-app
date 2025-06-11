import mongoose, { mongo, Schema } from "mongoose";

const AnswerSchema = new Schema({
  questionId: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
});

const ResponseSchema = new Schema(
  {
    quizId: {
      type: String,
      required: true,
    },
    answers: [AnswerSchema],
  },
  {
    timestamps: { createdAt: "submittedAt", updatedAt: false },
  }
);

export default mongo.model("Response", ResponseSchema);
