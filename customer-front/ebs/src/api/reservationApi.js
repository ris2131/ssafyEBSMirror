import axios from "./index";
export const reservationApi = {
    getreservations : () => axios.get("/reservations"),
    deletePhoto: (photo_url)=>axios.delete(`/reservations/photo?photo_url=${photo_url}`),
    getAvailableDesigners : (businessSeq, reservationDate) => axios.get(`/reservations/${businessSeq}/${reservationDate}`),
    makeReservation : (data) => axios.post("/reservations", data)
};