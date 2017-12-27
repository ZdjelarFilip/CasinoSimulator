import { DB as db} from '../db';

//Queries
var query = [
	findById: 'SELECT id, googleToken, email, username, password, coins FROM User WHERE id=$1',
	findByEmail: 'SELECT id, googleToken, email, username, password, coins FROM User WHERE email=$1',
	findByUsername: 'SELECT id, googleToken, email, username, password, coins FROM User WHERE username=$1',
	create: 'INSERT INTO User(id, googleToken, email, username, password) VALUES($1, $2, $3, $4, $5) RETURNING *'
];

const STARTER_COINS = 50;

export default class User {
	//Constructs a User object
	constructor(profile) {
		if (profile.id) {
			this.id = profile.id;
		}

		this.googleToken = profile.googleToken;
		this.username = profile.username;
		this.password = profile.password;
		this.email = profile.email;
		this.coins = profile.coins;
	}


	// Finds a User based on their DB id
	static async findById(id) {
	 	var client = await db.connect();

		try {
			const res = await client.query(query.findById, [id]);

			if (res.rows) {
				create(res.rows[0]);
			}
			else {
				return null;
			}

		  client.release();

		 	return user;
		}
		catch (err) {
			return null;
		}

	}

	// Finds a User based on their email adddress
	static async findByEmail(email) {
	 	var client = await db.connect();

		try {
			const res = await client.query(query.findByEmail, [email]);

			if (res.rows) {
				create(res.rows[0]);
			}
			else {
				return null;
			}

		  client.release();

		 	return user;
		}
		catch (err) {
			return null;
		}

	}

	// Finds a User based on their username
	static async findByUsername(username) {
	 	var client = await db.connect();

		try {
			const res = await client.query(query.findByUsername, [username]);

			if (res.rows) {
				var user = new User({
					create(res.rows[0]);
			 	});
			}
			else {
				return null;
			}

		  client.release();

		 	return user;
		}
		catch (err) {
			return null;
		}
	}

	static async insert(profile) {
		var client = await db.connect();

		try {
			const res = await client.query(query.create, [profile.id, profile.googleToken, profile.name, profile.email, STARTER_COINS]);

			if (res.rows) {
				res.rows[0].coins = STARTER_COINS;
				create(res.rows[0]);
			}
			else {
				return null;
			}

		  client.release();

		 	return user;
		}
		catch (err) {
			return null;
		}

	}
}

function create(params) {
	var user = new User({
		id: params.id,
		googleToken: params.googleToken,
		username: params.username,
		password: params.password,
		email: params.email,
		coins: params.coins
	});
}
