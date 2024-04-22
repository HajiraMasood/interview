import {
  Box,
  IconButton,
  Dropdown,
  Menu,
  MenuButton,
  MenuItem,
  Typography,
} from "@mui/joy";
import { useEffect, useMemo, useState } from "react";
import { getDaysInMonth } from "date-fns";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import React from "react";

import { IExpense } from "../types/Expense";
import { useNavigate } from "react-router-dom";
import { Months } from "../utils/months";
import { ArrowDownward } from "@mui/icons-material";

const Charts: React.FC = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const event = new Date();
  const [selectedMonth, setSelectedMonth] = useState(event.getMonth());

  const groupedExpenses = useMemo(() => {
    const groupedExpenses = expenses.reduce(
      (
        previousValue: Record<string, number>,
        expense: IExpense
      ): Record<string, number> => {
        previousValue[expense.date] =
          (previousValue[expense.date] || 0) + expense.amount;
        return previousValue;
      },
      {}
    );

    const now = new Date();
    now.setMonth(selectedMonth);
    const lastDayOfTheMonth = getDaysInMonth(now);
    let dailyExpenses = [];
    for (let day = 0; day < lastDayOfTheMonth; day++) {
      const currentDateString = new Date(
        now.getFullYear(),
        now.getMonth(),
        day + 1
      )
        .toISOString()
        .substring(0, 10);
      dailyExpenses.push({
        date: currentDateString,
        amount: groupedExpenses[currentDateString] || 0,
      });
    }

    return dailyExpenses;
  }, [expenses, selectedMonth]);

  useEffect(() => {
    fetch("/expenses")
      .then((response) => response.json())
      .then((body) => {
        setExpenses(body);
      });
  }, []);

  return (
    <Box width={"100%"}>
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          justifyContent: "space-between",
          paddingY: "10px",
          paddingX: "30px",
        }}
      >
        <Box>
          <IconButton
            onClick={() => {
              navigate("/");
            }}
          >
            <ArrowBackIcon />
            Back
          </IconButton>
        </Box>
        <Box>
          <Typography color="primary" level="h3" component="h2">
            Showing Expenses of {Months[selectedMonth]} in Euros
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1.5,
            alignItems: "center",
          }}
        >
          <Dropdown>
            <MenuButton endDecorator={<ArrowDownward />}>
              Select Month
            </MenuButton>
            <Menu>
              {Months.map((month, monthIndex) => {
                return (
                  <MenuItem
                    key={monthIndex}
                    onClick={() => setSelectedMonth(monthIndex)}
                  >
                    {month}
                  </MenuItem>
                );
              })}
            </Menu>
          </Dropdown>
        </Box>
      </Box>

      <ResponsiveContainer width="95%" height={450}>
        <BarChart
          margin={{ top: 20, right: 20, left: 20, bottom: 5 }}
          data={groupedExpenses}
        >
          <CartesianGrid />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" stackId="a" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};
export default Charts;
