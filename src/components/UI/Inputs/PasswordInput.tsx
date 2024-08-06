import React from "react";
import useShowHidePassword from "../../../hooks/useShowHidePassword";

interface PasswordInputTypes {
  label: string;
  placeholder?: string;
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputTypes>(
  ({ label, placeholder }, ref) => {
    const { passShown, togglePassShown } = useShowHidePassword();

    return (
      <div className="input">
        <label htmlFor={label}>{label}</label>
        <input
          id={label}
          type={passShown ? "text" : "password"}
          placeholder={
            placeholder ? placeholder : label.substring(0, label.length - 1)
          }
          ref={ref}
        />
        <svg className="icon" onClick={togglePassShown}>
          <use
            href={`/assets/icons/icons.svg#icon-eye${passShown ? "-off" : ""}`}
          ></use>
        </svg>
      </div>
    );
  }
);

export default PasswordInput;
