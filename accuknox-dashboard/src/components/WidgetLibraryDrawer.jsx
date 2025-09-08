// src/components/WidgetLibraryDrawer.jsx
import React from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { createWidget } from "../store/dashboardSlice";

export default function WidgetLibraryDrawer({ open, onClose, searchQuery }) {
  const dispatch = useDispatch();
  const widgets = useSelector(s => s.dashboard.widgets);

  const filtered = widgets.filter(w => w.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleAddToCategory = (widgetId) => {
    const categoryId = prompt("Enter category ID to add this widget:"); 
    if (!categoryId) return;
    const widget = widgets.find(w => w.id === widgetId);
    dispatch(createWidget({ name: widget.name, text: widget.text, categoryId }));
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 400, p: 2 }}>
        <Typography variant="h6" gutterBottom>Search Results</Typography>
        <List>
          {filtered.map(w => (
            <ListItem key={w.id} button onClick={() => handleAddToCategory(w.id)}>
              <ListItemText primary={w.name} secondary={w.text} />
            </ListItem>
          ))}
          {filtered.length === 0 && <Typography variant="body2">No widgets found</Typography>}
        </List>
      </Box>
    </Drawer>
  );
}
