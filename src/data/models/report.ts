import mongoose, { Document, model, Schema } from "mongoose";

export type ReportType = {
  postId: string;
  reportDate: Date;
  resolvedDate: Date;
  reviewState: string;
  assignedModerator: string;
};

const reportSchema: Schema = new Schema(
  {
    postId: {
      type: String,
      required: true,
    },
    reportDate: {
      type: Date,
      default: Date.now,
    },
    resolvedDate: {
      type: Date,
    },
    reviewState: {
      type: String,
      enum: ["IN_REVIEW", "QUEUED", "RESOLVED"],
    },
    assignedModerator: {
      type: String,
    },
  },
  {
    collection: "reports",
  }
);

export interface IReport extends ReportType, Document {}

const Report = model<IReport>("Report", reportSchema);

export default Report;
