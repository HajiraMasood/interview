import { Router } from "express";
import { uuidv4 } from "../utils/uuidGenerator";

import { readFile, writeFile } from "fs/promises";
import { expensesArray } from "../utils/dataGenerator";

export const router = Router();
export default router;

export interface IExpense {
  description: string;
  date: string;
  amount: string;
  uuid: string;
}

router.get("/", async (req, res) => {
  // // generate dummy data
  // const expenses = expensesArray;
  // await writeFile("./db/expenses.json", JSON.stringify({ expenses }));

  const data = await readFile("./db/expenses.json", "utf8");

  res.send(JSON.parse(data).expenses);
});

router.put("/", async (req, res) => {
  if (!req.body || !req.body.uuid) {
    return res.status(400).send("Invalid request payload");
  }
  const data = await readFile("./db/expenses.json", "utf8");

  const expenses = JSON.parse(data).expenses;
  const updateExpensesArray = expenses.map((expense: IExpense) =>
    expense.uuid === req.body.uuid ? req.body : expense
  );

  await writeFile(
    "./db/expenses.json",
    JSON.stringify({ expenses: updateExpensesArray })
  );
  const updatedData = await readFile("./db/expenses.json", "utf8");
  res.send({ success: true, data: JSON.parse(updatedData).expenses });
});

router.get("/:expenseId", async (req, res) => {
  if (!req.params) {
    return res.status(400).send("Invalid request payload");
  }
  const { expenseId } = req.params;
  const data = await readFile("./db/expenses.json", "utf8");

  const expenses = JSON.parse(data).expenses;

  const expense = await expenses.find((element: IExpense) => {
    return element.uuid === expenseId;
  });
  if (expense) {
    res.send({ success: true, data: expense });
  } else {
    res.send({ success: false, data: {} });
  }
});

router.post("/add", async (req, res) => {
  const data = await readFile("./db/expenses.json", "utf8");

  const expenses = JSON.parse(data).expenses;
  const newExpense = {
    uuid: uuidv4(),
    amount: req.body.amount,
    description: req.body.description,
    date: req.body.date,
  };

  const updateExpensesArray = [...expenses, newExpense];

  await writeFile(
    "./db/expenses.json",
    JSON.stringify({ expenses: updateExpensesArray })
  );
  const updatedData = await readFile("./db/expenses.json", "utf8");
  res.send({ success: true, data: JSON.parse(updatedData).expenses });
});

router.delete("/", async (req, res) => {
  if (!req.body || !req.body.id) {
    return res.status(400).send("Invalid request payload");
  }
  const data = await readFile("./db/expenses.json", "utf8");

  const expenses = JSON.parse(data).expenses;

  const updateExpensesArray = expenses.filter(
    (expense: { id: any }) => expense.id !== req.body.id
  );
  await writeFile(
    "./db/expenses.json",
    JSON.stringify({ expenses: updateExpensesArray })
  );
  const updatedData = await readFile("./db/expenses.json", "utf8");
  res.send({ success: true, data: JSON.parse(updatedData).expenses });
});
