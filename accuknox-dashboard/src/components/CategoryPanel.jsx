import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { removeWidgetFromCategory } from "../store/dashboardSlice";
import WidgetCard from "./WidgetCard";
import AddWidgetDialog from "./AddWidgetDialog";
import EditCategoryMembersDialog from "./EditCategoryMembersDialog";

export default function CategoryPanel({ category }) {
  const widgets = useSelector((s) => s.dashboard.widgets);
  const dispatch = useDispatch();
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const widgetObjects = category.widgetIds
    .map((id) => widgets.find((w) => w.id === id))
    .filter(Boolean);

  return (
    <>
      <Card variant="outlined">
        <CardHeader
          title={category.name}
          action={
            <Box display="flex" alignItems="center">
              <IconButton aria-label="edit" onClick={() => setEditOpen(true)}>
                <EditIcon />
              </IconButton>
              <Button
                startIcon={<AddIcon />}
                size="small"
                onClick={() => setAddOpen(true)}
              >
                Add Widget
              </Button>
            </Box>
          }
        />
        <CardContent>
          <Grid container spacing={2}>
            {widgetObjects.length === 0 && (
              <Grid item xs={12}>
                <Box color="text.secondary">No widgets in this category.</Box>
              </Grid>
            )}

            {widgetObjects.map((w) => (
              <Grid item xs={12} key={w.id}>
                <WidgetCard
                  widget={w}
                  onRemove={() =>
                    dispatch(removeWidgetFromCategory({ categoryId: category.id, widgetId: w.id }))
                  }
                />
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>

      <AddWidgetDialog
        open={addOpen}
        onClose={() => setAddOpen(false)}
        categoryId={category.id}
      />

      <EditCategoryMembersDialog
        open={editOpen}
        onClose={() => setEditOpen(false)}
        category={category}
      />
    </>
  );
}
