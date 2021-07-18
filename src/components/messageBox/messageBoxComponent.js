import $ from "jquery";
import "./messageBoxComponent.css";

const MessageBox = ({ type, title, desc }) => {
  return (
    <div className={"messageBox " + type}>
      <strong className="messageTitle">{title}! </strong>
      <div className="messageDesc">{desc}</div>
      <div
        className="close"
        onClick={() => {
          $("#alertBox").fadeOut(1000);
        }}
      >
        X
      </div>
    </div>
  );
};

export default MessageBox;
