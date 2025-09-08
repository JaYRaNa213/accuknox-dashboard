import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { toggleWidgetInCategory } from "../store/dashboardSlice";

export default function EditCategoryMembersDialog({ open, onClose, category }) {
  const widgets = useSelector((s) => s.dashboard.widgets);
  const dispatch = useDispatch();

  const isMember = (widgetId) => category.widgetIds.includes(widgetId);

  const toggle = (widgetId) => {
    dispatch(toggleWidgetInCategory({ categoryId: category.id, widgetId }));
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>Edit widgets in "{category.name}"</DialogTitle>
      <DialogContent>
        <List>
          {widgets.map((w) => (
            <ListItem
              key={w.id}
              secondaryAction={
                <Checkbox
                  edge="end"
                  onChange={() => toggle(w.id)}
                  checked={isMember(w.id)}
                />
              }
            >
              <ListItemText primary={w.name} secondary={w.text} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Done</Button>
      </DialogActions>
    </Dialog>
  );
}
