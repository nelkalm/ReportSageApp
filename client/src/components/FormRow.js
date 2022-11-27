import React from "react";

const FormRow = ({
  type,
  name,
  value,
  handleChange,
  labelText,
  placeholder,
  minLength,
  maxLength,
  size,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={handleChange}
        placeholder={placeholder}
        className="form-input"
        minLength={minLength}
        maxLength={maxLength}
        size={size}
      />
    </div>
  );
};

export default FormRow;
