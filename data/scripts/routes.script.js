/* eslint-disable no-console */
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
		const fileName = '../originalFiles/first_df.csv';
		const arrayToInsert = [];
		csvtojson()
			.fromFile(fileName)
			.then(source => {
				// Fetching the all data from each row
				for (let i = 0; i < source.length; i++) {
					const oneRow = {
						_id: JSON.parse(source[i].ID),
						nombre: source[i].nombre,
						ccaa: source[i].ccaa,
						province: source[i].provincia,
						coords: JSON.parse(`{
                    "type": "LineString",
                     "coordinates": [${source[i].coords}] 
                }`),
						alt: JSON.parse(source[i].alt),
						start: JSON.parse(`{
                    "type": "Point",
                     "coordinates": [${source[i].start}] 
                }`),
						midpoint: JSON.parse(`{
                    "type": "Point",
                     "coordinates": [${source[i].midpoint}] 
                }`),
						distance: JSON.parse(source[i].distancia),
						gradient: JSON.parse(source[i].desnivel),
						min_alt: JSON.parse(source[i].min_alt),
						max_alt: JSON.parse(source[i].max_alt),
						municipalities: source[i].municipios,
						mountain_passes: JSON.parse(source[i].puertos),
						trailrank: JSON.parse(source[i].trailrank),
						url: source[i].url,
					};
					arrayToInsert.push(oneRow);
				}
				// inserting into the table “employees”
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
