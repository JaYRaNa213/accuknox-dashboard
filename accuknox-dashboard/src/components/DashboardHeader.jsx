import React, { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";

export default function DashboardHeader({ onAddWidget }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [filter, setFilter] = useState("Last 2 days");

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
      px={2}
      py={2}
      sx={{ backgroundColor: "background.paper", borderRadius: 2 }}
    >
      {/* Title */}
      <Typography variant="h5" fontWeight="bold">
        CNAPP Dashboard
      </Typography>

      {/* Action Buttons */}
      <Box display="flex" alignItems="center" gap={2} flexWrap="wrap">
        <TextField
          placeholder="Search anything..."
          size="small"
          sx={{ minWidth: 250 }}
        />

        <Button
          variant="contained"
          startIcon={<AddIcon />}
          size="medium"
          sx={{ textTransform: "none" }}
          onClick={onAddWidget}
        >
          Add Widget
        </Button>

        <IconButton
          color="primary"
          size="medium"
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1.5,
          }}
        >
          <RefreshIcon />
        </IconButton>

        <Button
          variant="outlined"
          size="medium"
          sx={{ minWidth: 140, textTransform: "none" }}
          onClick={handleOpen}
        >
          {filter}
        </Button>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
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
