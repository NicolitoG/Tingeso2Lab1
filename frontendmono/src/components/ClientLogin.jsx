import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/ClientService";

const ClientLogin = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");

    const navigate = useNavigate();

    const goToClientSection = () => {
        navigate('/ClientHome');
    };

    const handleNameChange = (e) => {
        const value = e.target.value;
        setName(value);

        if (!value) {
            setNameError("El nombre es requerido.");
        } else {
            setNameError("");
        }
    };

    const handleEmailChange = (e) => {
        const value = e.target.value;
        setEmail(value);

        if (!value) {
            setEmailError("El email es requerido.");
        } else {
            setEmailError("");
        }
    };

    const loginUser = (e) => {
        e.preventDefault();

        if (!name || nameError || !email || emailError) {
            setFeedbackMessage("Error: Por favor ingrese un nombre y email válidos.");
            return;
        }

        const userCredentials = { name, email };

        userService.login(userCredentials)
            .then((response) => {
                if (response.status === 200 && response.data) {
                    setFeedbackMessage("Inicio de sesión exitoso, redirigiendo...");
                    setTimeout(() => {
                        navigate('/ClientLogged', { state: { name } });
                    }, 2500);
                } else {
                    setFeedbackMessage("Error: Nombre o email incorrecto");
                }
            })
            .catch((error) => {
                setFeedbackMessage("Error: Nombre o email incorrecto");
                console.error("Error de inicio de sesión:", error);
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
                <h1 style={{ textAlign: 'center' }}>Iniciar Sesión</h1>
                <form onSubmit={loginUser} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                    <div style={{ marginBottom: '20px', textAlign: 'center', width: '100%' }}>
                        <label htmlFor="name" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Nombre</label>
                        <input
                            id="name"
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            required
                            style={{ width: "100%", textAlign: 'center', backgroundColor: 'white', color: 'black' }}
                            placeholder="Ej. Juan Perez"
                        />
                        {nameError && <span style={{ color: "red", fontSize: "0.9em" }}>{nameError}</span>}
                    </div>
                    <div style={{ marginBottom: '20px', textAlign: 'center', width: '100%' }}>
                        <label htmlFor="email" style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Email</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                            style={{ width: "100%", textAlign: 'center', backgroundColor: 'white', color: 'black' }}
                            placeholder="Ej. usuario@correo.com"
                        />
                        {emailError && <span style={{ color: "red", fontSize: "0.9em" }}>{emailError}</span>}
                    </div>
                    <button type="submit">Iniciar Sesión</button>
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

export default ClientLogin;