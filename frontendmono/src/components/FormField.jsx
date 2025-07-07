import PropTypes from 'prop-types';

const FormField = ({
    label,
    id,
    type,
    name,
    value,
    onChange,
    placeholder,
    error
}) => (
    <div style={{ marginBottom: '20px', textAlign: 'center', width: '100%' }}>
        <label htmlFor={id} style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>{label}</label>
        <input
            id={id}
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            required
            style={{ width: "100%", textAlign: 'center', backgroundColor: 'white', color: 'black' }}
            placeholder={placeholder}
        />
        {error && <span style={{ color: "red", fontSize: "0.9em" }}>{error}</span>}
    </div>
);

FormField.propTypes = {
    label: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    error: PropTypes.string
};

export default FormField;