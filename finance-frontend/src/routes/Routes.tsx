import React from "react";
import { Navigate, RouteObject } from "react-router-dom";
import MainLayout from "../components/MainLayout";
import ExpensesList from "../pages/ExpensesList";
import AddExpenses from "../pages/AddExpenses";
import ExpenseDetails from "../pages/ExpenseDetails";
import Charts from "../pages/Charts";

export const routes = (): RouteObject[] => {
  return [
    { path: "*", element: <Navigate to="/" /> },

    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/",
          element: <ExpensesList />,
        },
        {
          path: "/expenses/add",
          element: <AddExpenses />,
        },
        {
          path: "/expenses/show/charts",
          element: <Charts />,
        },
        {
          path: "/expenses/:expenseId",
          element: <ExpenseDetails />,
        },
      ],
    },
  ];
};
