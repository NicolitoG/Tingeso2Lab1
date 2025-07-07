const FeedbackMessage = ({ message }) => (
    message ? (
        <p style={{
            color: message.startsWith("Error") ? "red" : "green",
            border: "3px solid",
            borderColor: "#4a1050",
            backgroundColor: "white",
            fontSize: "1.2rem",
            fontWeight: "bold",
            marginBottom: "20px",
            marginTop: "20px",
            textAlign: "center"
        }}>
            {message}
        </p>
    ) : null
);

import PropTypes from 'prop-types';

FeedbackMessage.propTypes = {
    message: PropTypes.string.isRequired,
};

export default FeedbackMessage;