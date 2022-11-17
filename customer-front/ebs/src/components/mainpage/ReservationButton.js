import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { Link } from "react-router-dom";
import styled from "styled-components";



export default function ContainedButtons() {
  return (
    <Link to="/hairshop-info" style={{ textDecoration: "none" }}>
      <Button variant="contained" color="#FFFFFF">
        예약하러 가기
      </Button>
    </Link>
    
  );
}
