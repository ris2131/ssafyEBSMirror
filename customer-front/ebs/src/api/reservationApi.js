import axios from "./index";
export const reservationApi = {
    getreservations : () => axios.get("/reservations"),
    getAvailableDesigners : (businessSeq, reservationDate) => axios.get(`/reservations/${businessSeq}/${reservationDate}`),
    makeReservation : (data) => axios.post("/reservations", data)
};