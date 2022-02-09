import React, { useState, useRef } from "react";
import { Modal, Button, toaster, Message } from "rsuite";
import { useModalState } from "../../../misc/Custom-hooks";
import AvatarEditor from "react-avatar-editor";
import { storage, database } from "../../../misc/firebase";

import { useAuth } from "../../../Context/AuthContext";
import ProfileAvatar from "../dashboard/ProfileAvatar";

const fileInputfiles = ".png,.jpeg,.jpg";
const acceptedfiles = ["image/png", "image/jpeg", "image/pjpeg"];
const validfiles = (File) => acceptedfiles.includes(File.type);
//the with every blog there comes a method toCanvas() which return a callback and we want to convert this callback based method to promise so that we can resolve it before jumping to next function
const getBlob = (canvas) => {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("File Process Error"));
      }
    });
  });
};

const AvatarUploadbtn = () => {
  const { authprofile } = useAuth();
  const [isLoading, setisLoading] = useState(false);
  const { isOpen, open, close } = useModalState();
  const avatarEditorRef = useRef();
  const [img, setimg] = useState(null);

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

  const onUploadClick = async () => {
    const canvas = avatarEditorRef.current.getImageScaledToCanvas();

    setisLoading(true);
    try {
      const blob = await getBlob(canvas);

      const avatarFileRef = storage
        .ref(`/profiles/${authprofile.uid}`)
        .child("avatar");

      const uploadAvatarResult = await avatarFileRef.put(blob, {
        cacheControl: `public,max-age=${3600 * 24 * 3}`,
      });

      const downloadUrl = await uploadAvatarResult.ref.getDownloadURL();

      const userAvatarRef = database
        .ref(`/profiles/${authprofile.uid}`)
        .child("avatar");
      await userAvatarRef.set(downloadUrl);
      setisLoading(false);
      close();
      toaster.push(
        <Message showIcon type="success">
          File has been uploaded
        </Message>,
        { placement: "topCenter" }
      );
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

  return (
    <div className=" text-center">
      {/* <ProfileAvatar
        style={{ height: "50px", width: "50px", borderRadius: "100px" }}
        src={authprofile.avatar}
        name={authprofile.name}
        // className="width-200 height-200 img-fullsize font-huge"
      /> */}
      <div>
        <label className="d-block padded cursor-pointer" htmlFor="avatar-btn">
          Choose an Avatar
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
          <Modal.Title>Modal</Modal.Title>
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
