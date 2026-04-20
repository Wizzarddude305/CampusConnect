// Fetches and displays all organizations, handles admin delete
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { OrganizationCreationModal } from "./orgmodal";

function Organizations({ isAdmin }: { isAdmin: boolean }) {
  const [orgs, setOrgs] = useState<any[]>([]);
  const [isCreatingOrg, setIsCreatingOrg] = useState(false);
  const [joinedOrgIds, setJoinedOrgIds] = useState<number[]>([]);

  // Pull all organizations from the server
  const fetchOrgs = () => {
    fetch("http://localhost:3000/api/get-organizations")
      .then(res => res.json())
      .then(setOrgs)
      .catch(err => {
        console.error(err);
        toast.error("Failed to load organizations");
      });

  
  };

  const fetchMyOrgs = async () => {
    const res = await fetch("http://localhost:3000/api/my-orgs", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    const data = await res.json();
    setJoinedOrgIds(data);
  };

  useEffect(() => {
    fetchOrgs();
    fetchMyOrgs();
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

  // Delete an org and remove it from the list without re-fetching
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

  const joinOrg = async (id: number) => {
    try {
      const res = await fetch("http://localhost:3000/api/org-signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ organizationId: id })
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Join failed");
        return;
      }

      setJoinedOrgIds(prev => [...prev, id]);

      setOrgs(prev =>
        prev.map(o =>
          o.id === id
            ? { ...o, member_count: (o.member_count || 0) + 1 }
            : o
        )
      );

      toast.success("Joined organization");
    } catch (err) {
      console.error(err);
      toast.error("Network error");
    }
  };

  const leaveOrg = async (id: number) => {
    const res = await fetch("http://localhost:3000/api/org-signup", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ organizationId: id })
    });

    if (res.ok) {
      setJoinedOrgIds(prev => prev.filter(x => x !== id));

      setOrgs(prev =>
        prev.map(o =>
          o.id === id
            ? { ...o, member_count: Math.max((o.member_count || 1) - 1, 0) }
            : o
        )
      );

      toast.success("Left organization");
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
          {orgs.map(org => {
            const isJoined = joinedOrgIds.includes(org.id);

            return (
              <div className="event-card" key={org.id}>
                <h4>{org.name}</h4>

                {org.description && (
                  <p className="event-card-description">{org.description}</p>
                )}

                <p><strong>Members:</strong> {org.member_count || 0}</p>

                <div className="event-card-actions">

                  {isJoined ? (
                    <button className="event-button event-button--danger" onClick={() => leaveOrg(org.id)}>
                      Leave
                    </button>
                  ) : (
                    <button className="event-button" onClick={() => joinOrg(org.id)}>
                      Join
                    </button>
                  )}

                  {isAdmin && (
                    <button
                      className="event-button event-button--danger"
                      onClick={() => deleteOrg(org.id)}
                    >
                      Delete
                    </button>
                  )}

                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No organizations yet.</p>
      )}
    </div>
  );
}



export default Organizations;
