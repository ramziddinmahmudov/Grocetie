import { memo } from "react";

const TableHeader = (props: { items: string[] }) => {
  return (
    <thead>
      <tr className="table__header">
        {props.items.map((item, i) => (
          <th className="table__header--item" key={i}>
            {item}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default memo(TableHeader);
