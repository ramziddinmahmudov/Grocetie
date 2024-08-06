import React, { ReactElement } from "react";

interface TextInputTypes {
  label?: string;
  placeholder: string;
  type?: string;
  span?: ReactElement;
  defaultValue?: string | number;
  text?: string;
}

const TextInput = React.forwardRef<HTMLInputElement, TextInputTypes>(
  ({ label, placeholder, type, span, defaultValue }, ref) => {
    return (
      <div className="input">
        <label htmlFor={placeholder}>
          {label} {span ? span : ""}
        </label>
        <input
          id={placeholder}
          type={type ? type : "text"}
          placeholder={placeholder}
          defaultValue={defaultValue ? defaultValue : ""}
          ref={ref}
        />
      </div>
    );
  }
);

export default TextInput;
