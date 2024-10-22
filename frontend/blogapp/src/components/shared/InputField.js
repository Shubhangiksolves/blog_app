import React from 'react';
import PropTypes from 'prop-types';
import '../../assets/css/input.css';

export const InputField = ({
  className = '',
  type = 'text',
  value = '',
  name = '',
  onInputChange,
  onBlur,
  placeholder = '',
  required = false,
  disabled = false,
  readOnly = false,
  label = '',
  error = '',
  icon = null,
  variant = 'default',
  ...props
}) => {
  return (
    <div className={`mb-3 input-variant-${variant} d-flex flex-column align-items-start`}>
      {label && <label htmlFor={name} className="form-label">{label}</label>}
      <div className="input-group">
        {icon && <span className="input-group-text">{icon}</span>}
        <input
          className={`form-control ${className}`}
          type={type}
          value={value}
          name={name}
          onChange={onInputChange}
          onBlur={onBlur}
          placeholder={placeholder}
          required={required}
          disabled={disabled || readOnly}
          readOnly={readOnly}
          {...props}
        />
      </div>
      {error && <div className="invalid-feedback d-block">{error}</div>}
    </div>
  );
};

InputField.propTypes = {
  className: PropTypes.string,
  type: PropTypes.oneOf(['text', 'password', 'email', 'number', 'tel', 'url', 'search']),
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  label: PropTypes.string,
  error: PropTypes.string,
  icon: PropTypes.node,
  variant: PropTypes.oneOf(['default', 'outlined', 'filled', 'underlined']),
};

InputField.defaultProps = {
  className: '',
  type: 'text',
  value: '',
  name: '',
  placeholder: '',
  required: false,
  disabled: false,
  readOnly: false,
  label: '',
  error: '',
  icon: null,
  variant: 'default',
};
