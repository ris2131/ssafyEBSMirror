import { LineWeight } from "@mui/icons-material";
import styled from "styled-components";

const SButton = styled.button`
  border-radius: 5px;
  color: white;
  border: none;
  background-color: #E9DAC1;
  margin-top: 40px;
  cursor: pointer;
  font-size: 14px;
`;

const MyButton = ({
  text,
  onClick,
  width,
  padding,
  margin,
  fontSize,
  backgroundColor,
  color,
  fontWeight,
  marginTop,
}) => {
  return (
    <SButton
      onClick={onClick}
      style={{ width, padding, margin, fontSize, backgroundColor,color, fontWeight,marginTop }}
    >
      {text}
    </SButton>
  );
};

export default MyButton;
