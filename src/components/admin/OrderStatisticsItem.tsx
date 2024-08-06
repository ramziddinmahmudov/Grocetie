import { RevenueItemTypes } from "../../utils/user-types";
import ArrowCircleIcon from "../UI/Icons/ArrowCircleIcon";
import EqualIcon from "../UI/Icons/EqualIcon";

const OrderStatisticsItem = ({
  item,
  texts,
}: {
  item: RevenueItemTypes;
  texts: string[];
}) => {
  return (
    <div className="orders-stat__item">
      <h2>{texts[0]} Revenue</h2>
      <div className="orders-stat__img">
        <img src="/assets/icons/money-icon.svg" alt="" />
        <span>${item.new.toFixed(2)}</span>
      </div>
      <div
        className={`orders-stat__statistics${
          item.difference < 0 ? " orders-down" : ""
        }`}
      >
        {item.difference === 0 ? (
          <>
            <EqualIcon />
            <p>
              <span>sam with</span>
            </p>
          </>
        ) : (
          <>
            <ArrowCircleIcon />
            <p>
              {Math.abs(Number(item.difference.toFixed(2)))}% <span>than</span>
            </p>
          </>
        )}

        <span>
          {texts[1]} (${item.old.toFixed(2)})
        </span>
      </div>
    </div>
  );
};

export default OrderStatisticsItem;
