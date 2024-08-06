import React from "react";

const AdditionalInfo = React.forwardRef<HTMLTextAreaElement>((_, ref) => {
  return (
    <div className="additional">
      <h2>Additional Information</h2>
      <div className="input-form additional__main">
        <div className="input">
          <label htmlFor="note">
            Order Notes <span>(Optional)</span>{" "}
          </label>
          <textarea
            name="notes"
            id="note"
            placeholder="Notes about your order, e.g. special notes for delivery"
            ref={ref}
          ></textarea>
        </div>
      </div>
    </div>
  );
});

export default AdditionalInfo;
