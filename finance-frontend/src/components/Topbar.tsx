
import * as React from 'react';
import Box from '@mui/joy/Box';

import Typography from '@mui/joy/Typography';
import IconButton from '@mui/joy/IconButton';
import Stack from '@mui/joy/Stack';
import  CIcon  from '@coreui/icons-react';
import { cilTruck } from '@coreui/icons';
import ColorSchemeToggle from './ColorSchemeToggle';





export default function Topbar() {
  return (
    <Box
      sx={{
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'space-between',
        padding:'10px'
      }}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={1}
        sx={{ display: { xs: 'none', sm: 'flex' } }}
      >
        <IconButton
          size="md"
          variant="outlined"
          color="neutral"
          sx={{
            display: { xs: 'none', sm: 'inline-flex' },
            borderRadius: '50%',
          }}
        ><CIcon icon={cilTruck} />
        </IconButton>
      </Stack>
     <Box>
      <Typography level='h1'> Transconnector Interview</Typography></Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1.5,
          alignItems: 'center',
        }}
      >
        <ColorSchemeToggle />
        
      </Box>
    </Box>
  );
}