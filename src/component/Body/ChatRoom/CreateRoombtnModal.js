import React, { useState, useRef } from "react";
import { useCallback } from "react";
import { Button, toaster, Form, Input, Modal, Schema, Message } from "rsuite";
import { useModalState } from "../../../misc/Custom-hooks";
import firebase from "firebase/compat/app";
import { database } from "../../../misc/firebase";
import AvatarroomUploadbtn from "./AvatarroomUploadbtn";

const INITAL_VALUE = {
  name: "",
  description: "",
};
const validate = Schema.Model({
  name: Schema.Types.StringType().isRequired("Name is required."),
  description: Schema.Types.StringType().isRequired("description is required."),
});

const CreateRoombtnModal = () => {
  const { isOpen, open, close } = useModalState();
  const FormRef = useRef();

  const [formValue, setformValue] = useState(INITAL_VALUE);
  const [loading, setloading] = useState(false);
  const onFormChange = useCallback((value) => {
    setformValue(value);
  }, []);
  const onSubmit = async () => {
    // this check method is availabel in the form will validate this data against our schema
    if (!FormRef.current.check()) {
      return;
    }
    setloading(true);
    const newRoomdata = {
      ...formValue,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    };
    try {
      await database.ref("rooms").push(newRoomdata);
      setloading(false);
      toaster.push(
        <Message showIcon type="success">
          {formValue.name} has been created
        </Message>,
        { placement: "topCenter" }
      );
      setformValue(INITAL_VALUE);
      close();
    } catch (error) {
      setloading(false);
      toaster.push(
        <Message showIcon type="error">
          {error.message}
        </Message>,
        { placement: "topCenter" }
      );
    }
  };
  return (
    <div className="mt-1 d-flex justify-content-center align-item-center">
      <Button
        appearance="primary"
        color="blue"
        onClick={open}
        style={{ width: "90%" }}
      >
        <img
          src="https://img.icons8.com/fluency/20/000000/create.png"
          alt="no"
        />
        Create Chat Room
      </Button>
      <Modal overflow open={isOpen} onClose={close}>
        <Modal.Header>
          <Modal.Title>New Chat Room</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="d-flex justify-content-center">
            <AvatarroomUploadbtn />
          </div>
          <Form
            fluid
            ref={FormRef}
            onChange={onFormChange}
            formValue={formValue}
            model={validate}
          >
            <Form.Group controlId="name-1">
              <Form.ControlLabel>Room Name</Form.ControlLabel>
              <Form.Control
                name="name"
                placeholder="Enter a Chat Room name..."
              />
              <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Description</Form.ControlLabel>
              <Form.Control
                rows={3}
                name="description"
                placeholder="Say Something..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <div className="d-flex justify-content-center">
          <Button
            block
            appearance="primary"
            color="red"
            onClick={onSubmit}
            disabled={loading}
          >
            Create New Chat Room
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CreateRoombtnModal;
