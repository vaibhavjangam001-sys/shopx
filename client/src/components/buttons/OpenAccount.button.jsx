import Button from "@mui/material/Button";
import { MdAccountCircle } from "react-icons/md";

// flex items-center justify-between gap-4 cursor-pointer

const OpenAccountBtn = () => {
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
      <div className="flex items-center justify-center rounded-lg  gap-2 border-gray-200">
        <MdAccountCircle className="text-4xl" />
        <p className="text-sm font-bold">Profile</p>
      </div>
    </Button>
  );
};

export default OpenAccountBtn;
