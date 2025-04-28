import httpClient from "../http-common";

const register = (data) => {
    return httpClient.post("/api/v1/clients/register", data);
}

const login = (data) => {
    return httpClient.post("/api/v1/clients/login", data);
}

const createReservation = (data) => {
    return httpClient.post("/api/v1/reservations/create", data);
}

const getReservations = (name) => {
    return httpClient.get(`/api/v1/reservations/client/name/${name}`);
}

const getAllPendingReservations = () => {
    return httpClient.get("/api/v1/reservations/allPendingReservations");
}

const approveReservation = (reservationCode) => {
    return httpClient.put(`/api/v1/reservations/approve/${reservationCode}`);
};

const rejectReservation = (reservationCode) => {
    return httpClient.put(`/api/v1/reservations/reject/${reservationCode}`);
};


export default {
    register, login, createReservation, getReservations, getAllPendingReservations, approveReservation, rejectReservation
}