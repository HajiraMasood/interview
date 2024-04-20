import React from 'react'
import { Navigate, RouteObject } from 'react-router-dom'
import MainLayout from '../components/MainLayout'
import ExpensesList from '../pages/ExpensesList'

export const routes = (): RouteObject[] => {

    return [

      { path: '*', element: <Navigate to="/" /> },

      {
        path: '/',
        element: <MainLayout />,
        children: [
          { path: '/', element: <ExpensesList /> },
        ]
      }
        ]
}
