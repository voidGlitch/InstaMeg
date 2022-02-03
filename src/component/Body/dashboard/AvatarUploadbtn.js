import React, { useState } from "react";
import { Modal, Button, toaster, Message } from "rsuite";
import { useModalState } from "../../../misc/Custom-hooks";
import AvatarEditor from "react-avatar-editor";

const AvatarUploadbtn = () => {
  const { isOpen, close, open } = useModalState();
  const [img, setimg] = useState(null);
  const fileInputfiles = ".png,.jpeg,.jpg";
  const acceptedfiles = ["image/jpeg", "image/png", "image/jpg"];
  const validfiles = (File) => acceptedfiles.includes(File.type);

  const InputfileChange = (ev) => {
    const currfiles = ev.target.files;
    if (currfiles.length === 1) {
      const file = currfiles[0];
      console.log(file);
      console.log(validfiles(file));
      if (validfiles(file)) {
        setimg(file);
        open();
      } else {
        toaster.push(
          <Message showIcon type="error">
            Wrong file type {file.type}
          </Message>,
          { placement: "topCenter" }
        );
      }
    }
  };
  return (
    <div className="mt-3 text-center">
      <div>
        <label className="d-block padded cursor-pointer" htmlFor="avatar-btn">
          Select an Avatar
          <input
            id="avatar-btn"
            type="file"
            className="d-none"
            accept={fileInputfiles}
            onChange={InputfileChange}
          />
        </label>
      </div>
      <Modal open={isOpen} onClose={close}>
        <Modal.Header>
          <Modal.Title>modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex justify-content-center align-item-center h-100">
            {img && (
              <AvatarEditor
                image={img}
                width={200}
                height={200}
                border={10}
                borderRadius={100}
                rotate={0}
              />
            )}
          </div>
        </Modal.Body>
        <div className="footer">
          <Button block appearance="primary" color="red" className="w-100">
            Uplaod new Avatar
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AvatarUploadbtn;
