import { Router } from 'express'

const { readFileSync } = require('fs');

export const router = Router()
export default router

router.get('/', async (req, res) => {
  const data = readFileSync('./db/expenses.json');
 
  res.send(JSON.parse(data).expenses)
})