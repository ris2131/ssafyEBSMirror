import * as React from 'react';
import "../../fonts/font.css"
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CardMembershipSharpIcon from '@mui/icons-material/CardMembershipSharp';


const Item = styled(Paper)(() => ({
  
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
                    <CardMembershipSharpIcon sx={{ fontSize: 50 }}/>
                    구독 정보
                  </ThemeProvider>
                </Item>
            </Box>
          
  );
}



// const ticket = 1
// const subscriptions = 1



// const card = (
//   <React.Fragment>
//     <CardContent>
//      <CardMembershipSharpIcon sx={{ fontSize: 50 }}/>
//       <Typography variant="h5" component="div">
//         구독 정보
//       </Typography>
//       <Typography variant="body2">
//         {ticket}개의 이용권, {subscriptions}개의 구독권이 있습니다.
//       </Typography>
//     </CardContent>
//     {/* <CardActions>
//       <Button size="small">상세 보러가기</Button>
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