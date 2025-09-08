import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CategoryPanel from "../components/CategoryPanel";
import DashboardHeader from "../components/DashboardHeader";
import AddWidgetDrawer from "../components/AddWidgetDrawer";

export default function DashboardPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const categories = [
    { id: "cspm", name: "CSPM Executive Dashboard" },
    { id: "cwpp", name: "CWPP Dashboard" },
    { id: "registry", name: "Registry Scan" },
  ];

  return (
    <Container
      maxWidth={false}
      disableGutters
      sx={{
        px: 0,
        py: 0,
        width: "100%",
        bgcolor: "#f9fafb", // light background
        minHeight: "100vh",
      }}
    >
      <DashboardHeader onAddWidget={() => setDrawerOpen(true)} />

      <Box mt={0}>
        <Grid container spacing={0}>
          {categories.map((cat) => (
            <Grid item xs={10} key={cat.id}>
              <CategoryPanel
                category={cat}
                onAddWidget={() => setDrawerOpen(true)}
              />
            </Grid>
          ))}
        </Grid>
      </Box>

      <AddWidgetDrawer
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </Container>
  );
}
