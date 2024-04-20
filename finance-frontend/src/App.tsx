import React from 'react';

import './App.css';
import { BrowserRouter as Router, useRoutes} from 'react-router-dom'
import { CssVarsProvider, useTheme } from '@mui/joy/styles'
import '@fontsource/inter';
import { joiTheme } from './themes/JoiTheme'
import { routes } from './routes/Routes'
import { Box } from '@mui/joy';

function App() {
  return useRoutes(routes())
}
const AppWrapper = () => {
  return (
      <Router>
        <CssVarsProvider theme={joiTheme}>
        <Box sx={(theme) => ({ backgroundColor: theme.vars.palette.background.body, minHeight: '100vh'}) }>
          <App />
        </Box>
        </CssVarsProvider>
      </Router>
  )
}

export default AppWrapper
