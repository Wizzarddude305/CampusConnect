import { useState } from "react";

interface Props {
  onClose: () => void;
  onCreation: (success: boolean, message: string) => void;
}

export function OrganizationCreationModal({ onClose, onCreation }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:3000/api/create-organization", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        description,
        category,
        email
      })
    });

    const data = await res.json();

    if (res.ok) {
      onCreation(true, data.message);
    } else {
      onCreation(false, data.message || "Failed to create organization");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Create Organization</h3>

        <input
          placeholder="Organization Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Category (optional)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          placeholder="Contact Email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div style={{ marginTop: "10px" }}>
          <button onClick={handleSubmit}>Create</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
