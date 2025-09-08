import React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";

export default function AddWidgetCard({ onClick }) {
  return (
    <Card variant="outlined" sx={{ height: "100%" ,width: "300%" }}>
      <CardActionArea sx={{ height: "200%", width: "100%" }} onClick={onClick}>
        <CardContent>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minHeight={120}
          >
            <AddIcon fontSize="large" color="primary" />
            <Typography variant="body2" color="text.secondary">
              Add Widget
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
