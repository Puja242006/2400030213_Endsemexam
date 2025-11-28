import React, { useEffect, useState } from "react";

import {
  Box,
  Typography,
  Select,
  MenuItem,
  Tabs,
  Tab,
  Card,
  CardContent,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

const Coordinator = () => {
  const [courses, setCourses] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [students, setStudents] = useState([]);
  const [facultyFilter, setFacultyFilter] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [snack, setSnack] = useState({ open: false, message: "", severity: "" });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [cRes, sRes, aRes, stRes] = await Promise.all([
          fetch("/data/courses.json"),
          fetch("/data/sessions.json"),
          fetch("/data/attendance.json"),
          fetch("/data/students.json"),
        ]);
        setCourses(await cRes.json());
        setSessions(await sRes.json());
        setAttendance(await aRes.json());
        setStudents(await stRes.json());
      } catch (err) {
        console.error("Error loading data", err);
        setSnack({ open: true, message: "Failed to load data", severity: "error" });
      }
    };
    fetchData();
  }, []);

  const calcCourseStats = (courseId) => {
    const courseSessions = sessions.filter((s) => s.courseId === courseId);
    const submitted = courseSessions.map((s) => s.id);
    const relevantAttendance = attendance.filter((a) => submitted.includes(a.sessionId));

    let studentStats = {};
    relevantAttendance.forEach((a) => {
      if (!studentStats[a.studentId]) {
        studentStats[a.studentId] = { P: 0, A: 0, L: 0, E: 0 };
      }
      studentStats[a.studentId][
        a.status === "Late"
          ? "L"
          : a.status === "Excused"
          ? "E"
          : a.status === "Absent"
          ? "A"
          : "P"
      ]++;
    });

    const statsArray = Object.keys(studentStats).map((sid) => {
      const s = studentStats[sid];
      const total = courseSessions.length;
      const counted = total - s.E;
      const effectiveP = s.P + 0.5 * s.L;
      const percent =
        counted === 0 ? "NA" : ((effectiveP / counted) * 100).toFixed(2);
      return { studentId: sid, attendance: percent };
    });

    const validPercentages = statsArray
      .filter((s) => s.attendance !== "NA")
      .map((s) => parseFloat(s.attendance));

    const avg =
      validPercentages.length > 0
        ? (validPercentages.reduce((a, b) => a + b, 0) / validPercentages.length).toFixed(2)
        : "NA";
    const shortage = statsArray.filter((s) => s.attendance < 75).length;

    return {
      totalSessions: courseSessions.length,
      avgAttendance: avg,
      shortageCount: shortage,
    };
  };

  const columns = [
    { field: "id", headerName: "Course ID", flex: 1 },
    { field: "title", headerName: "Title", flex: 1.2 },
    { field: "faculty", headerName: "Faculty", flex: 1 },
    { field: "credits", headerName: "Credits", flex: 0.5 },
    {
      field: "totalSessions",
      headerName: "Total Sessions",
      flex: 1,
      valueGetter: (params) => calcCourseStats(params.row.id).totalSessions,
    },
    {
      field: "avgAttendance",
      headerName: "Avg %",
      flex: 1,
      valueGetter: (params) => calcCourseStats(params.row.id).avgAttendance,
    },
    {
      field: "shortageCount",
      headerName: "<75% Count",
      flex: 1,
      valueGetter: (params) => calcCourseStats(params.row.id).shortageCount,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <Button
          variant="outlined"
          size="small"
          onClick={() => setSelectedCourse(params.row)}
        >
          View
        </Button>
      ),
    },
  ];

  const filteredCourses = facultyFilter
    ? courses.filter((c) => c.faculty === facultyFilter)
    : courses;

  const faculties = [...new Set(courses.map((c) => c.faculty))];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Coordinator — Course Attendance Overview
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Typography sx={{ mr: 2 }}>Filter by Faculty:</Typography>
        <Select
          size="small"
          value={facultyFilter}
          onChange={(e) => setFacultyFilter(e.target.value)}
          sx={{ minWidth: 200 }}
        >
          <MenuItem value="">All</MenuItem>
          {faculties.map((f) => (
            <MenuItem key={f} value={f}>
              {f}
            </MenuItem>
          ))}
        </Select>
      </Box>

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={filteredCourses}
          columns={columns}
          pageSize={5}
          disableRowSelectionOnClick
        />
      </Box>

      {selectedCourse && (
        <Box sx={{ mt: 4 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {selectedCourse.title} — {selectedCourse.id}
              </Typography>
              <Tabs
                value={tabValue}
                onChange={(e, newVal) => setTabValue(newVal)}
                sx={{ mb: 2 }}
              >
                <Tab label="Overview" />
                <Tab label="Sessions" />
                <Tab label="Students" />
              </Tabs>

              {tabValue === 0 && (
                <Box>
                  <Typography>Total Sessions: {calcCourseStats(selectedCourse.id).totalSessions}</Typography>
                  <Typography>
                    Average Attendance: {calcCourseStats(selectedCourse.id).avgAttendance}%
                  </Typography>
                  <Typography>
                    Students {"<75%"}: {calcCourseStats(selectedCourse.id).shortageCount}
                  </Typography>
                </Box>
              )}

              {tabValue === 1 && (
                <Box>
                  {sessions
                    .filter((s) => s.courseId === selectedCourse.id)
                    .map((s) => (
                      <Typography key={s.id}>
                        {s.date} — {s.slot} ({s.type})
                      </Typography>
                    ))}
                </Box>
              )}

              {tabValue === 2 && (
                <Box>
                  {students.map((st) => (
                    <Typography key={st.id}>
                      {st.name} ({st.roll})
                    </Typography>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Box>
      )}

      <Snackbar
        open={snack.open}
        autoHideDuration={3000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert severity={snack.severity}>{snack.message}</Alert>
      </Snackbar>
    </Box>
  );
};

export default Coordinator;
