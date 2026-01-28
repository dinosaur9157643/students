"use client";

import { useEffect, useState } from "react";

export default function Home() {
  // State variables
  const [students, setStudents] = useState([]);
  const [form, setForm] = useState({ name: "", age: "", course: "" });
  const [editId, setEditId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const BACKEND_URL = "http://localhost/backend"; 

  // Fetch students from PHP backend
  const fetchStudents = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/getStudents.php`);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      console.error("Fetch students error:", err);
      setError("Failed to fetch students. Check your PHP backend and CORS headers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Add or update student
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const payload = { ...form, age: Number(form.age) }; // make sure age is a number
    const url = editId
      ? `${BACKEND_URL}/updateStudent.php`
      : `${BACKEND_URL}/addStudent.php`;

    if (editId) payload.id = editId;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const result = await res.json();
      console.log("Save student response:", result);

      setForm({ name: "", age: "", course: "" });
      setEditId(null);
      fetchStudents();
    } catch (err) {
      console.error("Save student error:", err);
      setError("Failed to save student. Check your backend.");
    }
  };

  // Edit student
  const handleEdit = (student) => {
    setForm({ name: student.name, age: student.age, course: student.course });
    setEditId(student.id);
  };

  // Delete student
  const handleDelete = async (id) => {
    setError(null);
    try {
      const res = await fetch(`${BACKEND_URL}/deleteStudent.php`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      const result = await res.json();
      console.log("Delete student response:", result);

      fetchStudents();
    } catch (err) {
      console.error("Delete student error:", err);
      setError("Failed to delete student. Check your backend.");
    }
  };

  // ✅ Compute student content before rendering (no nested ternary)
  let studentsContent;
  if (loading) {
    studentsContent = <p>Loading students...</p>;
  } else if (students.length === 0) {
    studentsContent = <p>No students found.</p>;
  } else {
    studentsContent = (
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} - {student.age} - {student.course}{" "}
            <button onClick={() => handleEdit(student)}>Edit</button>
            <button onClick={() => handleDelete(student.id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Records</h1>

      {/* Display errors */}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Student form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          placeholder="Age"
          type="number"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          required
        />
        <input
          placeholder="Course"
          value={form.course}
          onChange={(e) => setForm({ ...form, course: e.target.value })}
          required
        />
        <button type="submit">{editId ? "Update" : "Add"} Student</button>
      </form>

      {/* Render students */}
      {studentsContent}
    </div>
  );
}
