import React from 'react';
import Card from 'react-bootstrap/Card';
import Hairshopimage03  from "../../assets/Hairshopimage03.png";
import Hairshopimage02  from "../../assets/Hairshopimage02.png";

const ReservationInfoDetail = () => {
    const myhair01 = Hairshopimage03
    const myhair02 = Hairshopimage02
    const design_request = "만나서 디자인 협의"
    const service_request = "말은 최소한으로 해주세요"
    const sub_request = "옆머리 3cm, 앞머리 눈썹위로 해주세요"
    return (
      <>
        <Card>
            <Card.Img variant="top" src={myhair01} />
            <Card.Body>
                <Card.Text>
                    <div>
                        요청사항
                    </div>
                        <div>
                            {design_request}
                        </div>
                        <div>
                            {service_request}
                        </div>
                        <div>
                            {sub_request}
                        </div>
                </Card.Text>
            </Card.Body>
        </Card>
        <br />
        <Card>
            <Card.Body>
                <Card.Text>
                    <div>
                            요청사항
                    </div>
                            <div>
                                {design_request}
                            </div>
                            <div>
                                {service_request}
                            </div>
                            <div>
                                {sub_request}
                            </div>
                </Card.Text>
            </Card.Body>
            <Card.Img variant="bottom" src={myhair02} />
        </Card>
      </>
    );
};

export default ReservationInfoDetail;