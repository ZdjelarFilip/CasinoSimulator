import { Pool } from 'pg';

// Database connection object
var dbconfig = {
	connectionString: process.env.DATABASE_URL,
	max: 20,
	connectionTimeoutMilis: 2000,
	idleTimeoutMilis: 3000
};

// Connection pool
export const DB = new Pool(dbconfig);
