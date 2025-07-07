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
                setFeedbackMessage("El usuario ha sido registrado correctamente, Volviendo...");
                setTimeout(() => {
                    navigate("/ClientHome");
                }, 3000);
            })
            .catch((error) => {
                setFeedbackMessage("Error: Hubo un problema registrando el usuario.");
                console.error("An error occurred while creating a new user.", error);
            });
    };

return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '100%', textAlign: 'left', marginBottom: '20px' }}>
                <button onClick={goToClientSection}>
                    Volver
                </button>
            </div>
            <div style={{ backgroundColor: "rgb(25, 76, 87)", color: 'white', padding: '20px', borderRadius: '10px', width: '80%' }}>
                <h2 style={{ textAlign: 'center' }}>Registro de usuario</h2>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <div style={{ marginBottom: '20px', textAlign: 'center', width: '100%' }}>
                        <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            style={{ width: "100%", textAlign: 'center', backgroundColor: 'white', color: 'black' }}
                        />
                    </div>
                    <div style={{ marginBottom: '20px', textAlign: 'center', width: '100%' }}>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={{ width: "100%", textAlign: 'center', backgroundColor: 'white', color: 'black' }}
                        />
                    </div>
                    <div style={{ marginBottom: '20px', textAlign: 'center', width: '100%' }}>
                        <label htmlFor="dateOfBirth" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Fecha de nacimiento</label>
                        <input
                            type="date"
                            id="dateOfBirth"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            required
                            style={{ width: "100%", textAlign: 'center', backgroundColor: 'white', color: 'black' }}
                        />
                    </div>
                    <button type="submit">Registrar</button>
                </form>
                {feedbackMessage && <p style={{
                    color: feedbackMessage.startsWith("Error") ? "red" : "green",
                    border: "3px solid",
                    borderColor: "#4a1050",
                    backgroundColor: "white",
                    fontSize: "1.2rem",
                    fontWeight: "bold",
                    marginBottom: "20px",
                    marginTop: "20px",
                    textAlign: "center"
                }}>
                    {feedbackMessage}
                </p>}
            </div>
        </div>
    );
};

export default ClientRegister;