import Button from "../Button";

export const CustomModal = () => {
  return (
    <div>
      <Button
        label="Open Modal"
        onClick={() => console.log("Open Modal")}
        disabled
      />
    </div>
  );
};

export default CustomModal;
