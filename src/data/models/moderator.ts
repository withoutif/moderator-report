import mongoose, { Document, model, Schema } from "mongoose";

export type ModeratorType = {
  username: string;
  available: boolean;
  lastAssigned: Date;
};

const moderatorSchema: Schema = new Schema(
  {
    Username: {
      type: String,
      required: true,
    },
    available: {
      type: Boolean,
      default: true,
    },
    lastAssigned: {
      type: Date,
    },
  },
  {
    collection: "moderators",
  }
);

export interface IModerator extends ModeratorType, Document {}

const Moderator = model<IModerator>("Moderator", moderatorSchema);

export default Moderator;
