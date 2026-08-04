import Button from "@mui/material/Button";
import { IoMdArrowDropdown } from "react-icons/io";

const LocationBtn = () => {
  return (
    <Button
      variant="text"
      disableElevation
      sx={{
        all: "unset",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "16px",
        border: "2px solid #d1d5db",
        borderRadius: "8px",
        padding: "8px",
        cursor: "pointer",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div>
        <p className="text-[10px] font-semibold text-gray-400">Your Location</p>

        <p className="text-sm font-semibold text-blue-800">Select a Location</p>
      </div>

      <IoMdArrowDropdown />
    </Button>
  );
};

export default LocationBtn;
