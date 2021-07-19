import { Component } from "react";
import lets_build from "../images/lets_build.png";
import logo from "../images/logo.png";
import "./mainComponent.css";
import Form from "../components/form/formComponent";
import JoinCommunity from "./joinCommunityComponent";

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.openForm = this.openForm.bind(this);
  }

  openForm = () => {
    document.getElementById("main-header").className =
      "main-header hide_section";
    document.getElementById("form_section").className = "form_section";
  };
  // @override
  render = () => {
    return (
      <div className="main-container">
        <div className="main-content">
          <img src={logo} alt="bowe" className="logo" />
          <header className="main-header" id="main-header">
            <img className="lets_build" src={lets_build} alt="lets_build" />
            <div className="header-content">
              <h2>
                Could you please spare a moment to share your thoughts with us?
              </h2>
              <button className="sureask" type="button" onClick={this.openForm}>
                <span>Sure,Ask!😋</span>
                <svg
                  width="18"
                  height="18"
                  className="mirror--rtl"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.66552 13.3716C5.46027 13.1869 5.44363 12.8708 5.62836 12.6655L9.82732 8L5.62836 3.33448C5.44363 3.12922 5.46027 2.81308 5.66552 2.62835C5.87078 2.44362 6.18692 2.46026 6.37165 2.66551L10.8717 7.66551C11.0428 7.85567 11.0428 8.14433 10.8717 8.33448L6.37165 13.3345C6.18692 13.5397 5.87078 13.5564 5.66552 13.3716Z"
                    stroke="#ffffff"
                    strokeWidth="1"
                  ></path>
                </svg>
              </button>
            </div>
          </header>
          <section id="form_section" className="form_section hide_section">
            <Form></Form>
          </section>
        </div>
      </div>
    );
  };
}

export default Main;
