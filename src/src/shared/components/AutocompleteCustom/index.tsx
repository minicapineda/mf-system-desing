import {
  Autocomplete,
  Box,
  Button,
  CircularProgress,
  Divider,
  Paper,
  TextField,
} from "@mui/material";
import type { AutocompleteOption, AutocompleteProps } from "mf-types";
import { useState } from "react";
import { AddOptionModal } from "../AddOptionModal";

export const AutocompleteCustom = <T extends AutocompleteOption>({
  options,
  onChange,
  onAddNew,
  label,
  value,
  placeholder,
  addNewText = "+ Añadir nuevo",
  ...props
}: AutocompleteProps<T>) => {
  const [inputValue, setInputValue] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [loading] = useState(false);

  return (
    <>
      <Autocomplete
        {...props}
        options={options}
        value={value || null}
        loading={loading}
        getOptionLabel={(option) =>
          typeof option === "string" ? option : (option?.label ?? "")
        }
        isOptionEqualToValue={(option, val) => option.id === val.id}
        onInputChange={(_, newInput) => setInputValue(newInput)}
        onChange={(_, newValue) => onChange(newValue ?? null)}
        noOptionsText="Sin resultados"
        PaperComponent={(paperProps) => (
          <Paper {...paperProps}>
            {paperProps.children}

            <Divider />

            <Box sx={{ p: 1 }}>
              <Button
                fullWidth
                color="primary"
                variant="text"
                onMouseDown={(e) => {
                  e.preventDefault();
                  setOpenModal(true);
                }}
              >
                {addNewText}
              </Button>
            </Box>
          </Paper>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            label={label}
            placeholder={placeholder}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading && <CircularProgress size={18} />}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />

      <AddOptionModal
        open={openModal}
        initialValue={inputValue}
        onClose={() => setOpenModal(false)}
        onSave={(name) => {
          const newOption = {
            id: name,
            label: name,
          } as T;

          onAddNew?.(name);
          onChange(newOption);

          setOpenModal(false);
        }}
      />
    </>
  );
};
