import { useState } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/ClientService";
import FormField from "./FormField";
import FeedbackMessage from "./FeedbackMessage";
import FormContainer from "./FormContainer";

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
        <FormContainer onBack={goToClientSection} title="Iniciar Sesión">
            <form onSubmit={loginUser} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <FormField
                    label="Nombre"
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Ej. Juan Perez"
                    error={nameError}
                />
                <FormField
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Ej. usuario@correo.com"
                    error={emailError}
                />
                <button type="submit">Iniciar Sesión</button>
            </form>
            <FeedbackMessage message={feedbackMessage} />
        </FormContainer>
    );
};

export default ClientLogin;