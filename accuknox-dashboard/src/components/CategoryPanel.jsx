import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import WidgetCard from "./WidgetCard";
import { removeWidgetFromCategory } from "../store/dashboardSlice";

export default function CategoryPanel({ categoryId, onAddWidget, searchQuery }) {
  const dispatch = useDispatch();
  const category = useSelector((s) => s.dashboard.categories.find((c) => c.id === categoryId));
  const allWidgets = useSelector((s) => s.dashboard.widgets);

  if (!category) return null;

  const widgets = category.widgetIds
    .map((id) => allWidgets.find((w) => w.id === id))
    .filter(Boolean)
    .filter((w) => {
      if (!searchQuery || !searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        w.name.toLowerCase().includes(q) || (w.text && w.text.toLowerCase().includes(q))
      );
    });

  const handleRemove = (widgetId) => {
    dispatch(removeWidgetFromCategory({ widgetId, categoryId }));
  };

  return (
    <Box className="panel">
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Typography variant="h6">{category.name}</Typography>
        
      </Box>

      <Grid container spacing={2}>
        {widgets.length > 0 ? (
          widgets.map((w) => (
            <Grid item key={w.id} xs={12} md={6} lg={4}>
              <WidgetCard widget={w} onRemove={() => handleRemove(w.id)} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Box sx={{ py: 6, textAlign: "center", color: "text.secondary" }}>
              <Typography variant="body1">No widgets in this category.</Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                Click <Box component="span" sx={{ fontWeight: 700 }}>+ Add Widget</Box> to add one.
              </Typography>
            </Box>
          </Grid>
        )}

        {/* Add tile in grid as well */}
        <Grid item xs={12} md={6} lg={4}>
          <Box className="add-tile" onClick={() => onAddWidget(categoryId)}>
            <Typography sx={{ fontWeight: 700 }}>+ Add Widget</Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
