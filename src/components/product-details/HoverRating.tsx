import { useState } from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";

const labels: { [key: number]: string } = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

function getLabelText(value: number) {
  return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
}

export default function HoverRating({
  value,
  setValue,
}: {
  value: number | null;
  setValue: (arg: number | null) => void;
}) {
  const [hover, setHover] = useState(() => -1);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Rating
        name="hover-feedback"
        value={value}
        precision={0.5}
        getLabelText={getLabelText}
        className="add-review__icon"
        onChange={(_, newValue) => {
          setValue(newValue);
        }}
        onChangeActive={(_, newHover) => {
          setHover(newHover);
        }}
        emptyIcon={
          <StarIcon style={{ fill: "#999999a5" }} fontSize="inherit" />
        }
      />
      {value !== null && (
        <Box style={{ fontSize: "1.4rem" }} sx={{ ml: 2 }}>
          {labels[hover !== -1 ? hover : value]}
        </Box>
      )}
    </Box>
  );
}
