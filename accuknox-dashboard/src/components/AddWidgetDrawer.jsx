import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";

const widgetOptions = {
  CSPM: ["Cloud Accounts", "Cloud Account Risk Assessment"],
  CWPP: ["Top 5 Namespace Specific Alerts", "Workload Alerts"],
  Image: ["Image Risk Assessment", "Image Security Issues"],
  Ticket: ["Ticket Overview"],
};

export default function AddWidgetDrawer({ open, onClose }) {
  const [tab, setTab] = useState("CSPM");
  const [selected, setSelected] = useState({});

  const toggle = (widget) => {
    setSelected((prev) => ({ ...prev, [widget]: !prev[widget] }));
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box sx={{ width: 800, p: 3 }}>
        <Typography variant="h6" gutterBottom>
          Add Widget
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Personalize your dashboard by adding the following widget
        </Typography>

        <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          variant="fullWidth"
          sx={{ mb: 2 }}
        >
          {Object.keys(widgetOptions).map((key) => (
            <Tab key={key} label={key} value={key} />
          ))}
        </Tabs>

        <Box>
          {widgetOptions[tab].map((w) => (
            <FormControlLabel
              key={w}
              control={<Checkbox checked={!!selected[w]} onChange={() => toggle(w)} />}
              label={w}
            />
          ))}
        </Box>

        <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="contained" onClick={onClose}>
            Confirm
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
}
