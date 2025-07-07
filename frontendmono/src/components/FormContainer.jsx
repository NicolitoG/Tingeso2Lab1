import React from "react";
import PropTypes from "prop-types";

const FormContainer = ({ onBack, children, title }) => (
    <div className="form-outer-container">
        <div className="form-back-btn">
            <button onClick={onBack}>Volver</button>
        </div>
        <div className="form-inner-container">
            {title && <h2 style={{ textAlign: 'center' }}>{title}</h2>}
            {children}
        </div>
    </div>
);
FormContainer.propTypes = {
    onBack: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    title: PropTypes.string
};

export default FormContainer;