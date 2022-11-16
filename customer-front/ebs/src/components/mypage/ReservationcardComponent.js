import * as React from 'react';
import "../../fonts/font.css"
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled as muiStyled}  from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Card from '@mui/material/Card';
// import CardActions from '@mui/material/CardActions';
// import CardContent from '@mui/material/CardContent';
// import Button from '@mui/material/Button';
// import Typography from '@mui/material/Typography';
import CalendarMonthSharpIcon from '@mui/icons-material/CalendarMonthSharp';
import styled from "styled-components";



const Item = muiStyled(Paper)(() => ({
  
  textAlign: 'center',
  margin: '30px 30px 30px 30px',
  height: 'auto',
  width: 'auto',
  lineHeight: '60px',
  
  backgroundColor: '#F9F9F9',
//   color: '#FFFFFF',
  borderRadius: '10px',
  fontFamily: 'GowunBatang-Regular'
  
  
  
}));

const theme = createTheme({
    palette: {
        brown: {
            main: '#9D7F5C'
        }
    }
});

export default function SubscribeInfoComponent() {
  return (
            <Box>
                <Item elevation={24}>
                  
                  <ThemeProvider theme={theme}>
                    {/* <CalendarMonthSharpIcon sx={{ fontSize: 60 }}/> */}
                    예약 내역
                  </ThemeProvider>
                </Item>
            </Box>
          
  );
}

  






// const card = (
//   <React.Fragment>
//     <CardContent>
//       <CalendarMonthSharpIcon sx={{ fontSize: 50 }}/>
//       <span>
//         <Typography variant="h5" component="div">
//           예약 내역
//         </Typography>
//       </span>
//     </CardContent>
//     {/* <CardActions>
//       <Button size="small">예약 내역 보러가기</Button>
//     </CardActions> */}
//   </React.Fragment>
// );

// export default function OutlinedCard() {
//   return (
//     <Box sx={{ minWidth: 275 }}>
//       <Card variant="outlined">{card}</Card>
//     </Box>
//   );
// }
