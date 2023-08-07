import { useState } from "react";

import "./aboutBanner.scss";
import { ReactComponent as QuestionMarkIcon } from "./question-mark.svg";

const AboutBanner: React.FC = () => {
  const [toggleClassName, setToggleClassName] = useState("hidden");

  const toggleVisibility = () => {
    if (toggleClassName === "hidden") {
      setToggleClassName("visible");
    } else {
      setToggleClassName("hidden");
    }
  };

  return (
    <div className={`AboutBanner ${toggleClassName}`}>
      <div className="AboutBanner__toggle">
        <QuestionMarkIcon className="AboutBanner__icon" />
        <input type="checkbox" onChange={toggleVisibility} />
      </div>

      <p>
        Challenge by{" "}
        <a href="https://www.frontendmentor.io?ref=challenge">
          Frontend Mentor
        </a>
      </p>
      <p>
        Coded by <b>Hubert Kowalik</b>
      </p>
    </div>
  );
};

export default AboutBanner;
