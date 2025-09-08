// src/components/SearchBar.jsx
import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import WidgetLibraryDrawer from "./WidgetLibraryDrawer";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setDrawerOpen(!!e.target.value);
  };

  return (
    <>
      <TextField
        placeholder="Search all widgets..."
        size="small"
        value={search}
        onChange={handleSearchChange}
        sx={{ minWidth: 250 }}
      />
      <WidgetLibraryDrawer open={drawerOpen} searchQuery={search} onClose={() => setDrawerOpen(false)} />
    </>
  );
}
