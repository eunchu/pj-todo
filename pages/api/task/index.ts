import type { NextApiRequest, NextApiResponse } from "next";

import { connectToDatabase } from "@lib/mongodb";
import { ITask } from "@store/interfaces";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // NOTE 모든 task 목록 호출
  const { db } = await connectToDatabase();
  const tasks = db.collection("tasks");

  if (req.method === "GET") {
    const list = await tasks.find({}).toArray();

    return res
      .status(200)
      .json({ status: 200, message: "Success", data: list });
  }

  // NOTE task 저장
  if (req.method === "POST") {
    const newTask = req.body as ITask;

    await tasks.insertOne(newTask, (err, data) => {
      if (err) return console.log("err", err);

      return res.status(200).json({ status: 200, message: "Success" });
    });
  }

  // NOTE 업데이트
  if (req.method === "PUT") {
    await tasks.findOneAndUpdate({ id: req.body.id }, { $set: req.body });
    return res.status(200).json({ status: 200, message: "Success" });
  }
};
export default handler;
