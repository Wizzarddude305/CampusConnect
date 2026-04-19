import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { OrganizationCreationModal } from "./orgmodal";

function Organizations({ isAdmin }: { isAdmin: boolean }) {
  const [orgs, setOrgs] = useState<any[]>([]);
  const [isCreatingOrg, setIsCreatingOrg] = useState(false);

  const fetchOrgs = () => {
    fetch("http://localhost:3000/api/get-organizations")
      .then(res => res.json())
      .then(setOrgs)
      .catch(err => {
        console.error(err);
        toast.error("Failed to load organizations");
      });
  };

  useEffect(() => {
    fetchOrgs();
  }, []);

  const handleOrgCreation = (success: boolean, message: string) => {
  setIsCreatingOrg(false);

  if (success) {
    toast.success(message);
    fetchOrgs(); // refresh list
  } else {
    toast.error(message);
  }
};

  const deleteOrg = async (id: number) => {
    const res = await fetch("http://localhost:3000/api/delete-organization", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });

    if (res.ok) {
      setOrgs(prev => prev.filter(o => o.id !== id));
      toast.success("Organization deleted");
    } else {
      toast.error("Delete failed");
    }
  };

  return (
    <div>
      <div className="event-header">
        <h2 className="section-label" style={{ margin: '0' }}>Organizations</h2>
        {isAdmin && (
          <button id="createOrgButton" onClick={() => setIsCreatingOrg(true)}>
            Create Organization
          </button>
        )}
      </div>
      {isCreatingOrg && (
        <OrganizationCreationModal
          onClose={() => setIsCreatingOrg(false)}
          onCreation={handleOrgCreation}
        />
      )}

      {orgs.length > 0 ? (
        <div className="event-grid">
          {orgs.map(org => (
            <div className="event-card" key={org.id}>
              <h4>{org.name}</h4>
              {org.category && <p><strong>Category:</strong> {org.category}</p>}
              {org.email && <p><strong>Contact:</strong> {org.email}</p>}
              {org.description && <p className="event-card-description">{org.description}</p>}
              {isAdmin && (
                <div className="event-card-actions">
                  <button className="event-button event-button--danger" onClick={() => deleteOrg(org.id)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <p>No organizations yet.</p>
      )}
    </div>
  );
}

export default Organizations;
