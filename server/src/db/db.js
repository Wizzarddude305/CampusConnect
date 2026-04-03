const { Pool } = require("pg");


const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

//Test for connection to backend
pool.connect((err, client, done) => {
    if (err) {
        console.error('❌ Database connection error:', err.stack);
    } else {
        console.log('✅ Connected to Neon database successfully!');
        done(); 
    }
});

module.exports = pool;
