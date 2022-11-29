import React from "react";
import { Link } from "react-router-dom";
import main from "../assets/images/main_img.svg";
import Wrapper from "../assets/wrappers/LandingPage";
import { Logo } from "../components/index";

const Landing = () => {
  const footerYear = new Date().getFullYear();
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        {/** info */}
        <div className="info">
          <h1>Reporting App</h1>
          <p>
            This is a reporting app where program staff can register for an
            account to create and manage program and event reports. Development
            staff can then use report information to generate program statistics
            and communicate to funders. This app is currently being used by
            Delridge Neighborhoods Development Association.
          </p>
          <Link to="/register" className="btn btn-hero">
            Login/Register
          </Link>
        </div>
        <img src={main} alt="report" className="img main-img" />
      </div>
      <footer className="footer">
        <p>
          Copyright &copy; {footerYear}. Created by Nelson Lu. All Rights
          Reserved.
        </p>
      </footer>
    </Wrapper>
  );
};

export default Landing;
