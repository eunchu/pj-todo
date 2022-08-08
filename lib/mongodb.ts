import { MongoClient } from "mongodb";

const mongoUrl = process.env.MONGODB_URL;
const options = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
} as any;

if (!mongoUrl) {
  throw new Error("please add your MongoURL to .env.local");
}

export const connectToDatabase = async () => {
  // Connect to cluster
  const client = new MongoClient(mongoUrl, options);
  await client.connect();

  const db = client.db(process.env.MONGODB_DB);

  return {
    client,
    db,
  };
};
