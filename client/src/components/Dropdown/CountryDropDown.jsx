import Button from "@mui/material/Button";
import { IoMdArrowDropdown } from "react-icons/io";

const CountryDropDown = () => {
  return     <Button
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
        width : "auto",
        height : "auto"
      }}
    >
      <div>
        <p className="text-[10px] text-gray-400">Your Location</p>

        <p className="text-sm font-semibold text-blue-800">Nepal</p>
      </div>

      <IoMdArrowDropdown />
    </Button>;
};

export default CountryDropDown;
