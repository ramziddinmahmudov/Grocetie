import React, { memo } from "react";
import { AddressItemTypes } from "../../utils/user-types";
import useCustomizeDate from "../../hooks/useCustomizeDate";

const OrderDetailsAddress = ({
  address,
  createdAt,
  deliveredAt,
}: OrderDetailsAddressProps) => {
  const { month, date, year, hour } = useCustomizeDate(createdAt);
  const {
    month: month1,
    date: date1,
    year: year1,
    hour: hour1,
  } = useCustomizeDate(deliveredAt || new Date(Date.now()));
  return (
    <div>
      <div className="order-details__address">
        <h4>Shipping Address</h4>
        <div className="order-details__address--item">
          <h5>
            <span>Receiver: </span> {address.name}
          </h5>
          <h5>
            <span>Address: </span>
            {address.address1} {address?.address2} {address.city}{" "}
            {address.postalCode}
          </h5>
          <h5>
            <span>Phone number: </span>
            {address.phoneNumber}
          </h5>
        </div>
      </div>
      <div className="order-details__date">
        <div>
          <p>Order date:</p>
          <span>
            {year}, {month} {date}, {hour}{" "}
          </span>
        </div>
        {deliveredAt && (
          <div>
            <p>Delivered date:</p>
            <span>
              {year1}, {month1} {date1}, {hour1}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

interface OrderDetailsAddressProps {
  address: AddressItemTypes;
  createdAt: Date;
  deliveredAt?: Date;
}

export default memo(OrderDetailsAddress);
