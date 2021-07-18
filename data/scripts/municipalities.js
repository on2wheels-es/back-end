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
		const fileName = 'towns_1807_841i.csv';
		const arrayToInsert = [];
		csvtojson()
			.fromFile(fileName)
			.then(source => {
				// Fetching the all data from each row
				for (let i = 0; i < source.length; i++) {
					const oneRow = {
						_id: JSON.parse(source[i].ID),
						municipality: source[i].municipality,
						ccaa: source[i].ccaa,
						province: source[i].province,
						municipality_inhabitants: JSON.parse(source[i].municipality_inhabitants),
						geographic_area: JSON.parse(source[i].geographic_area),
						radius: JSON.parse(source[i].radius),
						routes_number: JSON.parse(source[i].routes_number),
						routes_ids: JSON.parse(source[i].routes_ids),
						mountain_passes_ids: source[i].mountain_passes_ids, //JSON.parse(source[i].mountain_passes_ids),
						coords: JSON.parse(`{
                    "type": "Point",
                     "coordinates": [${source[i].coords}] 
                }`),
					};
					arrayToInsert.push(oneRow);
				}
				console.log(dbConn);
				const collectionName = 'municipalities';
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
