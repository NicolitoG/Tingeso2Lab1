import React, { useState } from "react";
import ClientService from "../services/ClientService.js";
import { useNavigate } from "react-router-dom"; // Ensure you have react-router-dom installed

const ClientRegister = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        dateOfBirth: "",
    });
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const navigate = useNavigate();

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
            BirthDate: formattedBirthdate, // Usar la fecha formateada
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
                setFeedbackMessage("Error: There was a problem registering the user.");
                console.error("An error occurred while creating a new user.", error);
            });
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.heading}>Register</h2>
            {feedbackMessage && <p style={styles.feedback}>{feedbackMessage}</p>}
            <form onSubmit={handleSubmit} style={styles.form}>
                <div style={styles.formGroup}>
                    <label htmlFor="name" style={styles.label}>
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="email" style={styles.label}>
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <div style={styles.formGroup}>
                    <label htmlFor="dateOfBirth" style={styles.label}>
                        Date of Birth
                    </label>
                    <input
                        type="date"
                        id="dateOfBirth"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        style={styles.input}
                        required
                    />
                </div>
                <button type="submit" style={styles.button}>
                    Register
                </button>
            </form>
        </div>
    );
};

const styles = {
    container: {
        maxWidth: "400px",
        margin: "50px auto",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        fontFamily: "Arial, sans-serif",
    },
    heading: {
        textAlign: "center",
        marginBottom: "20px",
        fontSize: "24px",
        color: "#333",
    },
    feedback: {
        textAlign: "center",
        marginBottom: "15px",
        fontSize: "14px",
        color: "green",
    },
    form: {
        display: "flex",
        flexDirection: "column",
    },
    formGroup: {
        marginBottom: "15px",
    },
    label: {
        marginBottom: "5px",
        fontSize: "14px",
        color: "#555",
    },
    input: {
        width: "100%",
        padding: "8px",
        fontSize: "14px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        boxSizing: "border-box",
    },
    button: {
        padding: "10px",
        fontSize: "16px",
        color: "#fff",
        backgroundColor: "#007BFF",
        border: "none",
        borderRadius: "4px",
        cursor: "pointer",
        textAlign: "center",
    },
};

export default ClientRegister;