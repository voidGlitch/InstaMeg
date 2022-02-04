import React, { useState, useRef } from "react";
import { Modal, Button, toaster, Message } from "rsuite";
import { useModalState } from "../../../misc/Custom-hooks";
import AvatarEditor from "react-avatar-editor";
import { storage, database } from "../../../misc/firebase";
import { useAuth } from "../../../Context/AuthContext";

const AvatarUploadbtn = () => {
  const { authprofile } = useAuth();
  const [isLoading, setisLoading] = useState(false);
  const { isOpen, close, open } = useModalState();
  const avatarEditorRef = useRef();
  const [img, setimg] = useState(null);
  const fileInputfiles = ".png,.jpeg,.jpg";
  const acceptedfiles = ["image/jpeg", "image/png", "image/jpg"];
  const validfiles = (File) => acceptedfiles.includes(File.type);
  //the with every blog there comes a method toCanvas() which return a callback and we want to convert this callback based method to promise so that we can resolve it before jumping to next function
  const getBlob = (canvas) => {
    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(canvas);
        } else {
          reject(new Error("File Process Error"));
        }
      });
    });
  };
  const onUploadClick = async () => {
    const canvas = avatarEditorRef.current.getImageScaledToCanvas();
    setisLoading(true);
    try {
      const blob = await getBlob(canvas);
      console.log("hey");
      console.log(authprofile);

      const avatarFileRef = storage
        .ref(`/profiles/${authprofile.uid}`)
        .child("avatar");
      const uploadAvatarResult = await avatarFileRef.put(blob, {
        cacheControl: `public, max-age=${3600 * 24 * 3}`,
      });
      const downloadUrl = await uploadAvatarResult.ref.getDownloadURL();

      const userAvatarRef = database
        .ref(`/profiles/${authprofile.uid}`)
        .child("avatar");
      userAvatarRef.set(downloadUrl);
      toaster.push(
        <Message showIcon type="success">
          File has been uploaded
        </Message>,
        { placement: "topCenter" }
      );
      setisLoading(false);
    } catch (err) {
      setisLoading(false);
      toaster.push(
        <Message showIcon type="error">
          {err.message}
        </Message>,
        { placement: "topCenter" }
      );
    }
  };

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
                ref={avatarEditorRef}
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
        <div className="d-flex justify-content-center">
          <Button
            block
            appearance="primary"
            color="red"
            onClick={onUploadClick}
            disabled={isLoading}
          >
            Upload new Avatar
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AvatarUploadbtn;
