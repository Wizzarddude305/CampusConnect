import Navbar from '../components/Navbar';
import '../styles/about.css';

const team = [
  { name: 'Daniel Gleeson', role: 'Scrum Master', initials: 'DG' },
  { name: 'Frank Ascencio', role: 'Product Manager', initials: 'FA' },
  { name: 'Jaiden Twyman', role: 'Development Team', initials: 'JT' },
  { name: 'Khan Alam', role: 'Development Team', initials: 'KA' },
];

function About() {
  return (
    <main>
      <Navbar />

      <div className="about-hero">
        <h1>About CampusConnect</h1>
        <p>Built by students, for students — connecting the University of Florida community one event at a time.</p>
      </div>

      <div className="about-body">

        <div className="about-mission">
          <p className="about-section-title">Our Mission</p>
          <h2>Bringing Campus Life Together</h2>
          <p>
            CampusConnect was created to solve a simple problem: University of Florida students
            shouldn't have to dig through emails, flyers, and social media just to find out
            what's happening on campus. Our mission is to give every Gator a single, reliable
            place to discover events, connect with organizations, and stay engaged with the
            vibrant community that makes UF one of the top universities in the country.
            Whether you're looking for club meetings, networking nights, or social gatherings,
            CampusConnect puts the entire campus at your fingertips.
          </p>
        </div>

        <div className="about-team">
          <p className="about-section-title">Meet the Team</p>
          <h2>Who Built This</h2>
          <div className="team-grid">
            {team.map((member) => (
              <div className="team-card" key={member.name}>
                <div className="team-card-avatar">{member.initials}</div>
                <h3>{member.name}</h3>
                <span>{member.role}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </main>
  );
}

export default About;
