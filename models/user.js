import { DB as db} from '../db';

//Queries
var query = [
	findById: 'SELECT googleToken, name, coins FROM User WHERE id=$1',
	create: 'INSERT INTO User(id, googleToken, name) VALUES($1, $2, $3) RETURNING *'
];

export default class User {
	//Constructs a User object
	constructor(profile) {
		this.id = profile.id;
		this.googleToken = profile.googleToken,
		this.name = profile.name;
		this.email = profile.email;
		this.coins = profile.coins;
	}


	//Finds a User based on their OAuth token
	static async findById(id) {

	 	var client = await db.connect();

	 	const res = await client.query(query.findById, [id]);

		if (res.rows) {
			var user = new User({
				id: id,
				googleToken: res.rows[0].googleToken,
		 		name: res.rows[0].name,
				email: res.rows[0].email,
		 		coins: res.rows[0].coins
		 	});
		}
		else {
			return null;
		}

	  client.release();

	 	return user;
	}

	static async create(profile) {
		var client = await db.connect();

		const res = await client.query(query.create, [profile.id, profile.googleToken, profile.name, profile.email, STARTER_COINS]);

		if (res.rows) {
			var user = new User({
				id: id,
				googleToken: res.rows[0].googleToken,
		 		name: res.rows[0].name,
				email: res.rows[0].email,
		 		coins: STARTER_COINS
		 	});
		}
		else {
			return null;
		}

	  client.release();

	 	return user;
	}
};
