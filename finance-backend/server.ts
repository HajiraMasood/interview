import express from "express";
import expensesRoutes from "./routes/expenses";

const app = express();
app.use(express.json());

app.use("/expenses", expensesRoutes);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Example app listening on port http://localhost:${PORT}`);
});
