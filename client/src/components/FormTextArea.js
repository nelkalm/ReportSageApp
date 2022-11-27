import React from "react";

const FormTextArea = ({
  name,
  value,
  labelText,
  rows,
  placeholder,
  handleChange,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <textarea
        name={name}
        value={value}
        id={name}
        className="form-textarea"
        rows={rows}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};

export default FormTextArea;
