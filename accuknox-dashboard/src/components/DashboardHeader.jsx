// src/components/DashboardHeader.jsx
import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";

export default function DashboardHeader() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setFilter] = useState("Last 7 days");

  const handleOpen = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const handleSelect = (value) => {
    setFilter(value);
    handleClose();
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      flexWrap="wrap"
      gap={2}
    >
      {/* Title */}
      <Typography variant="h5" fontWeight="bold">
        CNAPP Dashboard
      </Typography>

      {/* Search + Controls */}
      <Box display="flex" alignItems="center" gap={2}>
        <TextField
          placeholder="Search anything..."
          size="small"
          sx={{ minWidth: 240 }}
        />
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{ whiteSpace: "nowrap" }}
        >
          Add Widget
        </Button>
        <Button variant="outlined" onClick={handleOpen}>
          {filter}
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
          <MenuItem onClick={() => handleSelect("Last 2 days")}>
            Last 2 days
          </MenuItem>
          <MenuItem onClick={() => handleSelect("Last 7 days")}>
            Last 7 days
          </MenuItem>
          <MenuItem onClick={() => handleSelect("Last 30 days")}>
            Last 30 days
          </MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}
