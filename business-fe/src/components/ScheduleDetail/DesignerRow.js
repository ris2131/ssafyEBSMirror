import styled from "styled-components";

const TimeTableRow = styled.tr`
`;

const TimeTableDesignerName = styled.th`
  background-color: antiquewhite;
  padding: 20px 30px;
  color: #A27B5C;
  font-family: GowunBatang-Regular, sans-serif;
  font-weight: bold;
`;

const TimeTableData = styled.td`
  background-color: #bfbfbf;

  &.reserved {
    background-color: #5184289f;
    background-position: center;
    cursor: pointer;
    font-weight: bold;
  }
`;

const DesignerRow = (props) => {

  const designerSeq = props.designerSeq;
  const designerName = props.designerName;

  const time = ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",];

  return (
    <TimeTableRow >
      <TimeTableDesignerName>{designerName}</TimeTableDesignerName>
      {
        time.length ?
          time.map((timeStr) => {
            return (
              <TimeTableData key={timeStr} className={`${designerSeq} ${timeStr}`}></TimeTableData>
            );
          }) :
          <></>
      }
    </TimeTableRow>
  );
};

export default DesignerRow;
