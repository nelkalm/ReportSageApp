import React from "react";

const FormTextArea = ({
  labelText,
  name,
  rows,
  placeholder,
  value,
  handleChange,
}) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText || name}
      </label>
      <textarea
        name={name}
        id={name}
        className="form-textarea"
        rows={rows}
        placeholder={placeholder}
        defaultValue={value}
        onChange={handleChange}
      />
    </div>
  );
};

export default FormTextArea;
