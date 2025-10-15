import React, { useState } from "react";

const Hoook = () => {
  const [emp, setEmp] = useState([
    { eid: 6620, ename: "pooja", esal: 1000 },
    { eid: 6621, ename: "ravi", esal: 2000 },
    { eid: 6621, ename: "priya", esal: 5000 },
    { eid: 6621, ename: "tejasri", esal: 8000 },
    { eid: 6621, ename: "raghu", esal: 6000 },
  ]);

  // Controlled inputs for new student
  const [newStudent, setNewStudent] = useState({
    eid: "",
    ename: "",
    esal: ""
  });

  // Handle input changes
  const handleChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  // Add student to table
  const addStudent = () => {
    if (newStudent.eid && newStudent.ename && newStudent.esal) {
      setEmp([...emp, newStudent]); // append new student
      setNewStudent({ eid: "", ename: "", esal: "" }); // clear inputs
    } else {
      alert("Please fill all fields!");
    }
  };

  // Remove last student
  const removeStudent = () => {
    if (emp.length > 0) {
      setEmp(emp.slice(0, -1));
    }
  };

  return (
    <div>
      <h2>Employee Table</h2>
      <table border={1} cellPadding={10} cellSpacing={10}>
        <thead>
          <tr>
            <th>eid</th>
            <th>ename</th>
            <th>esal</th>
          </tr>
        </thead>
        <tbody>
          {emp.map((element, index) => (
            <tr key={index}>
              <td>{element.eid}</td>
              <td>{element.ename}</td>
              <td>{element.esal}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Input fields */}
      <div style={{ marginTop: "20px" }}>
        <input
          type="text"
          name="eid"
          placeholder="Enter ID"
          value={newStudent.eid}
          onChange={handleChange}
        />
        <input
          type="text"
          name="ename"
          placeholder="Enter Name"
          value={newStudent.ename}
          onChange={handleChange}
        />
        <input
          type="number"
          name="esal"
          placeholder="Enter Salary"
          value={newStudent.esal}
          onChange={handleChange}
        />
        <button onClick={addStudent}>Add student</button>
        <button onClick={removeStudent}>Remove student</button>
      </div>
    </div>
  );
};

export default Hoook;
