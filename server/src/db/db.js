const { Pool } = require("pg");

//This creates an appropriately sized pool to connect multiple users into the database securely 
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

//This serves as a connection test at the start of the servers bootup
pool.connect((err, client, done) => {
    if (err) {
        console.error('❌ Database connection error:', err.stack);
    } else {
        console.log('✅ Connected to Neon database successfully!');
        done(); 
    }
});

module.exports = pool;
