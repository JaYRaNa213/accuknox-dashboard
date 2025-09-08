import React from "react";
import { useSelector } from "react-redux";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import SearchBar from "./SearchBar";
import CategoryPanel from "./CategoryPanel";

export default function Dashboard() {
  const categories = useSelector((s) => s.dashboard.categories);

  return (
    <Box>
      <Box mb={2}>
        <SearchBar />
      </Box>

      <Grid container spacing={2}>
        {categories.map((cat) => (
          <Grid item xs={12} md={6} lg={4} key={cat.id}>
            <CategoryPanel category={cat} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
