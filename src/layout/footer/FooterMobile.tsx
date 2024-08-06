const mobileApps = [
  { icon: "apple-store", text: "Apple Store" },
  { icon: "google-play", text: "Google Play" },
];

const FooterMobile = () => {
  return (
    <div className="footer__mobile">
      <ul className="footer__navigation">
        <li className="footer__navigation--title">Download Mobile App</li>
      </ul>
      <div className="footer__mobile--content">
        {mobileApps.map((app, i) => (
          <div className="footer__mobile--item" key={i}>
            <img src={`/assets/icons/${app.icon}.png`} alt={app.text} />
            <div className="footer__mobile--item-info">
              <h5>Download on the</h5>
              <h2>{app.text}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FooterMobile;
