import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import { toggleWidgetInCategory } from "../store/dashboardSlice";

export default function SearchBar() {
  const widgets = useSelector((s) => s.dashboard.widgets);
  const categories = useSelector((s) => s.dashboard.categories);
  const dispatch = useDispatch();

  const [q, setQ] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedWidget, setSelectedWidget] = useState(null);

  const buttonRef = useRef(null);

  const results = q
    ? widgets.filter(
        (w) =>
          w.name.toLowerCase().includes(q.toLowerCase()) ||
          (w.text && w.text.toLowerCase().includes(q.toLowerCase()))
      )
    : [];

  const openMenu = (event, widget) => {
    setAnchorEl(event.currentTarget);
    setSelectedWidget(widget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
    setSelectedWidget(null);
  };

  const handleAddToCategory = (categoryId) => {
    if (!selectedWidget) return;
    dispatch(toggleWidgetInCategory({ categoryId, widgetId: selectedWidget.id }));
    closeMenu();
  };

  return (
    <Box>
      <TextField
        fullWidth
        placeholder="Search widgets..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
        size="small"
      />
      {q && (
        <Paper elevation={3} sx={{ mt: 1, maxHeight: 240, overflow: "auto" }}>
          {results.length === 0 ? (
            <Box p={2}>
              <Typography variant="body2" color="text.secondary">
                No widgets match "{q}".
              </Typography>
            </Box>
          ) : (
            <List dense>
              {results.map((w) => (
                <ListItem
                  key={w.id}
                  secondaryAction={
                    <IconButton edge="end" onClick={(e) => openMenu(e, w)}>
                      <AddIcon />
                    </IconButton>
                  }
                >
                  <ListItemText primary={w.name} secondary={w.text} />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
      )}

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
        {categories.map((c) => (
          <MenuItem
            key={c.id}
            onClick={() => handleAddToCategory(c.id)}
          >
            Add to "{c.name}"
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
