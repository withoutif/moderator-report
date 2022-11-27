import { connect } from "mongoose";

const dbUri = `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/moderation`;

export const connection = async () => {
  try {
    await connect(dbUri);
    console.log("Database connected");
  } catch (err) {
    //Under normal condition would log to standardized logger
    console.error("MongoDB connection failed.", err);
  }
};
