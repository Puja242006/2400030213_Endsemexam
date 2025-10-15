import React, { useEffect, useState } from 'react'
import { TextField, Button, Card, CardContent, Typography } from "@mui/material";

const Registration = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f4f6f8",
      }}
    >
      <Card style={{ maxWidth: 400, padding: "20px" }}>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Registration
          </Typography>

          {/* Name Field */}
          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            margin="normal"
          />

          {/* Email Field */}
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
          />

          {/* Password Field */}
          <TextField
            fullWidth
            label="Password"
            type="password"
            variant="outlined"
            margin="normal"
          />

          {/* Submit Button */}
          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "20px" }}
          >
            Register
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Registration
