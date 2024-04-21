import { uuidv4 } from "./uuidGenerator";

// Function to generate a random date within a specific range
function getRandomDate(
  startDate: string | number | Date,
  endDate: string | number | Date
) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const randomDate = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
  return randomDate.toISOString().slice(0, 10); // Format date as "YYYY-MM-DD"
}

// Function to generate a random expense object
function generateRandomExpense() {
  const descriptions = [
    "Groceries",
    "Utility Bills",
    "Rent",
    "Transportation",
    "Entertainment",
    "Dining Out",
    "Healthcare",
    "Clothing",
    "Electronics",
    "Education",
  ];

  const randomDescription =
    descriptions[Math.floor(Math.random() * descriptions.length)];
  const amount = parseFloat((Math.random() * 500).toFixed(2)); // Random amount between 0 and 500
  const startDate = "2023-04-01"; // Start date for last April
  const endDate = new Date().toISOString().slice(0, 10); // Current date (today)
  const date = getRandomDate(startDate, endDate); // Random date between last April and today
  const uuid = uuidv4(); // Generate UUID for each expense

  return {
    description: randomDescription,
    amount,
    date,
    uuid,
  };
}

// Function to generate an array of expenses from last April till now
function generateExpensesFromLastApril() {
  const startDate = new Date("2023-04-01"); // Start date for last April
  const currentDate = new Date(); // Current date (today)

  const expenses = [];

  // Generate expenses for each month from last April till the current month
  let currentDateCursor = new Date(startDate);
  while (currentDateCursor <= currentDate) {
    const expense = generateRandomExpense();
    expenses.push(expense);

    // Move to the next month
    currentDateCursor.setMonth(currentDateCursor.getMonth() + 1);
  }

  return expenses;
}

// Generate expenses array for last April till now
export const expensesArray = generateExpensesFromLastApril();

// Convert expenses array to JSON string

// Output the generated JSON string
