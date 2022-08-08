import type { NextApiRequest, NextApiResponse } from "next";

import { connectToDatabase } from "@lib/mongodb";
import { ITask } from "@store/interfaces";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // NOTE 모든 task 목록 호출
  const { db } = await connectToDatabase();

  if (req.method === "GET") {
    const tasks = await db.collection("tasks").find({}).toArray();

    return res
      .status(200)
      .json({ status: 200, message: "Success", data: tasks });
  }

  // NOTE task 저장
  if (req.method === "POST") {
    const data = req.body as ITask;

    await db.collection("tasks").insertOne(data, (err, data) => {
      if (err) return console.log("err", err);

      return res.status(200).json({ status: 200, message: "Success" });
    });
  }
};
export default handler;
