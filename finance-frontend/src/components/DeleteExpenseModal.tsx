import {
  Modal,
  ModalClose,
  Button,
  DialogContent,
  DialogTitle,
  ModalDialog,
} from "@mui/joy";
import { IExpense } from "../types/Expenses";
import { useEffect, useState } from "react";

interface IModalProps {
  open: boolean;
  setOpen: Function;
  data?: IExpense;
  setExpenses: Function;
  setSelectedExpense: Function;
}

const DeleteExpenseModal = ({
  open,
  setOpen,
  data,
  setExpenses,
  setSelectedExpense,
}: IModalProps) => {
  const [amount, setAmount] = useState(data?.amount);
  const [description, setDescription] = useState(data?.description);
  const [date, setDate] = useState(data?.date);
  const [id, setId] = useState(data?.id);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setAmount(data?.amount);
    setDescription(data?.description);
    setDate(data?.date);
    setId(data?.id);
  }, [data]);

  const deleteExpense = () => {
    setLoading(true);
    const body = {
      id,
    };
    fetch("/expenses", {
      method: "DELETE",
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
      open={open}
      onClose={() => {
        setSelectedExpense({});
        setOpen(false);
      }}
    >
      <ModalDialog size="md">
        <ModalClose />
        <DialogTitle sx={{ paddingTop: "20px" }}>
          Do you want to delete this {description} expense with {amount}$ spent
          on {date}
        </DialogTitle>
        <DialogContent sx={{ marginTop: "20px" }}>
          <Button
            loading={loading}
            onClick={() => {
              deleteExpense();
            }}
          >
            Delete
          </Button>
        </DialogContent>
      </ModalDialog>
    </Modal>
  );
};
export default DeleteExpenseModal;
