import React, { useState } from "react";
import AddStudent from "./components/AddStudent";
import StudentList from "./components/StudentList";
import "./App.css";

function App() {
  const [tab, setTab] = useState("list");
  const [toast, setToast] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const showToast = (msg, type) => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleStudentAdded = () => {
    showToast("Student added successfully! 🎉", "success");
    setRefreshKey(k => k + 1);
    setTab("list");
  };

  return (
    <>
      {toast && (
        <div className={`toast toast-${toast.type}`}>{toast.msg}</div>
      )}
      <div className="app-bg">
        <div className="card">
          <div className="card-header">
            <h1>Student Management System</h1>
            <div className="tabs">
              <button
                className={`tab ${tab === "list" ? "tab-active" : "tab-inactive"}`}
                onClick={() => setTab("list")}
              >
                Student List
              </button>
              <button
                className={`tab ${tab === "add" ? "tab-active" : "tab-inactive"}`}
                onClick={() => setTab("add")}
              >
                Add Student
              </button>
            </div>
          </div>

          <div className="card-body">
            {tab === "list" ? (
              <StudentList
                key={refreshKey}
                onToast={showToast}
              />
            ) : (
              <AddStudent
                onStudentAdded={handleStudentAdded}
                onCancel={() => setTab("list")}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;