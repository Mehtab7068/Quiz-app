import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const { MONGO_USER, MONGO_PASS, MONGO_CLUSTER, MONGO_DB } = process.env;

//      if (!MONGO_USER || !MONGO_PASS || !MONGO_CLUSTER || !MONGO_DB) {
//     console.error("FATAL ERROR: One or more MongoDB environment variables are missing.");
//     process.exit(1);
// }
//  const uri = `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@${MONGO_CLUSTER}/${MONGO_DB}?retryWrites=true&w=majority`;

export const connectDB = async () => {
  await mongoose
    .connect(process.env.DATABASE_URL)
    .then(() => {
      console.log("database connected");
    })
    .catch((err) => {
      console.error("DB CONNECTION ERROR:", err);
      process.exit(1);
    });
};
console.log("Loaded DATABASE_URL:", process.env.DATABASE_URL);
