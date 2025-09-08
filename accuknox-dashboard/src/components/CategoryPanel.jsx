import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import WidgetCard from "./WidgetCard";
import AddWidgetCard from "./AddWidgetCard";

export default function CategoryPanel({ category, onAddWidget }) {
  // Dummy widgets for now
  const widgets = [
    { id: "1", name: "Cloud Accounts", type: "pie" },
    { id: "2", name: "Cloud Account Risk Assessment", type: "pie" },
  ];

  return (
    <Card
    
      variant="outlined"
      sx={{
        width: "180%",
        borderRadius: 3,
        bgcolor: "#bbd5e9ff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        minHeight: 1,
      }}
    >
      <CardHeader
  title={category.name}
  titleTypographyProps={{
    fontSize: "1rem",      // change font size
    fontWeight: "bold",      // make bold
    lineHeight: 1,         // adjust height
    fontFamily: "Poppins, sans-serif", // custom font
    color: "#6486ceff",        // custom color (optional)
  }}
  sx={{
    bgcolor: "#ffffffff",
    // borderBottom: "1px solid #e5e7eb",
    px: 3,
    py: 1,
  }}
/>

      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {widgets.map((w) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={w.id}>
              <WidgetCard widget={w} />
            </Grid>
          ))}
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <AddWidgetCard onClick={onAddWidget} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
