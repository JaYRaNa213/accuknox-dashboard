// src/pages/DashboardPage.jsx
import React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CategoryPanel from "../components/CategoryPanel";
import DashboardHeader from "../components/DashboardHeader";

export default function DashboardPage() {
  // Hard-coded categories for now (later can be from store/JSON)
  const categories = [
    { id: "cspm", name: "CSPM Executive Dashboard" },
    { id: "cwpp", name: "CWPP Dashboard" },
    { id: "registry", name: "Registry Scan" },
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      {/* Top header */}
      <DashboardHeader />

      {/* Categories */}
      <Box mt={3}>
        <Grid container spacing={3}>
          {categories.map((cat) => (
            <Grid item xs={12} key={cat.id}>
              <CategoryPanel category={cat} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
