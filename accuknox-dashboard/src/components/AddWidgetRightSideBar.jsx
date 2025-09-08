import React, { useEffect, useMemo, useState } from "react";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useSelector, useDispatch } from "react-redux";
import { setWidgetsForCategory } from "../store/dashboardSlice";

export default function AddWidgetRightSideBar({ open, onClose, defaultCategoryId }) {
  const dispatch = useDispatch();
  const categories = useSelector((s) => s.dashboard.categories);
  const widgets = useSelector((s) => s.dashboard.widgets);

  // selected tab = index in categories array (default to index of defaultCategoryId)
  const defaultIndex = Math.max(
    0,
    categories.findIndex((c) => c.id === defaultCategoryId)
  );
  const [tabIndex, setTabIndex] = useState(defaultIndex >= 0 ? defaultIndex : 0);

  // local mapping: categoryId -> Set(widgetIds)
  const [localMapping, setLocalMapping] = useState({});

  const [filter, setFilter] = useState("");

  useEffect(() => {
    // when opened, initialize local mapping from store
    if (open) {
      const map = {};
      categories.forEach((c) => {
        map[c.id] = new Set(c.widgetIds || []);
      });
      setLocalMapping(map);
      // set tab to default (if any)
      const idx = Math.max(0, categories.findIndex((c) => c.id === defaultCategoryId));
      setTabIndex(idx >= 0 ? idx : 0);
    }
  }, [open, categories, defaultCategoryId]);

  const activeCategory = categories[tabIndex];

  const filteredWidgets = useMemo(() => {
    const q = filter.trim().toLowerCase();
    if (!q) return widgets;
    return widgets.filter(
      (w) =>
        w.name.toLowerCase().includes(q) || (w.text && w.text.toLowerCase().includes(q))
    );
  }, [widgets, filter]);

  const toggleWidget = (categoryId, widgetId) => {
    setLocalMapping((prev) => {
      const next = { ...prev };
      const s = new Set(next[categoryId] || []);
      if (s.has(widgetId)) s.delete(widgetId);
      else s.add(widgetId);
      next[categoryId] = s;
      return next;
    });
  };

  const handleConfirm = () => {
    // compute diffs for each category and dispatch setWidgetsForCategory
    categories.forEach((c) => {
      const desired = Array.from(localMapping[c.id] || []);
      // Only dispatch if different
      const original = c.widgetIds || [];
      const same =
        desired.length === original.length &&
        desired.every((id) => original.includes(id));
      if (!same) {
        dispatch(setWidgetsForCategory({ categoryId: c.id, widgetIds: desired }));
      }
    });
    onClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose} PaperProps={{ sx: { width: 460 } }}>
      <Box sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Typography variant="h6">Add Widget</Typography>
        </Box>

        <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
          Personalise your dashboard by adding the following widget
        </Typography>

        <Tabs
          value={tabIndex}
          onChange={(e, v) => setTabIndex(v)}
          sx={{ mt: 2 }}
          variant="scrollable"
          scrollButtons
          allowScrollButtonsMobile
        >
          {categories.map((c) => (
            <Tab key={c.id} label={c.name} />
          ))}
        </Tabs>

        <Divider sx={{ mt: 1, mb: 1 }} />

        <TextField
          size="small"
          placeholder="Search widgets..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          sx={{ mb: 1 }}
        />

        <Box sx={{ overflow: "auto", flex: 1 }}>
          <List>
            {filteredWidgets.map((w) => {
              const checked = localMapping[activeCategory?.id]?.has(w.id);
              return (
                <ListItem key={w.id} divider secondaryAction={
                  <Checkbox
                    edge="end"
                    checked={Boolean(checked)}
                    onChange={() => toggleWidget(activeCategory.id, w.id)}
                  />
                }>
                  <ListItemText
                    primary={w.name}
                    secondary={<span style={{ fontSize: 13 }}>{w.text}</span>}
                  />
                </ListItem>
              );
            })}
            {filteredWidgets.length === 0 && (
              <Box sx={{ p: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  No widgets match your search.
                </Typography>
              </Box>
            )}
          </List>
        </Box>

        <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", pt: 2 }}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleConfirm}>
            Confirm
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
