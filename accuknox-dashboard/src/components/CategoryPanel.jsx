// src/components/CategoryPanel.jsx
import React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import WidgetCard from "./WidgetCard";
import AddWidgetCard from "./AddWidgetCard";

export default function CategoryPanel({ category, onAddWidget }) {
  // Category-specific widgets
  const widgetsByCategory = {
    "CSPM Executive Dashboard": [
      { id: "1", name: "Cloud Accounts", type: "pie" },
      { id: "2", name: "Cloud Account Risk Assessment", type: "pie" },
    ],
    "CWPP Dashboard": [
      { id: "3", name: "Top 5 Compliance", type: "text", message: "No graph data available" },
      { id: "4", name: "Workload Alerts", type: "text", message: "No data" },
    ],
    "Registry Scan": [
      { id: "5", name: "Image Risk Assessment", type: "bar" },
      { id: "6", name: "Image Security Issues", type: "bar" },
    ],
  };

  const widgets = widgetsByCategory[category.name] || [];

  // Reusable horizontal bar
  const HorizontalRiskBar = () => (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: 12,
        borderRadius: 1,
        overflow: "hidden",
        mt: 2,
      }}
    >
      <Box sx={{ flex: 1, bgcolor: "red" }} />
      <Box sx={{ flex: 1, bgcolor: "orange" }} />
      <Box sx={{ flex: 1, bgcolor: "gold" }} />
    </Box>
  );

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
          fontSize: "1rem",
          fontWeight: "bold",
          lineHeight: 1,
          fontFamily: "Poppins, sans-serif",
          color: "#6486ceff",
        }}
        sx={{
          bgcolor: "#ffffffff",
          px: 3,
          py: 1,
        }}
      />

      <CardContent sx={{ p: 3 }}>
        <Grid container spacing={3}>
          {widgets.map((w) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={w.id}>
              {w.type === "pie" ? (
                <WidgetCard widget={w} />
              ) : w.type === "bar" ? (
                <Card
                  variant="outlined"
                  sx={{
                    height: 180,
                    width: 550,
                    borderRadius: 2,
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", textAlign: "center" }}
                  >
                    {w.name}
                  </Typography>
                  <HorizontalRiskBar />
                </Card>
              ) : (
                <Card
                  variant="outlined"
                  sx={{
                    height: 220,
                    width: 550,
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Typography variant="body2" color="text.secondary">
                    {w.name}: <strong>{w.message}</strong>
                  </Typography>
                </Card>
              )}
            </Grid>
          ))}

          {/* Add Widget card always last */}
          <Grid item xs={20} sm={6} md={4} lg={3}>
            <AddWidgetCard onClick={onAddWidget} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
