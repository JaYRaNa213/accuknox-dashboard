import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useDispatch } from "react-redux";
import { createWidget } from "../store/dashboardSlice";

export default function AddWidgetDialog({ open, categoryId, onClose }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    if (!open) {
      setName("");
      setText("");
    }
  }, [open]);

  const handleAdd = () => {
    if (!name.trim()) return;
    dispatch(createWidget({ name: name.trim(), text: text.trim(), categoryId }));
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add New Widget</DialogTitle>
      <DialogContent sx={{ minWidth: 420 }}>
        <TextField
          label="Widget Name"
          fullWidth
          margin="dense"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Widget Text (summary)"
          fullWidth
          margin="dense"
          multiline
          rows={3}
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleAdd}>
          Add Widget
        </Button>
      </DialogActions>
    </Dialog>
  );
}
