import { useState } from "react";
import ClientService from "../services/ClientService.js";
import { useNavigate } from "react-router-dom";
import FormField from "./FormField";
import FeedbackMessage from "./FeedbackMessage";
import FormContainer from "./FormContainer";

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

        if (name === "dateOfBirth") {
            // Validar que la fecha no sea futura
            const today = new Date().toISOString().split("T")[0];
            if (value > today) {
                setFeedbackMessage("Error: No puede seleccionar una fecha futura.");
            } else {
                setFeedbackMessage("");
            }
        }
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
            .then(() => {
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
        <FormContainer onBack={goToClientSection} title="Registro de usuario">
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <FormField
                    label="Nombre"
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ej. Juan Perez"
                />
                <FormField
                    label="Email"
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Ej. usuario@correo.com"
                />
                <FormField
                    label="Fecha de nacimiento"
                    id="dateOfBirth"
                    name="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                />
                <button type="submit">Registrar</button>
            </form>
            <FeedbackMessage message={feedbackMessage} />
        </FormContainer>
    );
};

export default ClientRegister;