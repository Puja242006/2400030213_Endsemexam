import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Select,
  MenuItem,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Alert,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const COLORS = ["#4caf50", "#f44336", "#ff9800", "#2196f3"];

const Studentattendance = () => {
  const [courses, setCourses] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [student, setStudent] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const [courseRes, sessionRes, attendRes, studentRes] = await Promise.all([
          fetch("/data/courses.json"),
          fetch("/data/sessions.json"),
          fetch("/data/attendance.json"),
          fetch("/data/students.json"),
        ]);
        setCourses(await courseRes.json());
        setSessions(await sessionRes.json());
        setAttendance(await attendRes.json());
        const students = await studentRes.json();
        setStudent(students[0]); // mock logged-in student
      } catch (err) {
        console.error("Data load failed", err);
      }
    };
    loadData();
  }, []);

  const calcAttendance = (courseId) => {
    const courseSessions = sessions.filter((s) => s.courseId === courseId);
    const submitted = courseSessions.map((s) => s.id);
    const studentAttendance = attendance.filter(
      (a) => a.studentId === student?.id && submitted.includes(a.sessionId)
    );

    let P = 0,
      A = 0,
      L = 0,
      E = 0;
    studentAttendance.forEach((a) => {
      if (a.status === "Present") P++;
      else if (a.status === "Absent") A++;
      else if (a.status === "Late") L++;
      else if (a.status === "Excused") E++;
    });

    const T = courseSessions.length;
    const counted = T - E;
    const effectiveP = P + 0.5 * L;
    const percent = counted === 0 ? "NA" : ((effectiveP / counted) * 100).toFixed(2);

    return { T, P, A, L, E, counted, effectiveP, percent };
  };

  const courseStats = selectedCourse ? calcAttendance(selectedCourse) : null;

  const rows =
    selectedCourse &&
    sessions
      .filter((s) => s.courseId === selectedCourse)
      .map((s) => {
        const att = attendance.find(
          (a) => a.studentId === student?.id && a.sessionId === s.id
        );
        return {
          id: s.id,
          date: s.date,
          slot: s.slot,
          type: s.type,
          status: att ? att.status : "Not Marked",
        };
      });

  const columns = [
    { field: "date", headerName: "Date", flex: 1 },
    { field: "slot", headerName: "Slot", flex: 1 },
    { field: "type", headerName: "Type", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => {
        const colorMap = {
          Present: "success",
          Absent: "error",
          Late: "warning",
          Excused: "info",
          "Not Marked": "default",
        };
        return <Chip label={params.value} color={colorMap[params.value]} />;
      },
    },
  ];

  const data = [
    { name: "Present", value: courseStats?.P || 0 },
    { name: "Absent", value: courseStats?.A || 0 },
    { name: "Late", value: courseStats?.L || 0 },
    { name: "Excused", value: courseStats?.E || 0 },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        My Attendance
      </Typography>

      {!student ? (
        <Typography>Loading student data...</Typography>
      ) : (
        <>
          <Typography variant="subtitle1" sx={{ mb: 2 }}>
            Welcome, {student.name} ({student.roll})
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
              <Card sx={{ mb: 3, p: 2 }}>
                <CardContent>
                  <Typography variant="h6">
                    {courses.find((c) => c.id === selectedCourse)?.title}
                  </Typography>
                  {courseStats.percent === "NA" ? (
                    <Typography>No valid sessions yet.</Typography>
                  ) : (
                    <>
                      <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                        <Box sx={{ width: "40%", height: 200 }}>
                          <ResponsiveContainer>
                            <PieChart>
                              <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                outerRadius={70}
                                dataKey="value"
                                label
                              >
                                {data.map((entry, index) => (
                                  <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                  />
                                ))}
                              </Pie>
                            </PieChart>
                          </ResponsiveContainer>
                        </Box>
                        <Box sx={{ ml: 3 }}>
                          <Typography>Total Sessions: {courseStats.T}</Typography>
                          <Typography>Counted: {courseStats.counted}</Typography>
                          <Typography>P: {courseStats.P}</Typography>
                          <Typography>A: {courseStats.A}</Typography>
                          <Typography>L: {courseStats.L}</Typography>
                          <Typography>E: {courseStats.E}</Typography>
                          <Typography variant="h6" sx={{ mt: 1 }}>
                            Attendance: {courseStats.percent}%
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={parseFloat(courseStats.percent)}
                            sx={{ height: 10, borderRadius: 2, mt: 1 }}
                          />
                        </Box>
                      </Box>
                      {parseFloat(courseStats.percent) < 75 && (
                        <Alert severity="warning" sx={{ mt: 2 }}>
                          ⚠️ Attendance below 75% — risk of shortage!
                        </Alert>
                      )}
                    </>
                  )}
                </CardContent>
              </Card>

              <Box sx={{ height: 400, width: "100%" }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  disableRowSelectionOnClick
                />
              </Box>

              {/* Worked Example */}
              <Card sx={{ mt: 3, p: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Worked Example (Demo)
                </Typography>
                <Typography>
                  T = 12; P = 8; A = 2; L = 2; E = 1 → Counted = 11 → Effective = 9
                </Typography>
                <Typography>
                  Attendance = 9 / 11 × 100 = 81.82% ✅ Meets 75% threshold
                </Typography>
              </Card>
            </>
          )}
        </>
      )}
    </Box>
  );
};

export default Studentattendance;
