import { useState } from "react";

function getTodayIso() {
  const now = new Date();
  const local = new Date(now.getTime() - now.getTimezoneOffset() * 60000);
  return local.toISOString().slice(0, 10);
}

function formatDate(isoDate) {
  const [year, month, day] = String(isoDate || "").split("-");
  if (!year || !month || !day) return "";
  return `${day}/${month}/${year}`;
}

function buildQuickId() {
  const random = Math.floor(Math.random() * 9000) + 1000;
  return `CERT-${Date.now().toString().slice(-6)}-${random}`;
}

function ManualStudentEntry({ onAddStudent }) {
  const [form, setForm] = useState({
    Name: "",
    PRN: "",
    Certificate_ID: "",
    Issue_Date: getTodayIso(),
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const updateField = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError("");
    setSuccess("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = form.Name.trim();
    const prn = form.PRN.trim();
    const certificateId = form.Certificate_ID.trim();
    const issueDate = formatDate(form.Issue_Date);

    const studentClass = form.Class.trim();

    if (!name || !prn || !studentClass || !certificateId || !issueDate) {
      setError("Please fill Name, PRN, Class, Certificate ID, and Issue Date.");
      return;
    }

    onAddStudent({
      Name: name,
      PRN: prn,
      Certificate_ID: certificateId,
      Issue_Date: issueDate,
      Class: studentClass,
    });

    setForm((prev) => ({
      ...prev,
      Name: "",
      PRN: "",
      Certificate_ID: "",
      Class: "",
    }));
    setSuccess("Student added. Preview updated.");
  };

  return (
    <div className="surface-card p-5">
      <div className="section-title">Quick Add Student</div>
      <p className="section-copy">
        For 1-2 students, add details directly without uploading Excel.
      </p>

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        <label className="block">
          <span className="field-label">Student Name</span>
          <input
            value={form.Name}
            onChange={(event) => updateField("Name", event.target.value)}
            placeholder="Enter full name"
            className="input-modern"
          />
        </label>

        <label className="block">
          <span className="field-label">PRN</span>
          <input
            value={form.PRN}
            onChange={(event) => updateField("PRN", event.target.value)}
            placeholder="Enter PRN"
            className="input-modern"
          />
        </label>

        <label className="block">
          <span className="field-label">Class</span>
          <input
            value={form.Class}
            onChange={(event) => updateField("Class", event.target.value)}
            placeholder="Example: TY BSc Statistics"
            className="input-modern"
          />
        </label>

        <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
          <label className="block">
            <span className="field-label">Certificate ID</span>
            <input
              value={form.Certificate_ID}
              onChange={(event) =>
                updateField("Certificate_ID", event.target.value)
              }
              placeholder="Example: CERT-001"
              className="input-modern"
            />
          </label>
          <button
            type="button"
            onClick={() => updateField("Certificate_ID", buildQuickId())}
            className="secondary-button !w-auto !px-3.5"
          >
            Generate ID
          </button>
        </div>

        <label className="block">
          <span className="field-label">Issue Date</span>
          <input
            type="date"
            value={form.Issue_Date}
            onChange={(event) => updateField("Issue_Date", event.target.value)}
            className="input-modern"
          />
        </label>

        <button type="submit" className="primary-button">
          Add Student
        </button>
      </form>

      {error ? (
        <div className="mt-3 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {success ? (
        <div className="mt-3 rounded-xl border border-[rgba(13,131,103,0.24)] bg-[rgba(13,131,103,0.08)] px-3 py-2 text-sm text-[var(--ok)]">
          {success}
        </div>
      ) : null}
    </div>
  );
}

export default ManualStudentEntry;
