const fs = require('fs');
const originalRoutes = require('../originalFiles/routes.json');

originalRoutes.map(route => {
	route._id = route.ID;
	route.start = JSON.parse(
		`{
			"type": "Point",
		 	"coordinates": [${route.start}] 
		}`
	);
	route.midpoint = JSON.parse(
		`{
			"type": "Point",
		 	"coordinates": [${route.midpoint}] 
		}`
	);
});

const file = JSON.stringify(originalRoutes);
fs.writeFileSync('./RoutesDB.json', file);
