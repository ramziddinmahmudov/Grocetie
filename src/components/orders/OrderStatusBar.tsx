import { memo } from "react";
import CheckMarkIcon from "../UI/Icons/CheckMarkIcon";

const orderStatuses = [
  { num: 1, name: "processing" },
  { num: 2, name: "paid" },
  { num: 3, name: "on the way" },
  { num: 4, name: "delivered" },
];

const OrderStatusBar = ({ status }: { status: string }) => {
  const width =
    status === "processing"
      ? 16.6666667
      : status === "paid"
      ? 50
      : status === "on the way"
      ? 83.3333335
      : 100;

  return (
    <div className="progress-bar">
      <div className="progress-bar__border">
        <span style={{ width: `${width}%` }}></span>
      </div>

      {orderStatuses.map((item) => (
        <div
          className={`progress-bar__item ${
            orderStatuses.find((i) => i.name === status)?.num! >= item.num
              ? "active-status"
              : ""
          }`}
          key={item.num}
        >
          <div className="progress-bar__item--ball">
            <p>{item.num}</p>
            <span>
              <CheckMarkIcon />
            </span>
          </div>
          <h2>{item.name}</h2>
        </div>
      ))}
    </div>
  );
};

export default memo(OrderStatusBar);
