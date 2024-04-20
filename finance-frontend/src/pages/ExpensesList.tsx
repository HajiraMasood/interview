import { Box,  Sheet, Table, Button } from '@mui/joy';
import { useEffect, useState } from 'react'

import React from 'react'
import EditExpenseModal from '../components/EditExpenseModal';
import { IExpense } from '../types/Expenses';



 const ExpensesList: React.FC = () => {
  const [expenses, setExpenses]= useState<IExpense[] | []>([]);
  const editExpenseModalInitialState: {
    show: boolean,
    data?: IExpense
  }= {
    show:false,
    data: undefined
  }
  const [editExpenseModal, setEditExpenseModal] = useState(editExpenseModalInitialState)
   useEffect(() => {
    fetch('/expenses')
      .then(response => response.json())
      .then(body => {setExpenses(body) 
      })
  }, [])
  return(
    
      <Sheet
        className="ExpensesTableContainer"
        variant="outlined"
        sx={{
          display: { xs: 'none', sm: 'initial' },
          width: '100%',
          borderRadius: 'sm',
          flexShrink: 1,
          overflow: 'auto',
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="ExpensesTable"
          stickyHeader
          hoverRow
          sx={{
          }}
        >
          <thead>
            <tr>
              <th style={{ width: 'var(--Table-firstColumnWidth)' }}>Description</th>
              <th style={{ width: 200 }}>Date</th>
              <th style={{ width: 200 }}>Amount&nbsp;($)</th>
              <th style={{ width: 200 }}></th>
           
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.description}</td>
                <td>{expense.date.toString()}</td>
                <td>{expense.amount}</td>
                <td>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <Button size="sm" variant="plain" color="neutral" onClick={()=>{
                       setEditExpenseModal({show:true,data:expense})
                    }}>
                      Edit
                    </Button>
                    <Button size="sm" variant="soft" color="danger">
                      Delete
                    </Button>
                  </Box>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <EditExpenseModal setOpen={setEditExpenseModal} open={editExpenseModal.show} data={editExpenseModal.data}/>

      </Sheet>
  )
  
  }
export default ExpensesList



