const fs = require('fs');
const originalMountainPasses = require('./originalMountainPasses.json');

originalMountainPasses.map(mountainPass => {
	mountainPass._id = mountainPass.ID;
	mountainPass.coords = JSON.parse(
		`{"type": "Point", "coordinates": [${JSON.parse(
			mountainPass.coords.replace('"', '').replace('(', '[').replace(')', ']')
		)}] }`
	);
});

const file = JSON.stringify(originalMountainPasses);
fs.writeFileSync('./data/MountainPassesDB.json', file);
