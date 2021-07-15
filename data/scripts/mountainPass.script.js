const fs = require('fs');
const originalMountainPasses = require('../originalFiles/mountainPasses.json');

originalMountainPasses.map(mountainPass => {
	mountainPass._id = mountainPass.ID;
	mountainPass.coords = JSON.parse(
		`{
			"type": "Point",
		 	"coordinates": [${mountainPass.coords}] 
		}`
	);
});

const file = JSON.stringify(originalMountainPasses);
fs.writeFileSync('./MountainPassesDB.json', file);

//mongoimport --uri mongodb+srv://laialloret:laialloret@on2wheels.hns8v.mongodb.net/on2wheels  --collection mountainPasses  --jsonArray  --file /Users/laialloret/Downloads/MountainPassesDB.json