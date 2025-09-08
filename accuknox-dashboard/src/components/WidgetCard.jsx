import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import ClearIcon from "@mui/icons-material/Clear";

export default function WidgetCard({ widget, onRemove }) {
  return (
    <Card variant="outlined">
      <CardContent sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
        <Box sx={{ flex: 1 }}>
          <Typography variant="subtitle1">{widget.name}</Typography>
          <Typography variant="body2" color="text.secondary">
            {widget.text}
          </Typography>
        </Box>
        <IconButton aria-label="remove" onClick={onRemove} size="small">
          <ClearIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}
