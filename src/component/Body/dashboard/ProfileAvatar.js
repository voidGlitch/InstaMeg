import React from "react";
import { Avatar, AvatarGroup } from "rsuite";
import { NamesInitials } from "../../../misc/Helpers";

const ProfileAvatar = ({ avatar, name, ...avatarProps }) => {
  console.log(avatar);
  return <img alt={NamesInitials(name)} {...avatarProps} />;
};

export default ProfileAvatar;
