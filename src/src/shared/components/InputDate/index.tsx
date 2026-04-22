import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/es";
import type { InputDateProps } from "mf-types";
import styles from "./inputdate.module.css";

export const InputDate = ({
  label,
  value,
  onChange,
  required = false,
  disabled = false,
  error = false,
  helperText = "",
  fullWidth = true,
}: InputDateProps) => {
  const handleDateChange = (newValue: Dayjs | null) => {
    const dateValue = newValue && newValue.isValid() ? newValue.toDate() : null;

    onChange(dateValue as Date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <DatePicker
        label={label}
        value={value instanceof Date ? dayjs(value) : null}
        onChange={handleDateChange}
        disabled={disabled}
        slotProps={{
          textField: {
            fullWidth: fullWidth,
            required: required,
            error: error,
            helperText: helperText,
            variant: "outlined",

            className: styles.date_picker_input,
          },
        }}
      />
    </LocalizationProvider>
  );
};

export default InputDate;
