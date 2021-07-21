// Import required module csvtojson and mongodb packages
const csvtojson = require('csvtojson');
const mongodb = require('mongodb');

const url = process.env.MONGODB_URI;

let dbConn;
mongodb.MongoClient.connect(url, {
	useUnifiedTopology: true,
})
	.then(client => {
		console.log('DB Connected!');
		dbConn = client.db();
	})
	.then(() => {
		// CSV file name
		const fileName = 'puertos_i.csv';
		const arrayToInsert = [];
		csvtojson()
			.fromFile(fileName)
			.then(source => {
				// Fetching the all data from each row
				for (let i = 0; i < source.length; i++) {
					const oneRow = {
						_id: JSON.parse(source[i].ID),
						name: source[i].name,
						province: source[i].province,
						municipality: source[i].municipality,
						altitude: JSON.parse(source[i].altitude),
						gradient: JSON.parse(source[i].gradient),
						distance: JSON.parse(source[i].distance),
						mountain_slope: JSON.parse(source[i].mountain_slope),
						technical_difficulty: JSON.parse(source[i].technical_difficulty),
						url: source[i].url,
						peak_coords: JSON.parse(`{
                    "type": "Point",
                     "coordinates": [${source[i].peak_coords}] 
                }`),
						photo: source[i].photo,
					};
					arrayToInsert.push(oneRow);
				}
				const collectionName = 'mountainPasses';
				const collection = dbConn.collection(collectionName);
				collection.insertMany(arrayToInsert, (err, result) => {
					if (err) console.log(err);
					if (result) {
						console.log('Import CSV into database successfully.');
					}
				});
			});
	})
	.catch(err => {
		console.log(`DB Connection Error: ${err.message}`);
	});
