import Navbar from '../components/Navbar';
import OrgHeader from '../components/OrgHeader';
import Organizations from '../components/Organizations';
import { useAuth } from '../components/AuthContext';

function OrganizationsPage() {
  const { user } = useAuth();
  const isAdmin = user?.privilege === 'admin';

  return (
    <main>
      <Navbar />
      <OrgHeader />
      <section className="placeholder-section">
        <div className="placeholder-card">
          <Organizations isAdmin={isAdmin} />
        </div>
      </section>
    </main>
  );
}

export default OrganizationsPage;
