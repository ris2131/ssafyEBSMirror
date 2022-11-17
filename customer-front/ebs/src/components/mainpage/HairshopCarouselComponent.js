import Carousel from 'react-bootstrap/Carousel';
import Hairshopimage01  from "../../assets/Hairshopimage01.png";
import Hairshopimage02  from "../../assets/Hairshopimage02.png";
import Hairshopimage03  from "../../assets/Hairshopimage03.png";
import ReservationButton from "./ReservationButton";

const subscribehairshop = [] 
const hairshopname = "쌈봉이발소 1호점"
  

const HairshopCarousel = () => {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Hairshopimage01}
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>{hairshopname}</h3>
          <ReservationButton/>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Hairshopimage02}
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>{hairshopname}</h3>
          <ReservationButton/>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={Hairshopimage03}
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>{hairshopname}</h3>
          <ReservationButton/>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    
  );
};

export default HairshopCarousel;


