import React, { useState, useEffect } from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/RegisterPage";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  programType: "",
  isMember: true,
};

const Register = () => {
  const [values, setValues] = useState(initialState);

  // global state and useNavigate
  const navigate = useNavigate();

  const { user, isLoading, showAlert, displayAlert, registerUser, loginUser } =
    useAppContext();

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, programType, email, password, isMember } =
      values;
    if (
      !email ||
      !password ||
      (!isMember && !firstName && !lastName && !programType)
    ) {
      displayAlert();
      return;
    }

    const currentUser = { firstName, lastName, email, password, programType };

    if (isMember) {
      loginUser(currentUser);
    } else {
      registerUser(currentUser);
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [user, navigate]);

  return (
    <Wrapper className="full-page">
      <form className="form" onSubmit={onSubmit}>
        <Logo />
        <h3>{values.isMember ? "Login" : "Register"}</h3>
        {showAlert && <Alert />}
        {/**First Name input */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="firstName"
            labelText="First Name"
            value={values.firstName}
            handleChange={handleChange}
          />
        )}

        {/**Last Name input */}
        {!values.isMember && (
          <FormRow
            type="text"
            name="lastName"
            labelText="Last Name"
            value={values.lastName}
            handleChange={handleChange}
          />
        )}

        {/**Program Department input */}
        {!values.isMember && (
          <div className="form-row">
            <label className="form-label">Program Department</label>
            <select
              onChange={handleChange}
              name="programType"
              value={values.programType}
              className="form-input"
            >
              <option value="select">Select program department</option>
              <option value="Art">Art</option>
              <option value="Nature">Nature</option>
              <option value="Neighborhood">Neighborhood</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        )}

        {/**Email input */}
        <FormRow
          type="email"
          name="email"
          value={values.email}
          handleChange={handleChange}
        />
        {/**Password input */}
        <FormRow
          type="password"
          name="password"
          value={values.password}
          handleChange={handleChange}
        />
        <button type="submit" className="btn btn-block" disabled={isLoading}>
          submit
        </button>
        <p>
          {values.isMember ? "Not a member yet?" : "Already a member?"}
          <button type="button" onClick={toggleMember} className="member-btn">
            {values.isMember ? "Register" : "Login"}
          </button>
        </p>
      </form>
    </Wrapper>
  );
};

export default Register;
