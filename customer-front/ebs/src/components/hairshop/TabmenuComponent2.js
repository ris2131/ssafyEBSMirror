import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import HomeComponent from './HomeComponent';
import DesignerComponent from './DesignerComponent';
import SubscribeComponent from './SubscribeComponent';
import ReservationComponent from './ReservationComponent';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
      primary: {
          main: '#876445'
      }
  }
});

function TabPanel(props) {
  const { children, value, index,  ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
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

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
        </TabPanel>
      </Box>
    </ThemeProvider>
  );
}
