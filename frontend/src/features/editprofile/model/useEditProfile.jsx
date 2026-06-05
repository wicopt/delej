import { useState } from "react";
import { editProfile } from "../api/editProfile";
import { useEffect } from "react";
export const useEditProfile = (user) => {
const [formData, setFormData] = useState(user);

useEffect(() => {
  if (user) {
    setFormData(user);
  }
}, [user]);

  const [editing, setEditing] = useState({
    username: false,
    name: false,
    email: false,
  });

  const enableEdit = (field) => {
    setEditing((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const changeField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveProfile = async () => {
    await editProfile(formData);

    setEditing({
      username: false,
      name: false,
      email: false,
    });
  };

  return {
    formData,
    editing,

    enableEdit,
    changeField,

    saveProfile,
  };
};