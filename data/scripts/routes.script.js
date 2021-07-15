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

// mongoimport --uri mongodb+srv://laialloret:laialloret@on2wheels.hns8v.mongodb.net/on2wheels  --collection routes  --jsonArray  --file /Users/laialloret/Downloads/routesDB.json