import { useEffect, useState } from "react";

const useCustomizeDate = (
  dateString: Date,
  monthType?: "2-digit" | "long" | "short" | "narrow"
) => {
  const [hour, setHour] = useState<string>();
  const [date, setDate] = useState<number>();
  const [year, setYear] = useState<number>();
  const [month, setMonth] = useState<string>();

  useEffect(() => {
    const parsedDate = new Date(dateString);
    const month = new Intl.DateTimeFormat("en-US", {
      month: monthType || "short",
    }).format(parsedDate);
    setMonth(month);
    setDate(parsedDate.getDate());
    setYear(parsedDate.getFullYear());
    setHour(
      parsedDate.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: false,
      })
    );
  }, [dateString, monthType]);

  return { hour, date, year, month };
};

export default useCustomizeDate;
