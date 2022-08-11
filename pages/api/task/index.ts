import type { NextApiRequest, NextApiResponse } from "next";

import { connectToDatabase } from "@lib/mongodb";
import { ITask } from "@store/interfaces";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // NOTE 목록
  const { db } = await connectToDatabase();
  const tasks = db.collection("tasks");

  if (req.method === "GET") {
    const list = await (
      await tasks.find({}).project({ _id: 0 }).toArray()
    ).sort((a, b) => a.order - b.order);

    return res
      .status(200)
      .json({ status: 200, message: "Success", data: list });
  }

  // NOTE 생성
  if (req.method === "POST") {
    const newTask = req.body as ITask;

    await tasks.insertOne(newTask, (err, data) => {
      if (err) return console.log("err", err);

      return res.status(200).json({ status: 200, message: "Success" });
    });
  }

  // NOTE 업데이트
  if (req.method === "PUT") {
    await req.body.map((item: any) =>
      tasks.updateOne({ id: item.id }, { $set: item }, { upsert: true })
    );
    return res
      .status(200)
      .json({ status: 200, message: "Update is Successfuly" });
  }
};
export default handler;
