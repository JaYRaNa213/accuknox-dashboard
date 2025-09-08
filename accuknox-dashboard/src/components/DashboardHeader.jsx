import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

export default function DashboardHeader({ onAdd, onRefresh, onSearch }) {
  return (
    <AppBar position="static" color="transparent" elevation={0} sx={{ mb: 2 }}>
      <Toolbar sx={{ px: 0 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            width: "100%",
          }}
        >
          {/* Left Section - Breadcrumb */}
          <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
            Home
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: 700, color: "text.primary", ml: 1 }}
          >
            Dashboard
          </Typography>

          {/* Spacer */}
          <Box sx={{ flex: 1 }} />

          {/* Search Bar */}
          <TextField
            size="small"
            placeholder="Search anything..."
            onChange={(e) => onSearch && onSearch(e.target.value)}
            sx={{
              width: 360,
              background: "#fff",
              borderRadius: 1,
            }}
          />

          {/* Add Widget Button */}
          <Tooltip title="Add widget">
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={onAdd}
              sx={{
                ml: 2,
                bgcolor: "green",
                textTransform: "none",
                fontWeight: 600,
                borderRadius: "8px",
                px: 2,
                "&:hover": {
                  bgcolor: "darkgreen",
                },
              }}
            >
              Add Widget
            </Button>
          </Tooltip>

          {/* Refresh Button */}
          <Tooltip title="Refresh">
            <IconButton onClick={onRefresh}>
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
