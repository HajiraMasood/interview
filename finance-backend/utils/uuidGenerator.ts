import { readFile, writeFile } from "fs/promises";
export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
const addUUIDstoExpenses = async () => {
  const data = await readFile("./db/expenses.json", "utf8");
  const expenses = JSON.parse(data).expenses;
  const newExpensesObject = expenses.map((expense: any) => {
    return {
      id: uuidv4(),
      ...expense,
    };
  });

  await writeFile(
    "./db/expenses.json",
    JSON.stringify({ expenses: newExpensesObject })
  );
};
