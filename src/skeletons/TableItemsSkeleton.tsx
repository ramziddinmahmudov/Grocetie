import Skeleton from "@mui/material/Skeleton";

const TableItemSkeleton = ({ widths }: { widths: string[] }) => {
  return (
    <>
      {Array.from({ length: 10 }).map((_, i: number) => (
        <tr className="table__item" key={i}>
          <td>
            <Skeleton animation="wave" variant="rounded" width={widths[0]} />
          </td>
          <td>
            <Skeleton animation="wave" variant="rounded" width={widths[1]} />
          </td>
          <td>
            <Skeleton animation="wave" variant="rounded" width={widths[2]} />
          </td>
          <td>
            <Skeleton animation="wave" variant="rounded" width={widths[3]} />
          </td>
          <td>
            <Skeleton animation="wave" variant="rounded" width={widths[4]} />
          </td>
        </tr>
      ))}
    </>
  );
};

export default TableItemSkeleton;
