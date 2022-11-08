import NavBar from "../../components/NavBar";
import styled from "styled-components";

const ScheduleMain = styled.main`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: center;
  padding: 20px 100px;
`;

const ScheduleSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  //background-color: #cfcfcf;
  padding: 40px;
  //box-shadow: #3f3f3f 10px 10px 5px;
`;

const TitleDiv = styled.div`
  font-size: 48px;
  margin-bottom: 20px;

`;

const TimeTable = styled.table`
  color: #ffffff;
`;

const TimeTableHead = styled.thead`
  background-color: #9D7F5C;
`;

const TimeTableHeadRow = styled.tr`
`;

const TimeTableHeadMain = styled.th`
  background-color: #bfbfbf;
`;

const TimeTableHeadData = styled.th`
  padding: 5px 10px;
`;

const TimeTableBody = styled.tbody`
`;

const TimeTableRow = styled.tr`
`;

const TimeTableDesignerName = styled.th`
  background-color: antiquewhite;
  padding: 10px 30px;
  color: #9D7F5C;
`;

const TimeTableData = styled.td`
  background-color: #bfbfbf;

  &.reserved {
    background-color: #9D7F5Cbf;
    cursor: pointer;
    font-weight: bold;
  }
`;

const TimeSheet = () => {
  const time = ["10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",];
  const designers = [
    {
      "name": "Marine King",
      "description": "돌격컷의 제왕",
      "photo": "https://business.ssafy-ebs.com/download/designer3.png",
      "designer_seq": 1
    },
    {
      "name": "David Ryu",
      "description": "투블럭 마스터",
      "photo": "https://business.ssafy-ebs.com/download/designer2.png",
      "designer_seq": 2
    },
    {
      "name": "Daegu Bank",
      "description": "은행나무컷 마스터",
      "photo": "https://business.ssafy-ebs.com/download/designer2.png",
      "designer_seq": 3
    }
  ];
  const reservations = [
    {
      "name": "Marine King",
      "photo": "https://business.ssafy-ebs.com/download/designer1.png",
      "time": "2022-11-06 12:30:00",
      "reservation_seq": 1,
      "designer_seq": 1
    },
    {
      "name": "Marine King",
      "photo": "https://business.ssafy-ebs.com/download/designer1.png",
      "time": "2022-11-06 10:30:00",
      "reservation_seq": 6,
      "designer_seq": 1
    },
    {
      "name": "David Ryu",
      "photo": "https://business.ssafy-ebs.com/download/designer1.png",
      "time": "2022-11-06 15:30:00",
      "reservation_seq": 7,
      "designer_seq": 2
    },
    {
      "name": "Daegu Bank",
      "photo": "https://business.ssafy-ebs.com/download/designer1.png",
      "time": "2022-11-06 11:00:00",
      "reservation_seq": 8,
      "designer_seq": 3
    },
    {
      "name": "Daegu Bank",
      "photo": "https://business.ssafy-ebs.com/download/designer1.png",
      "time": "2022-11-06 14:00:00",
      "reservation_seq": 9,
      "designer_seq": 3
    },
  ];

  function isReserved(designerName, timeStr) {
    let result = 0;
    reservations.forEach((reservation) => {
      if (reservation["name"] === designerName && reservation["time"].slice(11, 16) === timeStr) {
        result = reservation["reservation_seq"];
      }
    });
    return result;
  }

  return (
    <>
      <NavBar></NavBar>
      <ScheduleMain>
        <ScheduleSection>
          <TitleDiv>0000-00-00 예약 시간표</TitleDiv>
          <TimeTable>
            <TimeTableHead>
              <TimeTableHeadRow>
                <TimeTableHeadMain></TimeTableHeadMain>
                {
                  time.length ?
                    time.map((timeStr) => {
                      return (
                        <TimeTableHeadData key={timeStr}>{timeStr}</TimeTableHeadData>
                      );
                    }) :
                    <></>
                }
              </TimeTableHeadRow>
            </TimeTableHead>
            <TimeTableBody>
              {
                designers.length ?
                  designers.map((designer) => {
                    return (
                      <TimeTableRow key={designer["name"]}>
                        <TimeTableDesignerName>{designer["name"]}</TimeTableDesignerName>
                        {
                          time.length ?
                            time.map((timeStr) => {
                              return (
                                isReserved(designer["name"], timeStr) === 0 ?
                                  <TimeTableData key={timeStr}></TimeTableData> :
                                  <TimeTableData className={"reserved"} key={timeStr}>상세</TimeTableData>
                              );
                            }) :
                            <></>
                        }
                      </TimeTableRow>
                    );
                  }) :
                  <></>
              }
            </TimeTableBody>
          </TimeTable>
        </ScheduleSection>
      </ScheduleMain>
    </>
  );
}

export default TimeSheet;