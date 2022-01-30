import React, { useState, useCallback } from "react";
import { Input, InputGroup, toaster, Message } from "rsuite";

const Editableinput = ({
  name,
  label = null,
  initialValue,
  onSave,
  placeholder = "Write some Value",
  emptymsg = "Input is Empty",
  ...inputprops
}) => {
  const [input, setinput] = useState(initialValue);
  const [isEditable, seteditable] = useState(false);
  const onInputChange = useCallback((value) => {
    setinput(value);
  }, []);
  const onEditclick = useCallback(() => {
    seteditable((p) => !p);
    setinput(initialValue);
  }, [initialValue]);
  const onSaveClicked = async () => {
    const trimmed = input.trim();
    if (trimmed === "") {
      toaster.push(
        <Message full showIcon type="error">
          {emptymsg}
        </Message>,
        { placement: "topCenter" }
      );
    }
    if (trimmed !== initialValue) {
      await onSave(trimmed);
    }
  };
  // const
  return (
    <div className="mt-2">
      {label}
      <InputGroup>
        <Input
          {...inputprops}
          value={input}
          placeholder={placeholder}
          onChange={onInputChange}
        />
        <InputGroup.Button onClick={onEditclick}>
          {isEditable ? (
            <img
              src="https://img.icons8.com/ios-glyphs/20/000000/close-window.png"
              alt="not"
            />
          ) : (
            <img
              src="https://img.icons8.com/fluency/20/000000/cat-profile.png"
              alt="not"
            />
          )}
        </InputGroup.Button>
        {isEditable && (
          <InputGroup.Button onClick={onSaveClicked}>
            <img
              src="https://img.icons8.com/external-dreamstale-lineal-dreamstale/16/000000/external-check-security-dreamstale-lineal-dreamstale-2.png"
              alt="not"
            />
          </InputGroup.Button>
        )}
      </InputGroup>
    </div>
  );
};

export default Editableinput;
