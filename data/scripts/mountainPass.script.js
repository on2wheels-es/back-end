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
