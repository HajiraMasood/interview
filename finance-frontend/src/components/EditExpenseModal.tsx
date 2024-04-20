import { Modal, Sheet, ModalClose, Typography, Box, Divider, FormControl, FormLabel, Input, Button } from "@mui/joy";
import { IExpense } from "../types/Expenses";
import { useEffect, useState } from "react";

interface IModalProps{
  open:boolean,
  setOpen:Function,
  data?:IExpense
}

const EditExpenseModal = ({open,setOpen, data}:IModalProps) =>  {
  const [amount, setAmount]= useState(data?.amount)
  const [description, setDescription]= useState(data?.description)
  const [date, setDate]= useState(data?.date.toString())
  useEffect(()=>{
    setAmount(data?.amount)
    setDescription(data?.description)
    setDate(data?.date.toString())
  },[data])
return (
  <Modal
  aria-labelledby="modal-title"
  aria-describedby="modal-desc"
  open={open}
  onClose={() => setOpen(false)}
  sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
>
<Sheet
        variant="outlined"
        sx={{
          minWidth: '400px',
          borderRadius: 'md',
          boxShadow: 'lg'
        }}
      >
        <Box sx={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '44px' }}>
          <ModalClose variant="plain" />
          <Typography sx={{ fontSize: '24px', fontWeight: '700', lineHeight: '32px', marginTop: '16px' }}>Edit {data?.description}</Typography>
        </Box>
        <Divider />
        <form>
          <Box sx={{padding:"10px"}}>

          
          <FormControl>
            <FormLabel>Amount</FormLabel>
                  <Input
                  startDecorator={'$'}
                  required
                    value={amount}
                    onChange={(event) => setAmount(event.target.value)}
                  />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
                  <Input
                  required
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />
          </FormControl>
          <FormControl>
            <FormLabel>Date</FormLabel>
                  <Input
                  required
                    value={date}
                    type="date"
                    onChange={(event) => setDate(event.target.value)}
                   
                  />
          </FormControl>
          </Box>
          <Box sx={{ padding: '24px' }}>
        <Button>Edit Expense</Button>
          </Box>
        </form>
       
      </Sheet>
</Modal>
)
}
export default EditExpenseModal