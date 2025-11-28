import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Facultyattendance = () => {
  const [sessions, setSessions] = useState([]);
  const [students, setStudents] = useState([]);
  const [selectedSession, setSelectedSession] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [attendance, setAttendance] = useState({});
  const [loading, setLoading] = useState(true);
  const [snack, setSnack] = useState({ open: false, message: "", severity: "" });

  // Load data from public/data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [sessionRes, studentRes] = await Promise.all([
          fetch("/data/sessions.json"),
          fetch("/data/students.json"),
        ]);
        setSessions(await sessionRes.json());
        setStudents(await studentRes.json());
        setLoading(false);
      } catch (error) {
        console.error("Error loading data", error);
        setSnack({ open: true, message: "Failed to load data", severity: "error" });
      }
    };
    fetchData();
  }, []);

  const handleTakeAttendance = (session) => {
    setSelectedSession(session);
    setAttendance({});
    setOpenDialog(true);
  };

  const handleToggle = (studentId) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: prev[studentId] === "Present" ? "Absent" : "Present",
    }));
  };

  const handleMarkAll = (status) => {
    const allMarked = {};
    students.forEach((s) => {
      allMarked[s.id] = status;
    });
    setAttendance(allMarked);
  };

  const handleSubmit = () => {
    setOpenDialog(false);
    setSnack({ open: true, message: "Attendance Submitted!", severity: "success" });
  };

  const columns = [
    { field: "id", headerName: "Session ID", flex: 1 },
    { field: "courseId", headerName: "Course", flex: 1 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "slot", headerName: "Slot", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
    {
      field: "actions",
      headerName: "Actions",
      renderCell: (params) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => handleTakeAttendance(params.row)}
        >
          Take Attendance
        </Button>
      ),
      flex: 1,
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Faculty Attendance Submission
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ height: 400, width: "100%", mt: 2 }}>
          <DataGrid
            rows={sessions}
            columns={columns}
            pageSize={5}
            disableRowSelectionOnClick
          />
        </Box>
      )}

      {/* Attendance Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        aria-labelledby="attendance-dialog-title"
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle id="attendance-dialog-title">
          Mark Attendance - {selectedSession?.courseId}
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ mb: 2 }}>
            <Button onClick={() => handleMarkAll("Present")} variant="outlined" sx={{ mr: 1 }}>
              Mark All Present
            </Button>
            <Button onClick={() => handleMarkAll("Absent")} variant="outlined" color="error">
              Mark All Absent
            </Button>
          </Box>
          {students.map((student) => (
            <FormControlLabel
              key={student.id}
              control={
                <Checkbox
                  checked={attendance[student.id] === "Present"}
                  onChange={() => handleToggle(student.id)}
                />
              }
              label={`${student.name} (${student.roll})`}
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert severity={snack.severity} sx={{ width: "100%" }}>
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Facultyattendance;
