// src/components/EditCategoryMembersDialog.jsx
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleWidgetInCategory } from "../store/dashboardSlice";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

export default function EditCategoryMembersDialog({ open, onClose, categoryId }) {
  const dispatch = useDispatch();
  const category = useSelector(s => s.dashboard.categories.find(c => c.id === categoryId));
  const widgets = useSelector(s => s.dashboard.widgets);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    if (category) {
      const initial = {};
      widgets.forEach(w => { initial[w.id] = category.widgetIds.includes(w.id); });
      setSelected(initial);
    }
  }, [category, widgets]);

  const toggle = (id) => setSelected(prev => ({ ...prev, [id]: !prev[id] }));

  const handleSave = () => {
    Object.entries(selected).forEach(([id, isChecked]) => {
      const inCategory = category.widgetIds.includes(id);
      if (isChecked && !inCategory) dispatch(toggleWidgetInCategory({ categoryId, widgetId: id }));
      if (!isChecked && inCategory) dispatch(toggleWidgetInCategory({ categoryId, widgetId: id }));
    });
    onClose();
  };

  if (!category) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Edit Widgets in "{category.name}"</DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" gap={1} mt={1}>
          {widgets.map(w => (
            <FormControlLabel
              key={w.id}
              control={<Checkbox checked={!!selected[w.id]} onChange={() => toggle(w.id)} />}
              label={w.name}
            />
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
