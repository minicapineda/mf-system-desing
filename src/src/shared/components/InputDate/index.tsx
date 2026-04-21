import { Box, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/es";

import type { InputDateProps, DateRange } from "mf-types";
import style from "./inputdate.module.css";

export const InputDate = (props: InputDateProps) => {
  const {
    label,
    value,
    onChange,
    required = false,
    disabled = false,
    error = false,
    helperText = "",
    fullWidth = true,
    isRange = false,
  } = props as any;

  const isDateRange = (val: any): val is DateRange => {
    return (
      val !== null &&
      typeof val === "object" &&
      ("start" in val || "end" in val)
    );
  };

  const renderPicker = (
    pickerLabel: string,
    pickerValue: any,
    type: "single" | "start" | "end",
  ) => (
    <DatePicker
      label={pickerLabel}
      value={pickerValue ? dayjs(pickerValue) : null}
      onChange={(newValue: any) => {
        const dateValue =
          newValue && dayjs(newValue).isValid() ? newValue.toDate() : null;

        if (isRange) {
          const currentRange = isDateRange(value)
            ? value
            : { start: null, end: null };
          onChange({ ...currentRange, [type]: dateValue } as DateRange);
        } else {
          onChange(dateValue);
        }
      }}
      disabled={disabled}
      slotProps={{
        textField: {
          fullWidth: fullWidth,
          required: required,
          error: error,
          helperText: helperText,
          variant: "outlined",
          className: style.datePickerInput,
        },
      }}
    />
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      {isRange ? (
        <Box className={style.rangeContainer}>
          <Box className={style.pickerWrapper}>
            {renderPicker(
              `${label} (Start)`,
              isDateRange(value) ? value.start : null,
              "start",
            )}
          </Box>
          <Typography className={style.separator}>-</Typography>
          <Box className={style.pickerWrapper}>
            {renderPicker(
              `${label} (End)`,
              isDateRange(value) ? value.end : null,
              "end",
            )}
          </Box>
        </Box>
      ) : (
        renderPicker(label, isDateRange(value) ? null : value, "single")
      )}
    </LocalizationProvider>
  );
};

export default InputDate;
