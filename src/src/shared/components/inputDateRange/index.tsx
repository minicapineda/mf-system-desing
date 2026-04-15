import { useState, type MouseEvent } from "react";
import { Box, Popover } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Calendar from "react-calendar";
import { Input } from "src/shared/components/Input";
import "react-calendar/dist/Calendar.css";
import style from "./inputdaterange.module.css";

import type {
  DateRange,
  InputDateProps,
} from "../../../../../../packages/mf-types/src/ui/inputdate/inputdate.types";

export const InputDateRange = ({
  label,
  value,
  onChange,
  required = false,
  disabled = false,
  error = false,
  helperText = "",
}: InputDateProps) => {
  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    if (!disabled) setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const handleCalendarChange = (newVal: any) => {
    if (Array.isArray(newVal) && newVal[0] && newVal[1]) {
      onChange({ start: newVal[0], end: newVal[1] } as DateRange);
      handleClose();
    } else if (newVal instanceof Date) {
      onChange({ start: newVal, end: null } as DateRange);
    }
  };

  const displayValue = () => {
    const val = value as any;
    if (val?.start && val?.end) {
      return `${val.start.toLocaleDateString()} - ${val.end.toLocaleDateString()}`;
    }
    if (val?.start) return val.start.toLocaleDateString();
    return "";
  };

  return (
    <Box sx={{ width: "100%", position: "relative" }}>
      <Box
        onClick={handleClick}
        sx={{
          cursor: "pointer",
          position: "relative",
          "& .MuiOutlinedInput-root": {
            backgroundColor: "white !important",
            paddingRight: "40px",
            "& fieldset": {
              borderColor: error ? "#f44336" : "rgba(0, 0, 0, 0.23)",
            },
          },
          "& .MuiInputBase-input": {
            color: "black !important",
            WebkitTextFillColor: "black !important",
          },
        }}
      >
        <Input
          name="range-display"
          label={label}
          value={displayValue()}
          onChange={() => {}}
          required={required}
          disabled={disabled}
          error={error}
          helperText={helperText}
          placeholder="DD/MM/YYYY"
        />

        <CalendarMonthIcon
          sx={{
            position: "absolute",
            right: "12px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "rgba(0, 0, 0, 0.54)",
            pointerEvents: "none",
          }}
        />
      </Box>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        PaperProps={{
          sx: {
            boxShadow: "0px 10px 30px rgba(0,0,0,0.15)",
            borderRadius: "12px",
            mt: 1,
            backgroundColor: "white !important", // Fuerza el fondo del popover
          },
        }}
      >
        <Box className={style.calendarContainer}>
          <Calendar
            onChange={handleCalendarChange}
            selectRange={true}
            value={
              (value as any)?.start && (value as any)?.end
                ? [(value as any).start, (value as any).end]
                : (value as any)?.start || new Date()
            }
          />
        </Box>
      </Popover>
    </Box>
  );
};
