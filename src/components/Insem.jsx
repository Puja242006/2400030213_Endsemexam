import React, { useState } from "react";


const Insem = () => {
  const [students, setStudents] = useState([
    { id: 1, name: "Ravi", status: "Absent" },
    { id: 2, name: "Priya", status: "Absent" },
  ]);

  const [newName, setNewName] = useState("");

  const addStudent = () => {
    if (newName.trim() === "") return;
    const newStudent = {
      id: Date.now(),
      name: newName,
      status: "Absent",
    };
    setStudents([...students, newStudent]);
    setNewName("");
  };

  const toggleStatus = (id) => {
    setStudents(
      students.map((student) =>
        student.id === id
          ? { ...student, status: student.status === "Present" ? "Absent" : "Present" }
          : student
      )
    );
  };

  const deleteStudent = (id) => {
    setStudents(students.filter((student) => student.id !== id));
  };

  return (
    <div style={styles.container}>
      <h2>Attendance Marker</h2>

      <div style={styles.addSection}>
        <input
          type="text"
          placeholder="Enter student name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={styles.input}
        />
        <button onClick={addStudent} style={styles.addBtn}>
          Add
        </button>
      </div>

      <table style={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td
                style={{
                  color: student.status === "Present" ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {student.status}
              </td>
              <td>
                <button onClick={() => toggleStatus(student.id)} style={styles.markBtn}>
                  Mark {student.status === "Present" ? "Absent" : "Present"}
                </button>
                <button onClick={() => deleteStudent(student.id)} style={styles.deleteBtn}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const styles = {
  container: { padding: 20, fontFamily: "Arial, sans-serif", textAlign: "center" },
  addSection: { marginBottom: 20 },
  input: { padding: 8, width: 200, marginRight: 10 },
  addBtn: { padding: "8px 16px", background: "#007bff", color: "white", border: "none" },
  table: { margin: "0 auto", borderCollapse: "collapse", width: "80%" },
  markBtn: { marginRight: 10, padding: "5px 10px", background: "#28a745", color: "white" },
  deleteBtn: { padding: "5px 10px", background: "#dc3545", color: "white" },
};

export default Insem;
