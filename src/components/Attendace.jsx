import React, { useState } from "react";
import { Box, Typography, Button, TextField, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Attendace = () => {
  // Dummy data for students
  const [students, setStudents] = useState([
    { id: 1, name: "Aarav", totalClasses: 10, attended: 8 },
    { id: 2, name: "Diya", totalClasses: 10, attended: 6 },
    { id: 3, name: "Ravi", totalClasses: 10, attended: 9 },
    { id: 4, name: "Pooja", totalClasses: 10, attended: 7 },
  ]);

  const [session, setSession] = useState("");

  // Column setup for DataGrid
  const columns = [
    { field: "id", headerName: "ID", width: 80 },
    { field: "name", headerName: "Student Name", width: 180 },
    { field: "totalClasses", headerName: "Total Classes", width: 150 },
    { field: "attended", headerName: "Attended", width: 130 },
    {
      field: "percentage",
      headerName: "Attendance %",
      width: 150,
      valueGetter: (params) =>
        ((params.row.attended / params.row.totalClasses) * 100).toFixed(1),
    },
    {
      field: "status",
      headerName: "Status",
      width: 140,
      renderCell: (params) => {
        const percentage =
          (params.row.attended / params.row.totalClasses) * 100;
        return (
          <Typography color={percentage < 75 ? "error.main" : "success.main"}>
            {percentage < 75 ? "⚠️ Low" : "✅ OK"}
          </Typography>
        );
      },
    },
  ];

  // Handle adding a new session
  const handleAddSession = () => {
    if (!session.trim()) return;
    setStudents((prev) =>
      prev.map((s) => ({
        ...s,
        totalClasses: s.totalClasses + 1,
        attended: Math.random() > 0.3 ? s.attended + 1 : s.attended, // random attendance
      }))
    );
    setSession("");
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        📘 Department Attendance Portal
      </Typography>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Faculty – Submit Session Attendance
        </Typography>
        <Box display="flex" gap={2}>
          <TextField
            label="Session Name"
            variant="outlined"
            size="small"
            value={session}
            onChange={(e) => setSession(e.target.value)}
          />
          <Button variant="contained" color="primary" onClick={handleAddSession}>
            Submit Session
          </Button>
        </Box>
      </Paper>

      <Paper sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Attendance Summary
        </Typography>
        <Box sx={{ height: 400, width: "100%" }}>
          <DataGrid
            rows={students}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
          />
        </Box>
      </Paper>
    </Box>
  );
};

export default Attendace;
