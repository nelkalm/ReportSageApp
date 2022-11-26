import React, { useState } from "react";
import { FormRow, Alert } from "../../components";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/DashboardFormPage";

const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } =
    useAppContext();

  const [firstName, setFirstName] = useState(user?.firstName);
  const [lastName, setLastName] = useState(user?.lastName);
  const [email, setEmail] = useState(user?.email);
  const [programType, setProgramType] = useState(user?.programType);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !programType) {
      displayAlert();
      return;
    }

    updateUser({ firstName, lastName, email, programType });
  };

  return (
    <Wrapper>
      <form action="" className="form" onSubmit={handleSubmit}>
        <h3>Profile</h3>
        {showAlert && <Alert />}
        <div className="form-center">
          <FormRow
            type="text"
            name="firstName"
            labelText="First Name"
            value={firstName}
            handleChange={(e) => setFirstName(e.target.value)}
          />
          <FormRow
            type="text"
            name="lastName"
            labelText="Last Name"
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            type="email"
            name="email"
            value={email}
            handleChange={(e) => setEmail(e.target.value)}
          />

          <div className="form-row">
            <label className="form-label">Program Department</label>
            <select
              onChange={(e) => setProgramType(e.target.value)}
              name="programType"
              value={programType}
              className="form-input"
            >
              <option value="select">Select program department</option>
              <option value="Art">Art</option>
              <option value="Nature">Nature</option>
              <option value="Neighborhood">Neighborhood</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <button className="btn btn-block" type="submit" disabled={isLoading}>
            {isLoading ? "Please wait..." : "Save changes"}
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default Profile;
