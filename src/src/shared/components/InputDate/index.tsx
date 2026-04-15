import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import "dayjs/locale/es";
import type { InputDateProps } from "../../../../../../packages/mf-types/dist";

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
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
      <DatePicker
        label={label}
        value={value ? dayjs(value) : null}
        onChange={(newValue: any) => {
          const dateValue =
            newValue && dayjs(newValue).isValid() ? newValue.toDate() : null;
          onChange(dateValue);
        }}
        disabled={disabled}
        slotProps={{
          textField: {
            fullWidth: fullWidth,
            required: required,
            error: error,
            helperText: helperText,
            variant: "outlined",
            sx: {
              "& .MuiOutlinedInput-root": {
                borderRadius: "8px",
                backgroundColor: "white",
              },
            },
          },
        }}
      />
    </LocalizationProvider>
  );
};
