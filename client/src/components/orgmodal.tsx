import { useState } from "react";
import { createPortal } from "react-dom";
import '../styles/modal.css';

interface Props {
  onClose: () => void;
  onCreation: (success: boolean, message: string) => void;
}

export function OrganizationCreationModal({ onClose, onCreation }: Props) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:3000/api/create-organization", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, description, category, email })
    });

    const data = await res.json();

    if (res.ok) {
      onCreation(true, data.message);
    } else {
      onCreation(false, data.message || "Failed to create organization");
    }
  };

  return createPortal(
    <>
      <div className="overlay" onClick={onClose} />
      <div className="modal-content">
        <span className="close-modal" onClick={onClose}>&times;</span>
        <h3>Create Organization</h3>

        <div className="modal-edits-row">
          <p>Name</p>
          <input
            type="text"
            placeholder="Organization name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="modal-edits-row">
          <p>Category</p>
          <input
            type="text"
            placeholder="e.g. Academic, Social, Sports"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
        <div className="modal-edits-row">
          <p>Contact Email</p>
          <input
            type="email"
            placeholder="contact@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="modal-edits-column">
          <p>Description</p>
          <textarea
            placeholder="Describe the organization..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className="modal-actions">
          <button className="modal-btn-secondary" onClick={onClose}>Cancel</button>
          <button className="modal-btn-primary" onClick={handleSubmit}>Create Organization</button>
        </div>
      </div>
    </>,
    document.body
  );
}
