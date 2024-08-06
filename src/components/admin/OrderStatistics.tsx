import { RevenueDataTypes } from "../../utils/user-types";
import OrderStatisticsItem from "./OrderStatisticsItem";

const ordersStatsTexts = [
  [`Today's`, "yesterday"],
  [`This Week's`, "last week"],
  [`This Month's`, "last month"],
  [`This Year's`, "last year"],
];

const OrderStatistics = ({ stats }: { stats: RevenueDataTypes }) => {
  return (
    <div className="orders-stat">
      {Object.entries(stats)
        .slice(0, -3)
        .map((obj, i) => (
          <OrderStatisticsItem
            item={obj[1]}
            key={obj[0]}
            texts={ordersStatsTexts[i]}
          />
        ))}
    </div>
  );
};

export default OrderStatistics;
