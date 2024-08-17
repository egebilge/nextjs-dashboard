"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { UsersListType } from "@/modules/users/types";

type AddUserModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (newUser: UsersListType) => void;
  existingUser: UsersListType | null;
};

function AddUserModal({
  isOpen,
  onClose,
  onAddUser,
  existingUser,
}: AddUserModalProps) {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (existingUser) {
      setName(existingUser.Adi || "");
      setSurname(existingUser.Soy || "");
      setDescription(existingUser.Aciklama || "");
    } else {
      setName("");
      setSurname("");
      setDescription("");
    }
  }, [existingUser]);

  const handleSaveUser = () => {
    const userToSave = {
      db_Id: 9,
      Id: existingUser ? existingUser.Id : 0,
      Adi: name,
      Soy: surname,
      Aciklama: description,
    };

    onAddUser(userToSave);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {existingUser ? "Edit User" : "Add New User"}
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
          <Input
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button onClick={handleSaveUser}>
            {existingUser ? "Save Changes" : "Add User"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export { AddUserModal };
