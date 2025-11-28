import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Select,
  MenuItem,
  Button,
  Chip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Download } from "@mui/icons-material";

const Report = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [c, s, a, st] = await Promise.all([
          fetch("/data/courses.json"),
          fetch("/data/sessions.json"),
          fetch("/data/attendance.json"),
          fetch("/data/students.json"),
        ]);
        setCourses(await c.json());
        setSessions(await s.json());
        setAttendance(await a.json());
        setStudents(await st.json());
      } catch (err) {
        console.error("Error loading data", err);
      }
    };
    loadData();
  }, []);

  const calcStudentStats = (studentId, courseId) => {
    const courseSessions = sessions.filter((s) => s.courseId === courseId);
    const attended = attendance.filter(
      (a) =>
        a.studentId === studentId &&
        courseSessions.some((s) => s.id === a.sessionId)
    );

    let P = 0,
      A = 0,
      L = 0,
      E = 0;
    attended.forEach((a) => {
      if (a.status === "Present") P++;
      else if (a.status === "Absent") A++;
      else if (a.status === "Late") L++;
      else if (a.status === "Excused") E++;
    });

    const T = courseSessions.length;
    const counted = T - E;
    const effective = P + 0.5 * L;
    const percent = counted === 0 ? 0 : ((effective / counted) * 100).toFixed(2);
    return { percent, P, A, L, E, T };
  };

  const rows =
    selectedCourse &&
    students.map((stu) => {
      const stats = calcStudentStats(stu.id, selectedCourse);
      return {
        id: stu.id,
        roll: stu.roll,
        name: stu.name,
        ...stats,
      };
    });

  const columns = [
    { field: "roll", headerName: "Roll No", flex: 1 },
    { field: "name", headerName: "Student Name", flex: 1.5 },
    { field: "T", headerName: "Total Sessions", flex: 1 },
    { field: "P", headerName: "P", flex: 0.6 },
    { field: "A", headerName: "A", flex: 0.6 },
    { field: "L", headerName: "L", flex: 0.6 },
    { field: "E", headerName: "E", flex: 0.6 },
    {
      field: "percent",
      headerName: "Attendance %",
      flex: 1,
      renderCell: (params) => {
        const val = parseFloat(params.value);
        const color =
          val >= 90 ? "success" : val >= 75 ? "info" : val >= 60 ? "warning" : "error";
        return <Chip label={`${val}%`} color={color} />;
      },
    },
  ];

  const calcCourseSummary = (courseId) => {
    let shortageCount = 0;
    students.forEach((stu) => {
      const { percent } = calcStudentStats(stu.id, courseId);
      if (percent < 75) shortageCount++;
    });
    return shortageCount;
  };

  const handleExport = () => {
    const csv = [
      ["Roll No", "Name", "Total", "P", "A", "L", "E", "Attendance %"],
      ...rows.map((r) => [
        r.roll,
        r.name,
        r.T,
        r.P,
        r.A,
        r.L,
        r.E,
        r.percent,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `Attendance_Report_${selectedCourse}.csv`;
    link.click();
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Course Attendance Report
      </Typography>

      <Select
        value={selectedCourse}
        onChange={(e) => setSelectedCourse(e.target.value)}
        displayEmpty
        sx={{ mb: 3, minWidth: 250 }}
      >
        <MenuItem value="">Select Course</MenuItem>
        {courses.map((c) => (
          <MenuItem key={c.id} value={c.id}>
            {c.title} ({c.id})
          </MenuItem>
        ))}
      </Select>

      {selectedCourse && (
        <>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6">
                {courses.find((c) => c.id === selectedCourse)?.title}
              </Typography>
              <Typography>
                Students with &lt; 75% Attendance:{" "}
                <strong>{calcCourseSummary(selectedCourse)}</strong>
              </Typography>
            </CardContent>
          </Card>

          <Box sx={{ height: 450, width: "100%" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={7}
              disableRowSelectionOnClick
            />
          </Box>

          <Button
            variant="contained"
            color="primary"
            startIcon={<Download />}
            onClick={handleExport}
            sx={{ mt: 3 }}
          >
            Export CSV
          </Button>
        </>
      )}
    </Box>
  );
};

export default Report;
