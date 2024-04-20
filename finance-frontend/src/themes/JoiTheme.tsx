import { extendTheme } from '@mui/joy/styles'

declare module '@mui/joy/styles' {

  interface TypographySystemOverrides {
    'body-sm-serif': true
  }
}



export const joiTheme = extendTheme({
  // colorSchemes: {
  //   dark: {
  //     palette: {
  //       primary: {
  //         50: '#C0CCD9',
  //         100: '#A5B8CF',
  //         200: '#6A96CA',
  //         300: '#4886D0',
  //         400: '#2178DD',
  //         500: '#096BDE',
  //         600: '#1B62B5',
  //         700: '#265995',
  //         800: '#2F4968',
  //         900: '#2F3C4C',
  //       },
  //     },
  //   },
  //   light: {
  //     palette: {
  //     primary:{
  //       500: '#667085',
  //       600: '#475467',
  //       800: '#1D2939',
  //       50: '#F9FAFB',
  //       200: '#EAECF0',
  //       700: '#004EEB'
  //     }}
  //   }
  // },
  
  
 
  // components: {
  // }
    
})
