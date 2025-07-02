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
                    setFeedbackMessage("Login exitoso, redirigiendo...");
                    setTimeout(() => {
                        navigate('/ClientLogged', { state: { name } });
                    }, 2000);
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
        <div>
            <button onClick={goToClientSection} style={{ marginBottom: 20 }}>
                Volver
            </button>
            <h1>Iniciar Sesión</h1>

            {feedbackMessage && (
                <p style={{ color: feedbackMessage.startsWith("Error") ? "red" : "green" }}>
                    {feedbackMessage}
                </p>
            )}

            <form onSubmit={loginUser} style={{ maxWidth: 400, margin: "0 auto" }}>
                <div className="formGroup" style={{ marginBottom: 15 }}>
                    <label htmlFor="name">Nombre</label>
                    <input
                        id="name"
                        type="text"
                        value={name}
                        onChange={handleNameChange}
                        required
                        style={{ width: "100%" }}
                        placeholder="Ej. Juan Perez"
                    />
                    {nameError && <span style={{ color: "red", fontSize: "0.9em" }}>{nameError}</span>}
                </div>
                <div className="formGroup" style={{ marginBottom: 15 }}>
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        style={{ width: "100%" }}
                        placeholder="Ej. usuario@correo.com"
                    />
                    {emailError && <span style={{ color: "red", fontSize: "0.9em" }}>{emailError}</span>}
                </div>
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default ClientLogin;