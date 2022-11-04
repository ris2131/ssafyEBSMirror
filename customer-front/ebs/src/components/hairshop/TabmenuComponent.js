import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import styled from "styled-components";
import HomeComponent from './HomeComponent';



export default function CenteredTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="홈" />
        <Tab label="디자이너" />
        <Tab label="구독" />
        <Tab label="예약" />
      </Tabs>
    </Box>
  );
}
