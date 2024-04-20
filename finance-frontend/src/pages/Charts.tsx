import { Box, Sheet, Button, IconButton } from "@mui/joy";
import { useEffect, useState } from "react";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import React from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { IExpense } from "../types/Expenses";
import { useNavigate } from "react-router-dom";

import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Charts: React.FC = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState<IExpense[] | []>([]);
  const [searchKey, setSearchKey] = useState("");

  const options = {
    plugins: {
      title: {
        display: true,
        text: "Chart.js Bar Chart - Stacked",
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ];

  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        backgroundColor: "rgb(255, 99, 132)",
      },
      {
        label: "Dataset 2",
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        backgroundColor: "rgb(75, 192, 192)",
      },
      {
        label: "Dataset 3",
        data: labels.map(() =>
          faker.datatype.number({ min: -1000, max: 1000 })
        ),
        backgroundColor: "rgb(53, 162, 235)",
      },
    ],
  };

  const filteredExpenses = expenses?.filter((expense) => {
    if (searchKey === "") {
      return expense;
    } else if (
      expense.description.toLowerCase().includes(searchKey.toLowerCase())
    ) {
      return expense;
    }
  });

  useEffect(() => {
    fetch("/expenses")
      .then((response) => response.json())
      .then((body) => {
        setExpenses(body);
      });
  }, []);

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row-reverse",
          alignItems: "right",
          marginBottom: "20px",
        }}
      >
        <Box width={"100%"}>
          <IconButton
            onClick={() => {
              navigate("/");
            }}
          >
            <ArrowBackIcon />
            Back
          </IconButton>
        </Box>

        <Button
          sx={{ marginRight: "20px" }}
          size="md"
          variant="soft"
          onClick={() => {}}
        >
          Filters
        </Button>
      </Box>

      <Sheet
        className="ExpensesTableContainer"
        variant="outlined"
        sx={{
          width: "100%",
          borderRadius: "sm",
          flexShrink: 1,
          minHeight: 0,
        }}
      >
        <Bar options={options} data={data} />
      </Sheet>
    </Box>
  );
};
export default Charts;
