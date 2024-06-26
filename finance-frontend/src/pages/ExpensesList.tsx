import {
  Box,
  Sheet,
  Table,
  Button,
  Link,
  Tooltip,
  FormControl,
  Input,
  Typography,
} from "@mui/joy";
import { useEffect, useState } from "react";

import React from "react";
import ModifyExpenseModal from "../components/ModifyExpenseModal";
import { IExpense } from "../types/Expense";
import DeleteExpenseModal from "../components/DeleteExpenseModal";
import { useNavigate } from "react-router-dom";
import { dateToTimeAgo } from "../utils/dateToTimeAgo";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";

const ExpensesList: React.FC = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState<IExpense[] | []>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [sum, setSum] = useState(0);

  const [selectedExpense, setSelectedExpense] = useState<IExpense>({
    amount: 0,
    description: "",
    uuid: "",
    date: "",
  });
  // eslint-disable-next-line array-callback-return
  const filteredExpenses = expenses?.filter((expense) => {
    if (searchKey === "") {
      return expense;
    } else if (
      expense.description.toLowerCase().includes(searchKey.toLowerCase())
    ) {
      return expense;
    }
  });
  const amounts = filteredExpenses.map((expense: IExpense) => expense.amount);

  useEffect(() => {
    if (amounts.length > 0) {
      const accumulated = amounts.reduce(
        (acc: number, row: number) => acc + row,
        0
      );
      setSum(Number(accumulated.toFixed(2)));
    } else setSum(0);
  }, [amounts]);

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
        <Button
          size="md"
          onClick={() => {
            navigate("/expenses/add");
          }}
        >
          Add Expense
        </Button>

        <Button
          sx={{ marginRight: "20px" }}
          size="md"
          variant="soft"
          onClick={() => {
            navigate("/expenses/show/charts");
          }}
        >
          Show Charts
        </Button>

        <FormControl sx={{ marginRight: "20px" }}>
          <Input
            startDecorator={<SearchIcon />}
            placeholder="Search by description"
            type="search"
            value={searchKey}
            onChange={(event) => {
              setSearchKey(event.target.value);
            }}
          />
        </FormControl>
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
        <Table aria-labelledby="ExpensesTable" stickyHeader hoverRow sx={{}}>
          <thead>
            <tr key={"table-header"}>
              <th
                key={"Description"}
                style={{ width: "var(--Table-firstColumnWidth)" }}
              >
                Description
              </th>
              <th key={"Date"} style={{ width: 200 }}>
                Date
              </th>
              <th key={"Amount"} style={{ width: 200 }}>
                Amount&nbsp;(€)
              </th>
              <th key={"Operations"} style={{ width: 200 }}></th>
            </tr>
          </thead>
          <tbody>
            {filteredExpenses.map((expense) => (
              <tr key={expense.uuid}>
                <td>
                  <Tooltip
                    title={`show details of ${
                      expense.description[0].toUpperCase() +
                      expense.description.substring(1)
                    }`}
                    variant="soft"
                  >
                    <Link
                      onClick={() => {
                        navigate(`/expenses/${expense.uuid}`);
                      }}
                    >
                      {expense.description[0].toUpperCase() +
                        expense.description.substring(1)}
                    </Link>
                  </Tooltip>
                </td>

                <td>
                  {" "}
                  <Tooltip title={expense.date} variant="soft">
                    <Typography>{dateToTimeAgo(expense.date)}</Typography>
                  </Tooltip>
                </td>
                <td>€ {expense.amount.toFixed(2).toString()}</td>
                <td>
                  <Box sx={{ display: "flex", gap: 1 }}>
                    <Tooltip title="Modify" variant="soft">
                      <Button
                        size="sm"
                        variant="plain"
                        color="neutral"
                        onClick={() => {
                          setShowDeleteModal(false);
                          setShowModifyModal(true);
                          setSelectedExpense(expense);
                        }}
                      >
                        <EditIcon />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Delete" variant="soft">
                      <Button
                        onClick={() => {
                          setShowModifyModal(false);
                          setShowDeleteModal(true);
                          setSelectedExpense(expense);
                        }}
                        size="sm"
                        variant="soft"
                        color="danger"
                      >
                        <DeleteIcon />
                      </Button>
                    </Tooltip>
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td></td>
              <th scope="row">Totals</th>
              <td>€ {sum}</td>
              <td></td>
            </tr>
          </tfoot>
        </Table>

        <ModifyExpenseModal
          setExpenses={setExpenses}
          setOpen={setShowModifyModal}
          setSelectedExpense={setSelectedExpense}
          open={showModifyModal}
          data={selectedExpense}
        />
        <DeleteExpenseModal
          setExpenses={setExpenses}
          setOpen={setShowDeleteModal}
          setSelectedExpense={setSelectedExpense}
          open={showDeleteModal}
          data={selectedExpense}
        />
      </Sheet>
    </Box>
  );
};
export default ExpensesList;
