import {
  Modal,
  Sheet,
  ModalClose,
  Typography,
  Box,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Button,
} from "@mui/joy";
import { IExpense } from "../types/Expense";
import { useEffect, useState } from "react";

interface IModalProps {
  open: boolean;
  setOpen: Function;
  data?: IExpense;
  setExpenses: Function;
  setSelectedExpense: Function;
}

const ModifyExpenseModal = ({
  open,
  setOpen,
  data,
  setExpenses,
  setSelectedExpense,
}: IModalProps) => {
  const [amount, setAmount] = useState(data?.amount);
  const [description, setDescription] = useState(data?.description);
  const [date, setDate] = useState(data?.date);
  const [uuid, setId] = useState(data?.uuid);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setAmount(data?.amount);
    setDescription(data?.description);
    setDate(data?.date);
    setId(data?.uuid);
  }, [data]);

  const saveExpenseUpdate = () => {
    setLoading(true);
    const body = {
      amount,
      description,
      date,
      uuid,
    };
    fetch("/expenses", {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((jsonResponse) => {
        setExpenses(jsonResponse.data);
        setOpen(false);
        setLoading(false);
        setSelectedExpense({});
      })
      .catch((err) => {
        console.log(err);
        setOpen(false);
        setLoading(false);
      });
  };
  return (
    <Modal
      aria-labelledby="edit-modal"
      aria-describedby="modal-desc"
      open={open}
      onClose={() => {
        setSelectedExpense({});
        setOpen(false);
      }}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Sheet
        variant="outlined"
        sx={{
          minWidth: "400px",
          borderRadius: "md",
          boxShadow: "lg",
        }}
      >
        <Box
          sx={{
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ModalClose variant="plain" />
          <Typography
            sx={{
              fontSize: "24px",
              fontWeight: "700",
              lineHeight: "32px",
              marginTop: "16px",
            }}
          >
            Edit {data?.description}
          </Typography>
        </Box>
        <Divider />
        <Box sx={{ padding: "10px" }}>
          <FormControl sx={{ marginBottom: "10px" }}>
            <FormLabel>Amount</FormLabel>
            <Input
              startDecorator={"€"}
              required
              type="number"
              value={amount?.toString()}
              onChange={(event) => setAmount(Number(event.target.value))}
            />
          </FormControl>
          <FormControl sx={{ marginBottom: "10px" }}>
            <FormLabel>Description</FormLabel>
            <Input
              required
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </FormControl>
          <FormControl sx={{ marginBottom: "10px" }}>
            <FormLabel>Date</FormLabel>
            <Input
              required
              value={date}
              type="date"
              onChange={(event) => setDate(event.target.value)}
            />
          </FormControl>
        </Box>
        <Box sx={{ display: "grid", padding: "10px" }}>
          <Button
            loading={loading}
            onClick={() => {
              saveExpenseUpdate();
            }}
            type="submit"
          >
            Edit Expense
          </Button>
        </Box>
      </Sheet>
    </Modal>
  );
};
export default ModifyExpenseModal;
