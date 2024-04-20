import { Outlet } from 'react-router-dom'
import TopBar from './Topbar'
import { Box } from '@mui/joy'


const MainLayout = () => {

  return (
    <div >
        <TopBar></TopBar>
        <Box sx={{display:"flex", margin:"30px", alignContent:"center"}}>
          <Outlet></Outlet>
        </Box>
        
    </div>
  )
}
export default MainLayout
