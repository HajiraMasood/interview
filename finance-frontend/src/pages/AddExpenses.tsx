import {
  Alert,
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  Input,
} from "@mui/joy";
import { useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import React from "react";
import { useNavigate } from "react-router-dom";

const AddExpenses: React.FC = () => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [alert, setAlert] = useState({ show: false, message: "" });

  const [loading, setLoading] = useState(false);
  const resetAlert = () => {
    setAlert({ show: false, message: "" });
  };

  const addExpense = () => {
    setLoading(true);
    if (!description || !date || !amount) {
      setAlert({ show: true, message: "Please fill all Feilds" });
      setLoading(false);
      return;
    }
    const body = {
      description,
      amount,
      date,
    };
    fetch("/expenses/add", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

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
        <FormControl sx={{ marginBottom: "10px" }}>
          <FormLabel>Description</FormLabel>
          <Input
            required
            value={description}
            onChange={(event) => {
              resetAlert();
              setDescription(event.target.value);
            }}
          />
        </FormControl>
        <FormControl sx={{ marginBottom: "10px" }}>
          <FormLabel>Amount</FormLabel>
          <Input
            startDecorator={"€"}
            required
            value={amount}
            onChange={(event) => {
              resetAlert();
              setAmount(Number(event.target.value));
            }}
          />
        </FormControl>
        <FormControl sx={{ marginBottom: "10px" }}>
          <FormLabel>Date</FormLabel>
          <Input
            required
            value={date}
            type="date"
            onChange={(event) => {
              resetAlert();
              setDate(event.target.value);
            }}
          />
        </FormControl>
      </Box>
      {alert.show && (
        <Alert variant="outlined" color="warning">
          {alert.message}
        </Alert>
      )}
      <Box sx={{ display: "grid", padding: "10px" }}>
        <Button
          loading={loading}
          onClick={() => {
            addExpense();
          }}
          type="submit"
        >
          Add Expense
        </Button>
      </Box>
    </Box>
  );
};
export default AddExpenses;
