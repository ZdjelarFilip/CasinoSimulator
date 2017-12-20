import { DB } from '../db';

//Queries
var query = [
	find: 'SELECT googleToken, name, coins FROM User WHERE id=$1'
];

export default class User {
	//Constructs a User object
	constructor(params) {
		this.id = params.id;
		this.googleToken = params.googleToken,
		this.name = params.name;
		this.email = params.email;
		this.coins = params.coins;
	}


	//Finds a User based on their OAuth token
	static async function findById(id) {

	 	var client = await DB.connect();

	 	const res = await client.query(query.find, [id]);

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

		}

	  client.release();

	 	return user;
	}
};
