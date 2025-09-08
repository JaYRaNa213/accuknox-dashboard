import React, { useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { useSelector, useDispatch } from "react-redux";

import CategoryPanel from "../components/CategoryPanel";
import DashboardHeader from "../components/DashboardHeader";
import AddWidgetDialog from "../components/AddWidgetDialog";
import AddWidgetRightSideBar from "../components/AddWidgetRightSideBar";
import { resetDashboard } from "../store/dashboardSlice";

export default function DashboardPage() {
  const categories = useSelector((s) => s.dashboard.categories);
  const dispatch = useDispatch();

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [addDialogCategory, setAddDialogCategory] = useState(null);

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerCategoryId, setDrawerCategoryId] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenAddDialog = (categoryId) => {
    setAddDialogCategory(categoryId);
    setAddDialogOpen(true);
  };

  return (
    <Container className="app-container" maxWidth={false}>
      <DashboardHeader
        onAdd={() => {
          setDrawerCategoryId(categories[0]?.id || null);
          setDrawerOpen(true);
        }}
        onRefresh={() => dispatch(resetDashboard())}
        onSearch={(q) => setSearchQuery(q)}
      />

      <Box className="header-spacer" />

      <Grid container spacing={3}>
        {categories.map((c) => (
          <Grid item xs={12} key={c.id}>
            <CategoryPanel
              categoryId={c.id}
              onAddWidget={(categoryId) => handleOpenAddDialog(categoryId)}
              searchQuery={searchQuery}
            />
          </Grid>
        ))}
      </Grid>

      <AddWidgetDialog
        open={addDialogOpen}
        categoryId={addDialogCategory}
        onClose={() => setAddDialogOpen(false)}
      />

      <AddWidgetRightSideBar
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        defaultCategoryId={drawerCategoryId}
      />
    </Container>
  );
}
