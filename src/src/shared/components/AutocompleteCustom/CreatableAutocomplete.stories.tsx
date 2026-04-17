import { Box } from "@mui/material";
import type { Meta, StoryObj } from "@storybook/react-vite";
import type { AutocompleteOption } from "mf-types";
import { useState } from "react";
import { AddOptionModal } from "../AddOptionModal";
import { AutocompleteCustom } from ".";

const CreatableAutocompleteTemplate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pendingValue, setPendingValue] = useState("");
  const [options, setOptions] = useState<AutocompleteOption[]>([
    { id: 1, label: "Monica Villegas" },
    { id: 2, label: "Santiago Villamizar" },
  ]);

  const handleOpenModal = (searchValue: string) => {
    setPendingValue(searchValue);
    setIsOpen(true);
  };

  const handleSave = (newName: string) => {
    const newItem = { id: Date.now(), label: newName };
    setOptions([...options, newItem]);
    setIsOpen(false);
  };

  return (
    <Box sx={{ width: 400, p: 2 }}>
      <AutocompleteCustom
        label="Select or Create User"
        options={options}
        onAddNew={handleOpenModal}
        onChange={(val) => console.log("Selected:", val)}
      />

      <AddOptionModal
        open={isOpen}
        initialValue={pendingValue}
        onClose={() => setIsOpen(false)}
        onSave={handleSave}
      />
    </Box>
  );
};

const meta: Meta = {
  title: "Components/CreatableAutocomplete",
  component: AutocompleteCustom,
  tags: ["autodocs"],
};

export default meta;

export const FullInteractionFlow: StoryObj = {
  render: () => <CreatableAutocompleteTemplate />,
};

export const BasicSearch: StoryObj = {
  args: {
    label: "Only Search",
    options: [
      { id: 1, label: "Option A" },
      { id: 2, label: "Option B" },
    ],
  },
};
