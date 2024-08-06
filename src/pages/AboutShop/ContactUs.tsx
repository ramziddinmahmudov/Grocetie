import { useRef } from "react";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  let nameInputRef = useRef<HTMLInputElement>(null);
  let emailInputRef = useRef<HTMLInputElement>(null);
  let titleInputRef = useRef<HTMLInputElement>(null);
  let textInputRef = useRef<HTMLTextAreaElement>(null);

  const sendEmailHandler = async () => {
    const customer = nameInputRef.current?.value;
    const email = emailInputRef.current?.value;
    const title = titleInputRef.current?.value;
    const text = textInputRef.current?.value;

    await emailjs.send(
      "mukhammadalimk",
      "template_w1l1bia",
      { title, customer, email, text },
      "Jr2GZ1hRPR4oJRJBE"
    );
  };

  return (
    <div className="section-md">
      <div className="container">
        <div className="contact">
          <div className="contact__left">
            <div className="contact__left--item">
              <img src="/assets/icons/location-icon.svg" alt="" />
              <p>2715 Ash Dr. San Jose, South Dakota 83475</p>
            </div>
            <div className="contact__left--item">
              <img src="/assets/icons/email-icon.svg" alt="" />
              <p>
                Proxy@gmail.com <br /> Help.proxy@gmail.com
              </p>
            </div>
            <div className="contact__left--item">
              <img src="/assets/icons/telephone-icon.svg" alt="" />
              <p>
                (219) 555-0114 <br /> (164) 333-0487
              </p>
            </div>
          </div>
          <div className="contact__right">
            <h2>Just Say Hello !</h2>
            <p>
              Do You Fancy Saying Hi To Me Or You Want To Get Started With Your
              Project And You Need My Help? Feel Free To Contact Me.
            </p>
            <div className="contact__right--form">
              <div className="input">
                <input type="text" placeholder="Your name" ref={nameInputRef} />
              </div>
              <div className="input">
                <input
                  type="email"
                  placeholder="Your email"
                  ref={emailInputRef}
                />
              </div>
              <div className="input contact__third-input">
                <input type="text" placeholder="Title" ref={titleInputRef} />
              </div>
              <div className="input contact__last-input">
                <textarea
                  // type="text"
                  ref={textInputRef}
                  placeholder="Any requests, issues, comments or Just a few kind words..."
                />
              </div>
              <button
                className="button button-md contact__button"
                onClick={sendEmailHandler}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
