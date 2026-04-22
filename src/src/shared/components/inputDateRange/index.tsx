import { useState, type MouseEvent } from "react";
import { Box, Popover } from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import Calendar from "react-calendar";
import { Input } from "src/shared/components/Input";
import "react-calendar/dist/Calendar.css";
import style from "./inputdaterange.module.css";
import type { DateRange, InputDateProps } from "mf-types";

type CalendarValue = Date | [Date | null, Date | null] | null;

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
  const isDateRange = (val: any): val is DateRange => {
    return val && typeof val === "object" && "start" in val;
  };

  const handleCalendarChange = (newVal: CalendarValue) => {
    if (Array.isArray(newVal)) {
      const [start, end] = newVal;
      if (start && end) {
        onChange({ start, end } as DateRange);
        handleClose();
      }
    } else if (newVal instanceof Date) {
      onChange({ start: newVal, end: null } as DateRange);
    }
  };

  const displayValue = (): string => {
    if (isDateRange(value)) {
      if (value.start && value.end) {
        return `${value.start.toLocaleDateString()} - ${value.end.toLocaleDateString()}`;
      }
      if (value.start) return value.start.toLocaleDateString();
    }
    return "";
  };

  return (
    <Box className={style.main_container}>
      <Box onClick={handleClick} className={style.input_wrapper}>
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
        <CalendarMonthIcon className={style.calendarIcon} />
      </Box>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        slotProps={{
          paper: {
            className: style.popoverPaper,
          },
        }}
      >
        <Box className={style.calendarContainer}>
          <Calendar
            onChange={(val) => handleCalendarChange(val as CalendarValue)}
            selectRange={true}
            value={
              isDateRange(value)
                ? [value.start, value.end || value.start]
                : (value as Date) || new Date()
            }
          />
        </Box>
      </Popover>
    </Box>
  );
};

export default InputDateRange;
