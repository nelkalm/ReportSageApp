import { readFile } from "fs/promises";

import dotenv from "dotenv";
dotenv.config();

import connectDB from "./db/connect.js";
import Report from "./models/Report.js";

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    await Report.deleteMany();

    // import mock data file
    const jsonProducts = JSON.parse(
      await readFile(new URL("./mock-data.json", import.meta.url))
    );

    await Report.create(jsonProducts);
    console.log("success");
    process.exit(0);
  } catch (error) {
    console.log("error");
    process.exit(1);
  }
};

start();
