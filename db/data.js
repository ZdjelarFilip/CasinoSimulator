import { Pool } from 'pg';

//Database connection object
var dbconfig = {
	connectionString: process.env.DATABASE_URL,
	max: 20,
	connectionTimeoutMilis: 2000,
	idleTimeoutMilis: 3000
};

//Connection pool
var pool = new Pool(dbconfig);

export class User {
	constructor(params) => {
		this.id = params.id;
		this.name = params.name;
		this.coins = params.coins;
	}

	//Finds or creates a User based on OpenID token
	static async findById(id) {
			//Query object
		var queryFind = {
			name: 'findUser',
			text: 'SELECT name, coins FROM User WHERE id=$1',
			values: [ id ]
		};

		var client = await pool.connect();

		const res = await client.query(queryFind);

		var user = new User({
			id: id,
			name: res.rows[0].name,
			coins: res.rows[0].coins
		});

    client.release();

		return user;
	}
}
