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
        <h2 className="section-label">Organizations</h2>
        {isAdmin && (
            <button onClick={() => setIsCreatingOrg(true)}>
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
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginTop: '20px'
        }}>
          {orgs.map(org => (
            <div key={org.id} style={{
              padding: '20px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              backgroundColor: '#f9f9f9',
              minHeight: '250px',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <h4>{org.name}</h4>
              {org.category && <p><strong>Category:</strong> {org.category}</p>}
              {org.description && <p>{org.description}</p>}

              {isAdmin && (
                <button
                  style={{ marginTop: "auto" }}
                  onClick={() => deleteOrg(org.id)}
                >
                  Delete
                </button>
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
