import axios from "./index";
export const reservationApi = {
    getreservations : () => axios.get("/reservations"),
};