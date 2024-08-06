const ShippingPolicy = ({ show }: { show: boolean }) => {
  return (
    <div className="shipping" style={{ display: show ? "block" : "none" }}>
      <div className="container">
        <div className="shipping__content">
          <div className="shipping__header">
            <img src="/assets/icons/shipping.svg" alt="" />
            <h2>Shipping Policy</h2>
          </div>
          <p>
            At Groceteria, we do out best to deliver products fast and fresh
          </p>
          <p>
            Orders placed before 18:00 are shipped on the same day and later
            than 18:00 will be shipped the next day.
          </p>
          <p>
            Orders placed after 18:00 on Saturday to Sunday 16:00 will be
            shipped on Sunday.
          </p>
          <p>
            In order to deliver the meat and other cold storage requiring
            products fresh, we use styrofoam boxes and will deliver in 1
            business day. For other products that do not require cold
            temperature, we use 8mm thick paper boxes that withstand pressure
            and deliver in 1-2 business days. However, to remote islands such as
            Jeju-do it may take up to 3 days.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicy;
