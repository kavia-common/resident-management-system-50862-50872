import React, { useMemo, useState } from "react";
import "./App.css";

/**
 * Simple in-memory ID generator for UI-only list management.
 * (Backend wiring will replace this later.)
 */
function nextId() {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

// PUBLIC_INTERFACE
function App() {
  /** UI-only resident list (no API calls per instructions). */
  const [residents, setResidents] = useState(() => [
    { id: "r-1", name: "Ava Johnson", apartment: "12B" },
    { id: "r-2", name: "Noah Smith", apartment: "3A" },
    { id: "r-3", name: "Mia Chen", apartment: "7C" },
  ]);

  /** Controlled form state. */
  const [name, setName] = useState("");
  const [apartment, setApartment] = useState("");

  const canSubmit = useMemo(() => {
    return name.trim().length > 0 && apartment.trim().length > 0;
  }, [name, apartment]);

  // PUBLIC_INTERFACE
  const handleAddResident = (e) => {
    e.preventDefault();

    if (!canSubmit) return;

    const newResident = {
      id: nextId(),
      name: name.trim(),
      apartment: apartment.trim(),
    };

    setResidents((prev) => [newResident, ...prev]);
    setName("");
    setApartment("");
  };

  // PUBLIC_INTERFACE
  const handleDeleteResident = (id) => {
    setResidents((prev) => prev.filter((r) => r.id !== id));
  };

  return (
    <div className="App">
      <header className="TopBar">
        <div className="TopBar-inner">
          <div className="Brand">
            <div className="Brand-mark" aria-hidden="true" />
            <div className="Brand-text">
              <h1 className="Brand-title">Resident Directory</h1>
              <p className="Brand-subtitle">View, add, and remove residents</p>
            </div>
          </div>

          <div className="TopBar-actions">
            <span className="Pill" aria-label="Resident count">
              {residents.length} resident{residents.length === 1 ? "" : "s"}
            </span>
          </div>
        </div>
      </header>

      <main className="Page">
        <div className="Layout">
          <section className="Card" aria-labelledby="add-resident-heading">
            <div className="Card-header">
              <h2 className="Card-title" id="add-resident-heading">
                Add resident
              </h2>
              <p className="Card-subtitle">Enter name and apartment number.</p>
            </div>

            <form className="Form" onSubmit={handleAddResident}>
              <div className="Form-grid">
                <label className="Field">
                  <span className="Field-label">Name</span>
                  <input
                    className="Input"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Jordan Lee"
                    autoComplete="name"
                  />
                </label>

                <label className="Field">
                  <span className="Field-label">Apartment</span>
                  <input
                    className="Input"
                    value={apartment}
                    onChange={(e) => setApartment(e.target.value)}
                    placeholder="e.g., 5D"
                    autoComplete="off"
                  />
                </label>
              </div>

              <div className="Form-actions">
                <button className="Button Button-primary" type="submit" disabled={!canSubmit}>
                  Add resident
                </button>
                <button
                  className="Button Button-ghost"
                  type="button"
                  onClick={() => {
                    setName("");
                    setApartment("");
                  }}
                >
                  Clear
                </button>
              </div>
            </form>
          </section>

          <section className="Card" aria-labelledby="resident-list-heading">
            <div className="Card-header Card-headerRow">
              <div>
                <h2 className="Card-title" id="resident-list-heading">
                  Residents
                </h2>
                <p className="Card-subtitle">Directory list (UI-only for now).</p>
              </div>
            </div>

            {residents.length === 0 ? (
              <div className="EmptyState" role="status" aria-live="polite">
                <div className="EmptyState-title">No residents yet</div>
                <div className="EmptyState-subtitle">Add one using the form to get started.</div>
              </div>
            ) : (
              <ul className="ResidentList" aria-label="Resident list">
                {residents.map((r) => (
                  <li key={r.id} className="ResidentRow">
                    <div className="ResidentMeta">
                      <div className="Avatar" aria-hidden="true">
                        {r.name.trim().slice(0, 1).toUpperCase()}
                      </div>
                      <div className="ResidentText">
                        <div className="ResidentName">{r.name}</div>
                        <div className="ResidentApartment">Apartment {r.apartment}</div>
                      </div>
                    </div>

                    <div className="ResidentActions">
                      <button
                        type="button"
                        className="Button Button-danger"
                        onClick={() => handleDeleteResident(r.id)}
                        aria-label={`Delete ${r.name}`}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>

      <footer className="Footer">
        <div className="Footer-inner">
          <span className="Footer-muted">
            UI only — API wiring will be added in the next step.
          </span>
        </div>
      </footer>
    </div>
  );
}

export default App;
