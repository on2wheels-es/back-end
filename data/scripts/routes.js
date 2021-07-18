// Import required module csvtojson and mongodb packages
const csvtojson = require('csvtojson');
const mongodb = require('mongodb');

const url = 'mongodb+srv://laialloret:laialloret@on2wheels.hns8v.mongodb.net/on2wheels ';

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
		const fileName = 'routes_1807_819i.csv';
		const arrayToInsert = [];
		csvtojson()
			.fromFile(fileName)
			.then(source => {
				// Fetching the all data from each row
				for (const i = 0; i < source.length; i++) {
					const oneRow = {
						_id: JSON.parse(source[i].ID),
						name: source[i].name,
						ccaa: source[i].ccaa,
						province: source[i].province,
						start: JSON.parse(`{
                    "type": "Point",
                     "coordinates": [${source[i].start}] 
                }`),
						midpoint: JSON.parse(`{
                    "type": "Point",
                     "coordinates": [${source[i].midpoint}] 
                }`),
						trailrank: JSON.parse(source[i].trailrank),
						distance: JSON.parse(source[i].distance),
						gradient: JSON.parse(source[i].gradient),
						min_alt: JSON.parse(source[i].min_alt),
						max_alt: JSON.parse(source[i].max_alt),
						municipality: source[i].municipality,
						mountain_passes_ids: JSON.parse(source[i].mountain_passes_ids),
						municipalities_ids: source[i].municipalities_ids,
					};
					arrayToInsert.push(oneRow);
				}
				console.log(dbConn);
				const collectionName = 'routes';
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
