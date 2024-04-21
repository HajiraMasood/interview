import { Box, Card, CardContent, IconButton, Typography } from "@mui/joy";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import { dateToTimeAgo } from "../utils/dateToTimeAgo";

const ExpenseDetails = () => {
  const navigate = useNavigate();
  const { expenseId } = useParams();
  const [expense, setExpense] = useState({
    description: "",
    amount: "",
    date: "",
  });
  useEffect(() => {
    fetch(`/expenses/${expenseId}`)
      .then((response) => response.json())
      .then((body) => {
        if (body.data)
          setExpense({
            description: body.data.description,
            date: `${dateToTimeAgo(body.data.date)} ( ${moment(
              body.data.date
            ).format("ddd, MMM DD on h:mm")} )`,
            amount: body.data.amount,
          });
        else setExpense({ description: "", amount: "", date: "" });
      });
  }, [expenseId]);

  return (
    <Box sx={{ width: "50%", margin: "auto" }}>
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
      <Box sx={{ padding: "10px", marginTop: "20px" }}>
        <Card sx={{}}>
          <div>
            <Typography level="title-lg">{expense.description}</Typography>
            <Typography level="body-sm">{expense.date}</Typography>
          </div>

          <CardContent orientation="vertical">
            <div>
              <Typography level="body-xs">Spent:</Typography>
              <Typography fontSize="lg" fontWeight="lg">
                ${expense.amount}
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};
export default ExpenseDetails;
