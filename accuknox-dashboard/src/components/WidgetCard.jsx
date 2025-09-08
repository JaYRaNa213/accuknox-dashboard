import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#e74c3c", "#f39c12", "#f1c40f", "#2ecc71", "#3498db", "#9b59b6"];

export default function WidgetCard({ widget, onRemove }) {
  const isPieChart = widget.chartType === "pie" && widget.data;

  return (
    <Card
      variant="outlined"
      sx={{
        width: 360,
        minHeight: 220,
        position: "relative",
        borderRadius: 2,
        boxShadow: "0 6px 18px rgba(15, 23, 42, 0.05)"
      }}
    >
      <IconButton
        size="small"
        onClick={() => onRemove(widget.id)}
        sx={{ position: "absolute", top: 8, right: 8 }}
        aria-label="remove widget"
      >
        <CloseIcon fontSize="small" />
      </IconButton>

      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
          {widget.name}
        </Typography>

        {isPieChart ? (
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie
                data={widget.data}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={70}
                label
              >
                {widget.data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={30} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <Typography variant="body2" color="text.secondary">
            {widget.text}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
}
