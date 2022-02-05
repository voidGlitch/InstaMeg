import React from "react";
import { Avatar, AvatarGroup } from "rsuite";
import { NamesInitials } from "../../../misc/Helpers";

const ProfileAvatar = ({ avatar, name, ...avatarProps }) => {
  console.log(avatar);
  return (
    <div className="d-flex justify-content-center align-item-center mt-3">
      <AvatarGroup spacing={6}>
        <Avatar alt={NamesInitials(name)} {...avatarProps} />
      </AvatarGroup>
    </div>
  );
};

export default ProfileAvatar;
