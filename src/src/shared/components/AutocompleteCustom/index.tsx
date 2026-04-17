import {
  Autocomplete,
  TextField,
  createFilterOptions,
  Box,
  Divider,
} from "@mui/material";
import type { AutocompleteOption, AutocompleteProps } from "mf-types";
import { useState, type SyntheticEvent, type HTMLAttributes } from "react";
import { AddOptionModal } from "../AddOptionModal";

export const AutocompleteCustom = <T extends AutocompleteOption>({
  options,
  onChange,
  onAddNew,
  label,
  value,
  placeholder,
  addNewText = "+ Añadir nuevo",
  ...rest
}: AutocompleteProps<T>) => {
  const [inputValue, setInputValue] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const filter = createFilterOptions<T>();

  return (
    <>
      <Autocomplete
        {...rest}
        options={options}
        value={value || null}
        handleHomeEndKeys
        filterOptions={(options, params) => {
          const filtered = filter(options, params);
          filtered.push({
            id: "add-new-button",
            label: addNewText,
            isNew: true,
            inputValue: params.inputValue,
          } as unknown as T);

          return filtered;
        }}
        getOptionLabel={(option) => {
          if (typeof option === "string") return option;
          const opt = option as any;
          if (opt.isNew) return inputValue;
          return option.label ?? "";
        }}
        isOptionEqualToValue={(option, val) => option.id === val.id}
        onInputChange={(_: SyntheticEvent, newInput: string) =>
          setInputValue(newInput)
        }
        onChange={(_: SyntheticEvent, newValue: T | null) => {
          const val = newValue as any;
          if (val && val.isNew) {
            setOpenModal(true);
          } else {
            onChange(newValue);
          }
        }}
        renderOption={(props, option) => {
          const { key, ...optionProps } =
            props as HTMLAttributes<HTMLLIElement> & { key: string };
          const opt = option as any;

          if (opt.isNew) {
            return (
              <li
                key={key}
                {...optionProps}
                style={{ display: "block", padding: 0 }}
              >
                <Divider />
                <Box
                  sx={{
                    fontWeight: "bold",
                    color: "#1976d2",
                    px: 2,
                    py: 1,
                    "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.04)" },
                  }}
                >
                  {opt.label} {opt.inputValue ? `"${opt.inputValue}"` : ""}
                </Box>
              </li>
            );
          }

          return (
            <li key={key} {...optionProps}>
              {option.label}
            </li>
          );
        }}
        noOptionsText="Sin resultados"
        renderInput={(params) => (
          <TextField {...params} label={label} placeholder={placeholder} />
        )}
      />

      <AddOptionModal
        open={openModal}
        initialValue={inputValue}
        onClose={() => setOpenModal(false)}
        onSave={(name) => {
          onAddNew?.(name);
          const newOption = { id: name, label: name } as T;
          onChange(newOption);
          setOpenModal(false);
          setInputValue("");
        }}
      />
    </>
  );
};
export default AutocompleteCustom;
