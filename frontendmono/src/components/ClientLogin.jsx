import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/ClientService";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";

const ClientLogin = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [nameError, setNameError] = useState("");
    const [emailError, setEmailError] = useState("");

    const navigate = useNavigate();

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

        // Verifica si hay errores en los campos
        if (!name || nameError || !email || emailError) {
            setFeedbackMessage("Error: Por favor ingrese un nombre y email válidos.");
            return;
        }

        const userCredentials = { name, email };

        userService.login(userCredentials)
            .then((response) => {
                console.log("Response del servidor:", response);

                if (response.status === 200 && response.data) {
                    setFeedbackMessage("Login exitoso, redirigiendo...");
                    console.log("Nombre enviado al componente ClientLogged:", name);
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
        <Box>
            <h1>Iniciar Sesión</h1>

            {feedbackMessage && (
                <Typography color={feedbackMessage.startsWith("Error") ? "error" : "primary"}>
                    {feedbackMessage}
                </Typography>
            )}

            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    id="name"
                    label="Nombre"
                    type="text"
                    value={name}
                    variant="outlined"
                    onChange={handleNameChange}
                    helperText={nameError || "Ej. Juan Perez"}
                    error={!!nameError}
                    required
                />
            </FormControl>

            <FormControl fullWidth sx={{ mb: 2 }}>
                <TextField
                    id="email"
                    label="Email"
                    type="email"
                    value={email}
                    variant="outlined"
                    onChange={handleEmailChange}
                    helperText={emailError || "Ej. usuario@correo.com"}
                    error={!!emailError}
                    required
                />
            </FormControl>

            <Button
                variant="contained"
                color="primary"
                onClick={loginUser}
            >
                Iniciar Sesión
            </Button>
        </Box>
    );
};

export default ClientLogin;