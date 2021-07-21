import { Component } from "react";
import ProgressBar from "../progressBar/progressBarComponent";
import CircularProgressBar from "../progressBar/circularBarComponent";
import "./formComponent.css";
import $ from "jquery";
import MessageBox from "../messageBox/messageBoxComponent";
import Checkbox from "../checkBox/checkboxComponent";
import JoinCommunity from "../../pages/joinCommunityComponent";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // data vairables
      name: "",
      email: "",
      whatsapp: "",
      academic_year: "",
      about_self: "",
      development: "",
      things: new Set(),
      session: "",
      connect_experts: "",
      pay_experts: "",
      community: "",

      // local variables
      current_question: 1,
      percentage: 0,
      show_submit: false,
      submitted: false,
      submit_status: "SUBMIT",
      message_type: "none",
      message_desc: "",
    };
    this.prevQuestion = this.prevQuestion.bind(this);
    this.showMessage = this.showMessage.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.validate = this.validate.bind(this);
  }

  prevQuestion = (event) => {
    let prev_question_no = this.state.current_question;
    if (this.state.current_question > 1)
      prev_question_no = this.state.current_question - 1;
    this.setState({
      current_question: prev_question_no,
      percentage: (prev_question_no - 1) * 10,
    });
  };

  showMessage = () => {
    $("#alertBox").show();
    setTimeout(function () {
      $("#alertBox").fadeOut(1500);
    }, 2000);
  };

  toggleCheckBox = (label) => {
    if (this.state.things.has(label)) {
      this.state.things.delete(label);
    } else {
      this.state.things.add(label);
    }
  };

  validate = (event) => {
    let next_question_no,
      new_message_type = "none",
      new_message_desc = "";
    switch (this.state.current_question) {
      case 1: {
        if ((this.state.name === "") | (this.state.name === null)) {
          new_message_type = "warning";
          new_message_desc = "Please fill your name.";
          next_question_no = 1;
        } else {
          next_question_no = 2;
        }
        break;
      }
      case 2: {
        let re =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (
          (this.state.email === "") |
          (this.state.email === null) |
          !re.test(this.state.email)
        ) {
          new_message_type = "warning";
          new_message_desc = "Please fill valid Email address.";
          next_question_no = 2;
        } else {
          next_question_no = 3;
        }
        break;
      }
      case 3: {
        if (
          (this.state.whatsapp === "") |
          (this.state.whatsapp === null) |
          (this.state.whatsapp.length !== 10)
        ) {
          new_message_type = "warning";
          new_message_desc = "Mobile Number must be 10 digits only.";
          next_question_no = 3;
        } else {
          next_question_no = 4;
        }
        break;
      }
      case 4: {
        if (
          (this.state.academic_year === "") |
          (this.state.academic_year === null)
        ) {
          next_question_no = 4;
        } else {
          next_question_no = 5;
        }
        break;
      }
      case 5: {
        if ((this.state.about_self === "") | (this.state.about_self === null)) {
          new_message_type = "warning";
          new_message_desc = "Please, let us know more about yourself.";
          next_question_no = 5;
        } else {
          next_question_no = 6;
        }
        break;
      }
      case 6: {
        if (
          (this.state.development === "") |
          (this.state.development === null)
        ) {
          new_message_type = "warning";
          new_message_desc = "Please, let us know abut your overall skills.";
          next_question_no = 6;
        } else {
          next_question_no = 7;
        }
        break;
      }
      case 7: {
        if (this.state.things.size == 0) {
          new_message_type = "warning";
          new_message_desc = "Please Tick at least one options.";
          next_question_no = 7;
        } else {
          next_question_no = 8;
        }
        break;
      }
      case 8: {
        if (this.state.session === "") {
          next_question_no = 8;
        } else {
          next_question_no = 9;
        }
        break;
      }
      case 9: {
        if (this.state.connect_experts === "") {
          next_question_no = 9;
        } else {
          next_question_no = 10;
        }
        break;
      }
      case 10: {
        if (this.state.pay_experts === "") {
          next_question_no = 10;
        } else {
          next_question_no = 11;
        }
        this.setState({
          current_question: next_question_no,
          percentage: 95,
        });
        return;
      }
      case 11:
        next_question_no = 11;
        this.setState({ show_submit: true });
        break;
    }
    this.setState({
      message_type: new_message_type,
      message_desc: new_message_desc,
      current_question: next_question_no,
      percentage: (next_question_no - 1) * 10,
    });
    this.showMessage();
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
    switch (this.state.current_question) {
      case 4:
        this.validate();
        break;
      case 7:
        this.validate();
        break;
      case 8:
        this.validate();
        break;
      case 9:
        this.validate();
        break;
      case 10:
        this.validate();
        break;
      case 11:
        this.validate();
        break;
    }
  };

  onSubmit = async (event) => {
    var get_url =
      "https://script.google.com/macros/s/AKfycbzG-RAFfrFenVkjjSrNNIHzU9l8fDaS1CG8y5_G_LdrrhZkPWASJ_UPOO3rPmL9CSq83Q/exec";

    // var post_url =
    //   "https://script.google.com/macros/s/AKfycbwyzlwhBuqYyGlJLTb7mQVCfrgNJDHX1Gv2Dkgwr2ppVd52d303N9a0QJMpjs2fsag59g/exec";

    console.log("Submitting...");

    this.setState({ submit_status: "SUBMITTING..." });

    event.preventDefault();

    let all_things = "";
    this.state.things.forEach((thing) => {
      all_things += thing + ",\n";
    });

    var formdata = {
      name: this.state.name,
      email: this.state.email,
      whatsapp: this.state.whatsapp,
      academic_year: this.state.academic_year,
      about_self: this.state.about_self,
      development: this.state.development,
      things: all_things,
      session: this.state.session,
      connect_experts: this.state.connect_experts,
      pay_experts: this.state.pay_experts,
      community: this.state.community,
    };

    let isSubmitted = false;
    var jqxhr = await $.ajax({
      url: get_url,
      method: "GET",
      dataType: "json",
      data: formdata,
      success: function (response) {
        console.log("Submitted succesfully");
        isSubmitted = true;
      },
      error: function (error) {
        console.log("Error - " + error);
        isSubmitted = false;
      },
    });

    if (isSubmitted) {
      this.setState({
        message_type: "success",
        message_desc: "Successfully Submitted",
        submit_status: "SUBMIT",
        submitted: true,
      });
    } else {
      this.setState({
        message_type: "error",
        message_desc: "Something went wrong! Try again.",
        submit_status: "SUBMIT",
      });
    }
    this.showMessage();
  };

  // @override
  render = () => {
    return (
      <div className="form" id="form-div">
        <ProgressBar
          bgcolor="#f7c408"
          progress={this.state.percentage}
          height={4}
          textdisplay="none"
        />
        <div id="alertBox">
          <MessageBox
            type={this.state.message_type}
            title={this.state.message_type}
            desc={this.state.message_desc}
          />
        </div>
        <form
          id="bowe_form"
          onSubmit={this.onSubmit}
          className={
            "bowe_form" +
            (this.state.submitted === false ? " show_div" : " hide_div")
          }
        >
          <div
            className={
              "form-input" +
              (this.state.current_question === 1 ? " show_div" : " hide_div")
            }
          >
            <div className="question">
              <label className="question-label" htmlFor="question">
                Question 1/11
              </label>
              <h3 className="question-text" id="question">
                What is your Name?
              </h3>
            </div>

            <div className="question-2"></div>
            <div className="question-3"></div>
            <div className="answer">
              <input
                className="input-text"
                type="text"
                value={this.state.name}
                onChange={this.handleChange}
                name="name"
                placeholder="Name"
                //required
              />
            </div>
            <button
              className={
                "next_question" + (this.state.name === "" ? " disabled" : "")
              }
              type="button"
              onClick={this.validate}
            >
              <span>Next</span>
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
                  stroke="#63686F"
                  strokeWidth="1"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className={
              "form-input" +
              (this.state.current_question === 2 ? " show_div" : " hide_div")
            }
          >
            <div className="question">
              <label className="question-label" htmlFor="question">
                Question 2/11
              </label>
              <h3 className="question-text" id="question">
                What is your email address?
              </h3>
            </div>

            <div className="question-2"></div>
            <div className="question-3"></div>
            <div className="answer">
              <input
                className="input-text"
                type="email"
                value={this.state.email}
                onChange={this.handleChange}
                name="email"
                placeholder="Email Address"
                //required
              />
            </div>
            <button
              className={
                "next_question" + (this.state.email === "" ? " disabled" : "")
              }
              type="button"
              onClick={this.validate}
            >
              <span>Next</span>
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
                  stroke="#63686F"
                  strokeWidth="1"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className={
              "form-input" +
              (this.state.current_question === 3 ? " show_div" : " hide_div")
            }
          >
            <div className="question">
              <label className="question-label" htmlFor="question">
                Question 3/11
              </label>
              <h3 className="question-text" id="question">
                What is your Whatsapp Number?
              </h3>
            </div>

            <div className="question-2"></div>
            <div className="question-3"></div>
            <div className="answer">
              <input
                className="input-text"
                type="number"
                value={this.state.whatsapp}
                onChange={this.handleChange}
                name="whatsapp"
                placeholder="Whatsapp Number"
                //required
              />
            </div>
            <button
              className={
                "next_question" +
                (this.state.whatsapp === "" ? " disabled" : "")
              }
              type="button"
              onClick={this.validate}
            >
              <span>Next</span>
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
                  stroke="#63686F"
                  strokeWidth="1"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className={
              "form-input" +
              (this.state.current_question === 4 ? " show_div" : " hide_div")
            }
          >
            <div className="question">
              <label className="question-label" htmlFor="question">
                Question 4/11
              </label>
              <h3 className="question-text" id="question">
                Which of the following options best describe your current year
                of academics?
              </h3>
            </div>

            <div className="question-2"></div>
            <div className="question-3"></div>
            <div className="answer">
              <div className="input-radio-box">
                <label
                  className={
                    "label" +
                    (this.state.academic_year === "B.E" ? " selected" : "")
                  }
                  htmlFor="academic_year_be"
                >
                  <span className="input-radio-text">B.E</span>
                  <input
                    className="input-radio"
                    type="radio"
                    value="B.E"
                    onClick={this.handleChange}
                    name="academic_year"
                    id="academic_year_be"
                    //required
                  />
                  <span className="input-radio-key">A</span>
                </label>
              </div>
              <div className="input-radio-box">
                <label
                  className={
                    "label" +
                    (this.state.academic_year === "T.E" ? " selected" : "")
                  }
                  htmlFor="academic_year_te"
                >
                  <span className="input-radio-text">T.E</span>
                  <input
                    className="input-radio"
                    type="radio"
                    value="T.E"
                    onClick={this.handleChange}
                    name="academic_year"
                    id="academic_year_te"
                  />
                  <span className="input-radio-key">B</span>
                </label>
              </div>
              <div className="input-radio-box">
                <label
                  className={
                    "label" +
                    (this.state.academic_year === "S.E" ? " selected" : "")
                  }
                  htmlFor="academic_year_se"
                >
                  <span className="input-radio-text">S.E</span>
                  <input
                    className="input-radio"
                    type="radio"
                    value="S.E"
                    onClick={this.handleChange}
                    name="academic_year"
                    id="academic_year_se"
                  />
                  <span className="input-radio-key">C</span>
                </label>
              </div>
              <div className="input-radio-box">
                <label
                  className={
                    "label" +
                    (this.state.academic_year === "F.E" ? " selected" : "")
                  }
                  htmlFor="academic_year_fe"
                >
                  <span className="input-radio-text">F.E</span>
                  <input
                    className="input-radio"
                    type="radio"
                    value="F.E"
                    onClick={this.handleChange}
                    name="academic_year"
                    id="academic_year_fe"
                  />
                  <span className="input-radio-key">D</span>
                </label>
              </div>
              {/* <div className="input-text-box">
                <input
                  className="input-text"
                  type="text"
                  onChange={this.handleChange}
                  name="academic_year"
                  
                />
                <label htmlFor="things">Other</label>
              </div> */}
            </div>
          </div>
          <div
            className={
              "form-input" +
              (this.state.current_question === 5 ? " show_div" : " hide_div")
            }
          >
            <div className="question">
              <label className="question-label" htmlFor="question">
                Question 5/11
              </label>
              <h3 className="question-text" id="question">
                What can you tell us about yourself? hobbies, passion anything
                else you want to share.
              </h3>
            </div>

            <div className="question-2"></div>
            <div className="question-3"></div>
            <div className="answer">
              <input
                className="input-text"
                type="text"
                value={this.state.about_self}
                onChange={this.handleChange}
                name="about_self"
                placeholder="About Yourself"
                //required
              />
            </div>
            <button
              className={
                "next_question" +
                (this.state.about_self === "" ? " disabled" : "")
              }
              type="button"
              onClick={this.validate}
            >
              <span>Next</span>
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
                  stroke="#63686F"
                  strokeWidth="1"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className={
              "form-input" +
              (this.state.current_question === 6 ? " show_div" : " hide_div")
            }
          >
            <div className="question">
              <label className="question-label" htmlFor="question">
                Question 6/11
              </label>
              <h3 className="question-text" id="question">
                Do you ever focus on your overall development? If yes, which
                non-technical skills would you like to improve in parallel with
                your college academics?
              </h3>
            </div>

            <div className="question-2"></div>
            <div className="question-3"></div>
            <div className="answer">
              <input
                className="input-text"
                type="text"
                value={this.state.development}
                onChange={this.handleChange}
                name="development"
                //required
              />
            </div>
            <button
              className={
                "next_question" +
                (this.state.development === "" ? " disabled" : "")
              }
              type="button"
              onClick={this.validate}
            >
              <span>Next</span>
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
                  stroke="#63686F"
                  strokeWidth="1"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className={
              "form-input" +
              (this.state.current_question === 7 ? " show_div" : " hide_div")
            }
          >
            <div className="question">
              <label className="question-label" htmlFor="question">
                Question 7/11
              </label>
              <h3 className="question-text" id="question">
                What all the things you feel are missing in your college?
              </h3>
              {this.state.things}
            </div>

            <div className="question-2"></div>
            <div className="question-3"></div>
            <div className="answer">
              <div className="input-checkbox">
                <label htmlFor="no_alumni_network">
                  <Checkbox
                    label="no_alumni_network"
                    handleCheckboxChange={this.toggleCheckBox}
                    key="no_alumni_network"
                  />
                  <span className="input-checkbox-text">No Alumni Network</span>
                </label>
              </div>
              <div className="input-checkbox">
                <label htmlFor="practical_exp">
                  <Checkbox
                    label="practical_exp"
                    handleCheckboxChange={this.toggleCheckBox}
                    key="practical_exp"
                  />
                  <span className="input-checkbox-text">
                    Less practical exposure
                  </span>
                </label>
              </div>
              <div className="input-checkbox">
                <label htmlFor="lack_of_development">
                  <Checkbox
                    label="lack_of_development"
                    handleCheckboxChange={this.toggleCheckBox}
                    key="lack_of_development"
                  />
                  <span className="input-checkbox-text">
                    Lack of overall development
                  </span>
                </label>
              </div>
              <div className="input-checkbox">
                <label htmlFor="less_interactive_crowd">
                  <Checkbox
                    label="less_interactive_crowd"
                    handleCheckboxChange={this.toggleCheckBox}
                    key="less_interactive_crowd"
                  />
                  <span className="input-checkbox-text">
                    Less interactive crowd
                  </span>
                </label>
              </div>
              <div className="input-checkbox">
                <label htmlFor="few_clubs">
                  <Checkbox
                    label="few_clubs"
                    handleCheckboxChange={this.toggleCheckBox}
                    key="few_clubs"
                  />
                  <span className="input-checkbox-text">
                    Few clubs/sociteties
                  </span>
                </label>
              </div>
              {/* <div className="input-text-box">
                <input
                  className="input-text"
                  type="text"
                  onChange={this.handleChange}
                  name="things"
                  //required
                />
                <label htmlFor="things">Other</label>
              </div> */}
            </div>
            <button
              className="next_question"
              type="button"
              onClick={this.validate}
            >
              <span>Next</span>
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
                  stroke="#63686F"
                  strokeWidth="1"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className={
              "form-input" +
              (this.state.current_question === 8 ? " show_div" : " hide_div")
            }
          >
            <div className="question">
              <label className="question-label" htmlFor="question">
                Question 8/11
              </label>
              <h3 className="question-text" id="question">
                Do you wish to attend weekly session on what your seniors have
                to say about their placement preparation experience?
              </h3>
            </div>

            <div className="question-2"></div>
            <div className="question-3"></div>
            <div className="answer yes_no">
              <div className="input_yes_no_box">
                <label
                  className={
                    "label" + (this.state.session === "Y" ? " selected" : "")
                  }
                  htmlFor="session_y"
                >
                  <div className="yes_img">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="52"
                      height="52"
                      viewBox="0 0 42 42"
                    >
                      <g fill="currentColor">
                        <path d="M9.841 42h-6.53a3.287 3.287 0 01-3.283-3.284V19.034A3.287 3.287 0 013.31 15.75h6.531a3.289 3.289 0 013.284 3.284v19.682A3.288 3.288 0 019.841 42zm-6.53-23.625a.659.659 0 00-.658.659v19.682a.66.66 0 00.657.659h6.531a.66.66 0 00.659-.659V19.034a.66.66 0 00-.659-.659h-6.53z"></path>
                        <path d="M33.898 42H17.99c-.81 0-1.62-.192-2.345-.554l-4.42-2.21a1.313 1.313 0 011.174-2.348l4.42 2.21a2.63 2.63 0 001.171.277h15.908c.479 0 .925-.259 1.164-.676l1.482-2.593a21.526 21.526 0 002.831-10.662v-4.441a2.63 2.63 0 00-2.628-2.628h-9.879a2.618 2.618 0 01-2.432-3.592 25.25 25.25 0 001.814-9.421V3.84c0-.669-.545-1.215-1.215-1.215h-.817c-.54 0-1.02.362-1.168.88l-.514 1.8A29.96 29.96 0 0117.1 15.833a6.735 6.735 0 01-5.288 2.542H7.874a1.313 1.313 0 010-2.625h3.938a4.129 4.129 0 003.239-1.558 27.35 27.35 0 004.96-9.609l.514-1.8A3.858 3.858 0 0124.218 0h.817a3.844 3.844 0 013.84 3.84v1.522c0 3.579-.675 7.077-2.002 10.396l9.874-.008A5.258 5.258 0 0142 21.003v4.441a24.15 24.15 0 01-3.178 11.965l-1.481 2.593A3.975 3.975 0 0133.898 42z"></path>
                        <circle cx="6.563" cy="35.438" r="1.313"></circle>
                      </g>
                    </svg>
                  </div>
                  <div className="yes_text">
                    <span className="input-radio-text">Yes</span>
                    <input
                      className="input-radio"
                      type="radio"
                      value="Y"
                      onClick={this.handleChange}
                      name="session"
                      id="session_y"
                      //required
                    />
                    <span className="input-radio-key">A</span>
                  </div>
                </label>
              </div>
              <div className="input_yes_no_box">
                <label
                  className={
                    "label" + (this.state.session === "N" ? " selected" : "")
                  }
                  htmlFor="session_n"
                >
                  <div className="no_img">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="52"
                      height="52"
                      viewBox="0 0 42 42"
                    >
                      <g
                        fill="currentColor"
                        fillRule="evenodd"
                        transform="matrix(1 0 0 -1 0 42)"
                      >
                        <path
                          fillRule="nonzero"
                          d="M9.841 42h-6.53a3.287 3.287 0 01-3.283-3.284V19.034A3.287 3.287 0 013.31 15.75h6.531a3.289 3.289 0 013.284 3.284v19.682A3.288 3.288 0 019.841 42zm-6.53-23.625a.659.659 0 00-.658.659v19.682a.66.66 0 00.657.659h6.531a.66.66 0 00.659-.659V19.034a.66.66 0 00-.659-.659h-6.53z"
                        ></path>
                        <path d="M33.898 42H17.99c-.81 0-1.62-.192-2.345-.554l-4.42-2.21a1.313 1.313 0 011.174-2.348l4.42 2.21a2.63 2.63 0 001.171.277h15.908c.479 0 .925-.259 1.164-.676l1.482-2.593a21.526 21.526 0 002.831-10.662v-4.441a2.63 2.63 0 00-2.628-2.628h-9.879a2.618 2.618 0 01-2.432-3.592 25.25 25.25 0 001.814-9.421V3.84c0-.669-.545-1.215-1.215-1.215h-.817c-.54 0-1.02.362-1.168.88l-.514 1.8A29.96 29.96 0 0117.1 15.833a6.735 6.735 0 01-5.288 2.542H7.874a1.313 1.313 0 010-2.625h3.938a4.129 4.129 0 003.239-1.558 27.35 27.35 0 004.96-9.609l.514-1.8A3.858 3.858 0 0124.218 0h.817a3.844 3.844 0 013.84 3.84v1.522c0 3.579-.675 7.077-2.002 10.396l9.874-.008A5.258 5.258 0 0142 21.003v4.441a24.15 24.15 0 01-3.178 11.965l-1.481 2.593A3.975 3.975 0 0133.898 42z"></path>
                        <circle cx="6.563" cy="35.438" r="1.313"></circle>
                      </g>
                    </svg>
                  </div>
                  <div className="no_text">
                    <span className="input-radio-text">No</span>
                    <input
                      className="input-radio"
                      type="radio"
                      value="N"
                      onClick={this.handleChange}
                      name="session"
                      id="session_n"
                    />
                    <span className="input-radio-key">B</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div
            className={
              "form-input" +
              (this.state.current_question === 9 ? " show_div" : " hide_div")
            }
          >
            <div className="question">
              <label className="question-label" htmlFor="question">
                Question 9/11
              </label>
              <h3 className="question-text" id="question">
                Would you like to connect with industry experts one on
                one?(E.g., SDE, Product Managers, HRs of well-known companies)
              </h3>
            </div>

            <div className="question-2"></div>
            <div className="question-3"></div>
            <div className="answer yes_no">
              <div className="input_yes_no_box">
                <label
                  className={
                    "label" +
                    (this.state.connect_experts === "Y" ? " selected" : "")
                  }
                  htmlFor="connect_experts_y"
                >
                  <div className="yes_img">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="52"
                      height="52"
                      viewBox="0 0 42 42"
                    >
                      <g fill="currentColor">
                        <path d="M9.841 42h-6.53a3.287 3.287 0 01-3.283-3.284V19.034A3.287 3.287 0 013.31 15.75h6.531a3.289 3.289 0 013.284 3.284v19.682A3.288 3.288 0 019.841 42zm-6.53-23.625a.659.659 0 00-.658.659v19.682a.66.66 0 00.657.659h6.531a.66.66 0 00.659-.659V19.034a.66.66 0 00-.659-.659h-6.53z"></path>
                        <path d="M33.898 42H17.99c-.81 0-1.62-.192-2.345-.554l-4.42-2.21a1.313 1.313 0 011.174-2.348l4.42 2.21a2.63 2.63 0 001.171.277h15.908c.479 0 .925-.259 1.164-.676l1.482-2.593a21.526 21.526 0 002.831-10.662v-4.441a2.63 2.63 0 00-2.628-2.628h-9.879a2.618 2.618 0 01-2.432-3.592 25.25 25.25 0 001.814-9.421V3.84c0-.669-.545-1.215-1.215-1.215h-.817c-.54 0-1.02.362-1.168.88l-.514 1.8A29.96 29.96 0 0117.1 15.833a6.735 6.735 0 01-5.288 2.542H7.874a1.313 1.313 0 010-2.625h3.938a4.129 4.129 0 003.239-1.558 27.35 27.35 0 004.96-9.609l.514-1.8A3.858 3.858 0 0124.218 0h.817a3.844 3.844 0 013.84 3.84v1.522c0 3.579-.675 7.077-2.002 10.396l9.874-.008A5.258 5.258 0 0142 21.003v4.441a24.15 24.15 0 01-3.178 11.965l-1.481 2.593A3.975 3.975 0 0133.898 42z"></path>
                        <circle cx="6.563" cy="35.438" r="1.313"></circle>
                      </g>
                    </svg>
                  </div>
                  <div className="yes_text">
                    <span className="input-radio-text">Yes</span>
                    <input
                      className="input-radio"
                      type="radio"
                      value="Y"
                      onClick={this.handleChange}
                      name="connect_experts"
                      id="connect_experts_y"
                      //required
                    />
                    <span className="input-radio-key">A</span>
                  </div>
                </label>
              </div>
              <div className="input_yes_no_box">
                <label
                  className={
                    "label" +
                    (this.state.connect_experts === "N" ? " selected" : "")
                  }
                  htmlFor="connect_experts_n"
                >
                  <div className="no_img">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="52"
                      height="52"
                      viewBox="0 0 42 42"
                    >
                      <g
                        fill="currentColor"
                        fillRule="evenodd"
                        transform="matrix(1 0 0 -1 0 42)"
                      >
                        <path
                          fillRule="nonzero"
                          d="M9.841 42h-6.53a3.287 3.287 0 01-3.283-3.284V19.034A3.287 3.287 0 013.31 15.75h6.531a3.289 3.289 0 013.284 3.284v19.682A3.288 3.288 0 019.841 42zm-6.53-23.625a.659.659 0 00-.658.659v19.682a.66.66 0 00.657.659h6.531a.66.66 0 00.659-.659V19.034a.66.66 0 00-.659-.659h-6.53z"
                        ></path>
                        <path d="M33.898 42H17.99c-.81 0-1.62-.192-2.345-.554l-4.42-2.21a1.313 1.313 0 011.174-2.348l4.42 2.21a2.63 2.63 0 001.171.277h15.908c.479 0 .925-.259 1.164-.676l1.482-2.593a21.526 21.526 0 002.831-10.662v-4.441a2.63 2.63 0 00-2.628-2.628h-9.879a2.618 2.618 0 01-2.432-3.592 25.25 25.25 0 001.814-9.421V3.84c0-.669-.545-1.215-1.215-1.215h-.817c-.54 0-1.02.362-1.168.88l-.514 1.8A29.96 29.96 0 0117.1 15.833a6.735 6.735 0 01-5.288 2.542H7.874a1.313 1.313 0 010-2.625h3.938a4.129 4.129 0 003.239-1.558 27.35 27.35 0 004.96-9.609l.514-1.8A3.858 3.858 0 0124.218 0h.817a3.844 3.844 0 013.84 3.84v1.522c0 3.579-.675 7.077-2.002 10.396l9.874-.008A5.258 5.258 0 0142 21.003v4.441a24.15 24.15 0 01-3.178 11.965l-1.481 2.593A3.975 3.975 0 0133.898 42z"></path>
                        <circle cx="6.563" cy="35.438" r="1.313"></circle>
                      </g>
                    </svg>
                  </div>
                  <div className="no_text">
                    <span className="input-radio-text">No</span>
                    <input
                      className="input-radio"
                      type="radio"
                      value="N"
                      onClick={this.handleChange}
                      name="connect_experts"
                      id="connect_experts_n"
                    />
                    <span className="input-radio-key">B</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div
            className={
              "form-input" +
              (this.state.current_question === 10 ? " show_div" : " hide_div")
            }
          >
            <div className="question">
              <label className="question-label" htmlFor="question">
                Question 10/11
              </label>
              <h3 className="question-text" id="question">
                Are you willing to pay for industry expert which includes (15
                min video call, weekly blog post,1000 words chat with them)?
              </h3>
            </div>

            <div className="question-2"></div>
            <div className="question-3"></div>
            <div className="answer yes_no">
              <div className="input_yes_no_box">
                <label
                  className={
                    "label" +
                    (this.state.pay_experts === "Y" ? " selected" : "")
                  }
                  htmlFor="pay_experts_y"
                >
                  <div className="yes_img">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="52"
                      height="52"
                      viewBox="0 0 42 42"
                    >
                      <g fill="currentColor">
                        <path d="M9.841 42h-6.53a3.287 3.287 0 01-3.283-3.284V19.034A3.287 3.287 0 013.31 15.75h6.531a3.289 3.289 0 013.284 3.284v19.682A3.288 3.288 0 019.841 42zm-6.53-23.625a.659.659 0 00-.658.659v19.682a.66.66 0 00.657.659h6.531a.66.66 0 00.659-.659V19.034a.66.66 0 00-.659-.659h-6.53z"></path>
                        <path d="M33.898 42H17.99c-.81 0-1.62-.192-2.345-.554l-4.42-2.21a1.313 1.313 0 011.174-2.348l4.42 2.21a2.63 2.63 0 001.171.277h15.908c.479 0 .925-.259 1.164-.676l1.482-2.593a21.526 21.526 0 002.831-10.662v-4.441a2.63 2.63 0 00-2.628-2.628h-9.879a2.618 2.618 0 01-2.432-3.592 25.25 25.25 0 001.814-9.421V3.84c0-.669-.545-1.215-1.215-1.215h-.817c-.54 0-1.02.362-1.168.88l-.514 1.8A29.96 29.96 0 0117.1 15.833a6.735 6.735 0 01-5.288 2.542H7.874a1.313 1.313 0 010-2.625h3.938a4.129 4.129 0 003.239-1.558 27.35 27.35 0 004.96-9.609l.514-1.8A3.858 3.858 0 0124.218 0h.817a3.844 3.844 0 013.84 3.84v1.522c0 3.579-.675 7.077-2.002 10.396l9.874-.008A5.258 5.258 0 0142 21.003v4.441a24.15 24.15 0 01-3.178 11.965l-1.481 2.593A3.975 3.975 0 0133.898 42z"></path>
                        <circle cx="6.563" cy="35.438" r="1.313"></circle>
                      </g>
                    </svg>
                  </div>
                  <div className="yes_text">
                    <span className="input-radio-text">Yes</span>
                    <input
                      className="input-radio"
                      type="radio"
                      value="Y"
                      onClick={this.handleChange}
                      name="pay_experts"
                      id="pay_experts_y"
                      //required
                    />
                    <span className="input-radio-key">A</span>
                  </div>
                </label>
              </div>
              <div className="input_yes_no_box">
                <label
                  className={
                    "label" +
                    (this.state.pay_experts === "N" ? " selected" : "")
                  }
                  htmlFor="pay_experts_n"
                >
                  <div className="no_img">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="52"
                      height="52"
                      viewBox="0 0 42 42"
                    >
                      <g
                        fill="currentColor"
                        fillRule="evenodd"
                        transform="matrix(1 0 0 -1 0 42)"
                      >
                        <path
                          fillRule="nonzero"
                          d="M9.841 42h-6.53a3.287 3.287 0 01-3.283-3.284V19.034A3.287 3.287 0 013.31 15.75h6.531a3.289 3.289 0 013.284 3.284v19.682A3.288 3.288 0 019.841 42zm-6.53-23.625a.659.659 0 00-.658.659v19.682a.66.66 0 00.657.659h6.531a.66.66 0 00.659-.659V19.034a.66.66 0 00-.659-.659h-6.53z"
                        ></path>
                        <path d="M33.898 42H17.99c-.81 0-1.62-.192-2.345-.554l-4.42-2.21a1.313 1.313 0 011.174-2.348l4.42 2.21a2.63 2.63 0 001.171.277h15.908c.479 0 .925-.259 1.164-.676l1.482-2.593a21.526 21.526 0 002.831-10.662v-4.441a2.63 2.63 0 00-2.628-2.628h-9.879a2.618 2.618 0 01-2.432-3.592 25.25 25.25 0 001.814-9.421V3.84c0-.669-.545-1.215-1.215-1.215h-.817c-.54 0-1.02.362-1.168.88l-.514 1.8A29.96 29.96 0 0117.1 15.833a6.735 6.735 0 01-5.288 2.542H7.874a1.313 1.313 0 010-2.625h3.938a4.129 4.129 0 003.239-1.558 27.35 27.35 0 004.96-9.609l.514-1.8A3.858 3.858 0 0124.218 0h.817a3.844 3.844 0 013.84 3.84v1.522c0 3.579-.675 7.077-2.002 10.396l9.874-.008A5.258 5.258 0 0142 21.003v4.441a24.15 24.15 0 01-3.178 11.965l-1.481 2.593A3.975 3.975 0 0133.898 42z"></path>
                        <circle cx="6.563" cy="35.438" r="1.313"></circle>
                      </g>
                    </svg>
                  </div>
                  <div className="no_text">
                    <span className="input-radio-text">No</span>
                    <input
                      className="input-radio"
                      type="radio"
                      value="N"
                      onClick={this.handleChange}
                      id="pay_experts_n"
                      name="pay_experts"
                    />
                    <span className="input-radio-key">B</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div
            className={
              "form-input" +
              (this.state.current_question === 11 ? " show_div" : " hide_div")
            }
          >
            <div className="question">
              <label className="question-label" htmlFor="question">
                Question 11/11
              </label>
              <h3 className="question-text" id="question">
                Do you want to be in a like-minded community-based learning
                Environment?
              </h3>
            </div>

            <div className="question-2"></div>
            <div className="question-3"></div>
            <div className="answer yes_no">
              <div className="input_yes_no_box">
                <label
                  className={
                    "label" + (this.state.community === "Y" ? " selected" : "")
                  }
                  htmlFor="community_y"
                >
                  <div className="yes_img">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="52"
                      height="52"
                      viewBox="0 0 42 42"
                    >
                      <g fill="currentColor">
                        <path d="M9.841 42h-6.53a3.287 3.287 0 01-3.283-3.284V19.034A3.287 3.287 0 013.31 15.75h6.531a3.289 3.289 0 013.284 3.284v19.682A3.288 3.288 0 019.841 42zm-6.53-23.625a.659.659 0 00-.658.659v19.682a.66.66 0 00.657.659h6.531a.66.66 0 00.659-.659V19.034a.66.66 0 00-.659-.659h-6.53z"></path>
                        <path d="M33.898 42H17.99c-.81 0-1.62-.192-2.345-.554l-4.42-2.21a1.313 1.313 0 011.174-2.348l4.42 2.21a2.63 2.63 0 001.171.277h15.908c.479 0 .925-.259 1.164-.676l1.482-2.593a21.526 21.526 0 002.831-10.662v-4.441a2.63 2.63 0 00-2.628-2.628h-9.879a2.618 2.618 0 01-2.432-3.592 25.25 25.25 0 001.814-9.421V3.84c0-.669-.545-1.215-1.215-1.215h-.817c-.54 0-1.02.362-1.168.88l-.514 1.8A29.96 29.96 0 0117.1 15.833a6.735 6.735 0 01-5.288 2.542H7.874a1.313 1.313 0 010-2.625h3.938a4.129 4.129 0 003.239-1.558 27.35 27.35 0 004.96-9.609l.514-1.8A3.858 3.858 0 0124.218 0h.817a3.844 3.844 0 013.84 3.84v1.522c0 3.579-.675 7.077-2.002 10.396l9.874-.008A5.258 5.258 0 0142 21.003v4.441a24.15 24.15 0 01-3.178 11.965l-1.481 2.593A3.975 3.975 0 0133.898 42z"></path>
                        <circle cx="6.563" cy="35.438" r="1.313"></circle>
                      </g>
                    </svg>
                  </div>
                  <div className="yes_text">
                    <span className="input-radio-text">Yes</span>
                    <input
                      className="input-radio"
                      type="radio"
                      value="Y"
                      onClick={this.handleChange}
                      name="community"
                      id="community_y"
                      //required
                    />
                    <span className="input-radio-key">A</span>
                  </div>
                </label>
              </div>
              <div className="input_yes_no_box">
                <label
                  className={
                    "label" + (this.state.community === "N" ? " selected" : "")
                  }
                  htmlFor="community_n"
                >
                  <div className="no_img">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="52"
                      height="52"
                      viewBox="0 0 42 42"
                    >
                      <g
                        fill="currentColor"
                        fillRule="evenodd"
                        transform="matrix(1 0 0 -1 0 42)"
                      >
                        <path
                          fillRule="nonzero"
                          d="M9.841 42h-6.53a3.287 3.287 0 01-3.283-3.284V19.034A3.287 3.287 0 013.31 15.75h6.531a3.289 3.289 0 013.284 3.284v19.682A3.288 3.288 0 019.841 42zm-6.53-23.625a.659.659 0 00-.658.659v19.682a.66.66 0 00.657.659h6.531a.66.66 0 00.659-.659V19.034a.66.66 0 00-.659-.659h-6.53z"
                        ></path>
                        <path d="M33.898 42H17.99c-.81 0-1.62-.192-2.345-.554l-4.42-2.21a1.313 1.313 0 011.174-2.348l4.42 2.21a2.63 2.63 0 001.171.277h15.908c.479 0 .925-.259 1.164-.676l1.482-2.593a21.526 21.526 0 002.831-10.662v-4.441a2.63 2.63 0 00-2.628-2.628h-9.879a2.618 2.618 0 01-2.432-3.592 25.25 25.25 0 001.814-9.421V3.84c0-.669-.545-1.215-1.215-1.215h-.817c-.54 0-1.02.362-1.168.88l-.514 1.8A29.96 29.96 0 0117.1 15.833a6.735 6.735 0 01-5.288 2.542H7.874a1.313 1.313 0 010-2.625h3.938a4.129 4.129 0 003.239-1.558 27.35 27.35 0 004.96-9.609l.514-1.8A3.858 3.858 0 0124.218 0h.817a3.844 3.844 0 013.84 3.84v1.522c0 3.579-.675 7.077-2.002 10.396l9.874-.008A5.258 5.258 0 0142 21.003v4.441a24.15 24.15 0 01-3.178 11.965l-1.481 2.593A3.975 3.975 0 0133.898 42z"></path>
                        <circle cx="6.563" cy="35.438" r="1.313"></circle>
                      </g>
                    </svg>
                  </div>
                  <div className="no_text">
                    <span className="input-radio-text">No</span>
                    <input
                      className="input-radio"
                      type="radio"
                      value="N"
                      onClick={this.handleChange}
                      name="community"
                      id="community_n"
                    />
                    <span className="input-radio-key">B</span>
                  </div>
                </label>
              </div>
            </div>
            <div
              className={
                this.state.show_submit === true ? " show_div" : " hide_div"
              }
            >
              <button type="submit" className="submit">
                {this.state.submit_status}
              </button>
            </div>
          </div>
        </form>
        <div
          className={
            "footer" +
            (this.state.submitted === false ? " show_div" : " hide_div")
          }
        >
          <div className="footer-left">
            <div className="percentage">
              <CircularProgressBar
                strokeWidth="4"
                sqSize="50"
                percentage={this.state.percentage}
              ></CircularProgressBar>
            </div>
          </div>
          <div className="footer-right">
            <div className="previous" onClick={this.prevQuestion}>
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
                  stroke="#ffffff80"
                  strokeWidth="1"
                ></path>
              </svg>
            </div>
            <div className="next" onClick={this.validate}>
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
                  stroke="#ffffff80"
                  strokeWidth="1"
                ></path>
              </svg>
            </div>
          </div>
        </div>
        <div
          className={
            "joinCommunitydiv" +
            (this.state.submitted === true ? " show_div" : " hide_div")
          }
        >
          <JoinCommunity></JoinCommunity>
        </div>
      </div>
    );
  };
}

export default Form;
