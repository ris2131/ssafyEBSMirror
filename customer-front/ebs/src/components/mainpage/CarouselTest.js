import Carousel from 'react-bootstrap/Carousel';
import ReservationButton from "./ReservationButton";
import Hairshopimage01  from "../../assets/Hairshopimage01.png";

const CarouselTest = (props) => {
    return (
        
          <Carousel.Item>
                <img
                className="d-block w-100"
                src={Hairshopimage01}
                alt="First slide"
            />
                <Carousel.Caption>
                    <h3>{props.subscribe.hairshopName}</h3>
                    <ReservationButton/>
                </Carousel.Caption>
            </Carousel.Item>
        
    );
};

export default CarouselTest;