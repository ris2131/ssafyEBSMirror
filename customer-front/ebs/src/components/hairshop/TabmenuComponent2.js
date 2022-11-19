import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import HomeComponent from './HomeComponent';
import DesignerComponent from './DesignerComponent';
import SubscribeComponent from './SubscribeComponent';
import ReservationComponent from './ReservationComponent';
import { createTheme, ThemeProvider } from '@mui/material';
import {useSelector} from "react-redux";
import styled from "styled-components";
import {useState} from "react";

const theme = createTheme({
  palette: {
      primary: {
          main: '#876445'
      }
  }
});

const DisplayBlock = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #7f7f7fbf;
`;

const SubscriptionAlert = styled.div`
  width: 70%;
  height: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 30px;
  background-color: #fdfdfd;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const AlertMessage = styled.div`
  font-size: 24px;
  font-family: GowunBatang-Regular, sans-serif;
  font-weight: bold;
  word-break: keep-all;
  padding-top: 40px;
`;

const AlertButton = styled.button`
  margin: 20px;
  border: none;
  border-radius: 10px;
  padding: 5px 20px;
  background-color: #b08664;
  color: #fdfdfd;
  transition-duration: 200ms;

  &:hover {
    background-color: #876445;
    transition-duration: 200ms;
  }
`;

function TabPanel(props) {
  const { children, value, index,  ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      style={{position: 'relative'}}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 4 }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs(props) {
  const [value, setValue] = React.useState(0);
  const myActiveSubscribe = useSelector((state) => state.subscribe.myactivesubscribe);
  const [isSubscribed, setSubscribed] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    isSubscribing();
  };

  const isSubscribing = () => {
    console.log("현재 조회중인 Seq : " + props.hairshopSeq);
    let bool = false;
    myActiveSubscribe.forEach((hairShop) => {
      console.log("Loop Seq : " + hairShop['businessSeq']);
      if (hairShop['businessSeq'] === props.hairshopSeq) {
        bool = true;
      }
    });
    setSubscribed(bool);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" textColor="primary"
          indicatorColor="primary" centered>
            <Tab label="홈" {...a11yProps(0)} />
            <Tab label="디자이너" {...a11yProps(1)} />
            <Tab label="구독" {...a11yProps(2)} />
            <Tab label="예약" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <HomeComponent/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <DesignerComponent/>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <SubscribeComponent/>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ReservationComponent/>
          {
            isSubscribed ?
              <></> :
              <>
                <DisplayBlock />
                <SubscriptionAlert>
                  <AlertMessage>아직 구독하지 않은 헤어샵입니다.</AlertMessage>
                  <AlertButton onClick={() => setValue(2)}><nobr>구독하기</nobr></AlertButton>
                </SubscriptionAlert>
              </>
          }
        </TabPanel>
      </Box>
    </ThemeProvider>
  );
}
