import mongoose, { Schema } from "mongoose";

const QuestionSchema = new Schema({
  type: {
    type: String,
    enum: ["single-text", "text"],
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
    },
  ],
  required: {
    type: Boolean,
    default: true,
  },
});

const QuizSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    questions: [QuestionSchema],
    userId: {
      type: String,
      required: true,
    },
    isPublic: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Quiz", QuizSchema);
