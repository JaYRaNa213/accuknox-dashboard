import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

export default function WidgetCard({ widget }) {
  const pieData = [
    { name: "Connected", value: 2, color: "#1976d2" },
    { name: "Not Connected", value: 2, color: "#e0e0e0" },
  ];

  const riskData = [
    { name: "Failed", value: 1058, color: "#d32f2f" },
    { name: "Warning", value: 58, color: "#fbc02d" },
    { name: "Not Available", value: 28, color: "#9e9e9e" },
    { name: "Passed", value: 7293, color: "#388e3c" },
  ];

  const renderLegend = (data) => (
    <Box display="flex" flexDirection="column" ml={10}>
      {data.map((entry, index) => (
        <Box key={index} display="flex" alignItems="center" mb={0.5}>
          <Box
            sx={{
              width: 12,
              height: 12,
              bgcolor: entry.color,
              borderRadius: "50%",
              mr: 1,
            }}
          />
          <Typography variant="body2" color="text.secondary">
            {entry.name}: <strong>{entry.value}</strong>
          </Typography>
        </Box>
      ))}
    </Box>
  );

  const chartData =
    widget.name === "Cloud Accounts"
      ? pieData
      : widget.name === "Cloud Account Risk Assessment"
      ? riskData
      : [];

  return (
    <Card
      variant="outlined"
      sx={{
        height: 220,
        width: 550,
      
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: 2,
        boxShadow: "0 1px 6px rgba(0,0,0,0.08)",
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Typography
          variant="subtitle1"
          gutterBottom
          sx={{ fontWeight: "bold", mb: 2 }}
        >
          {widget.name}
        </Typography>
        <Box display="flex" alignItems="center" justifyContent="center">
          <PieChart width={140} height={140}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={35}
              outerRadius={55}
              dataKey="value"
            >
              {chartData.map((entry, idx) => (
                <Cell key={`cell-${idx}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          {renderLegend(chartData)}
        </Box>
      </CardContent>
    </Card>
  );
}
