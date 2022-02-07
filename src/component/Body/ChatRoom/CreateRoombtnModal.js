import React from "react";
import { Button, ButtonToolbar, Form, Modal } from "rsuite";
import { useModalState } from "../../../misc/Custom-hooks";

const CreateRoombtnModal = () => {
  const { isOpen, open, close } = useModalState();
  return (
    <div className="mt-1">
      <Button block appearance="primary" color="blue" onClick={open}>
        <img
          src="https://img.icons8.com/fluency/20/000000/create.png"
          alt="no"
        />
        Create Chat Room
      </Button>
      <Modal open={isOpen} onClose={close}>
        <Modal.Header>
          <Modal.Title>New Chat Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form fluid>
            <Form.Group controlId="name-1">
              <Form.ControlLabel>Room Name</Form.ControlLabel>
              <Form.Control name="name" />
              <Form.HelpText>Required</Form.HelpText>
            </Form.Group>
          </Form>
        </Modal.Body>
        <div className="d-flex justify-content-center">
          <Button block appearance="primary" color="red">
            Create New Chat Room
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CreateRoombtnModal;
