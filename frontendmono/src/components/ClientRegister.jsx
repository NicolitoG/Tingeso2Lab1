import React, { useState } from "react";
import ClientService from "../services/ClientService.js";
import { useNavigate } from "react-router-dom";

const ClientRegister = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        dateOfBirth: "",
    });
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const navigate = useNavigate();

    const goToClientSection = () => {
        navigate("/ClientHome");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Convertir la fecha al formato "DD-MM-YYYY"
        const [year, month, day] = formData.dateOfBirth.split("-");
        const formattedBirthdate = `${day}-${month}-${year}`;

        const newUser = {
            name: formData.name,
            email: formData.email,
            birthDate: formattedBirthdate,
        };

        ClientService.register(newUser)
            .then((response) => {
                console.log("User has been added.", response.data);
                setFeedbackMessage("El usuario ha sido registrado correctamente, redirigiendo...");
                setTimeout(() => {
                    navigate("/ClientHome");
                }, 2000);
            })
            .catch((error) => {
                setFeedbackMessage("Error: There was un problema registrando el usuario.");
                console.error("An error occurred while creating a new user.", error);
            });
    };

    return (
        <div>
            <button onClick={goToClientSection} style={{ marginBottom: 20 }}>
                Volver
            </button>
            <h2>Registro de usuario</h2>
            {feedbackMessage && <p style={{ color: "green" }}>{feedbackMessage}</p>}
            <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "0 auto" }}>
                <div className="formGroup" style={{ marginBottom: 15 }}>
                    <label htmlFor="name">Nombre</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="formGroup" style={{ marginBottom: 15 }}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ width: "100%" }}
                    />
                </div>
                <div className="formGroup" style={{ marginBottom: 15 }}>
                    <label htmlFor="dateOfBirth">Fecha de nacimiento</label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                        style={{ width: "100%" }}
                    />
                </div>
                <button type="submit">Registrar</button>
            </form>
        </div>
    );
};

export default ClientRegister;