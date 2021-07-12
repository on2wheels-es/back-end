# on2wheels 🚴‍♂️

## What is on2wheels?

on2wheels is web app that will make any cycling lover life's much easier by helping them to easily organize their trips and stages.

Simply fill-up the date range when you want to go on a cycling trip, based on that and a thorough data research we will show you the locations with better weather within Spain. Once you choose a location, you will be able to see all the cycling routes you can do on the chosen location.

Have you seen a nice route you want to do? That's easy! Signup and save it in your favourites routes 📌

There is even more you can do... but we will let you discover on your own 😉

## User Stories (MVP)

**404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault

**500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault

**Landing page** - As a user I want to be able to access the landing page so that I see what the app is about and login and signup

**Sign up** - As a user I want to be able to create an account to use the app and save my tasks

**Login** - As a user I want to be able to log in on the webpage 

**Logout** - As a user I want to be able to log out from the webpage

**Profile** - As a user I want to be able to see my profile and edit it

**Save a route** - As a user I want to be able to save my favourites routes

**Check my favourites routes** - As a user I want to be able to see my list of favourites routes if I have chosen to save them

**Home searchbar** - As a user I want to be able look for routes based on a date range and location (Autonomous Community)

**Locations List** - As a user I want to be able select the location(s) of my preference based on my search

**Locations Page** - As a user I want to be able see the location information: routes, ports, difficulty, location..

**Routes Page** - As a user I want to be able see the route information

## Backlog

**Responsive Design** - As a user I want to be able browse the App from all my devices

**Sign in with Strava** - As a user I want to be able to sign in with Strava

**Strava Information** - As a user I want to be able to see all my cycling and sports record in my profile

**Add New Route** - As a user I want to be able to add a new route

**Dark Theme** - As a user I want to be able to change to dark theme on the app

## Routes

| Name            | Method | Endpoint                      | Description                                      | Body                                  |   Redirects     |
| --------------- | ------ | ----------------------------- | ------------------------------------------------ | ------------------------------------- | --------------- |
| Home            | GET    | /                             | Search for my routes and see all routes availale |                                       |                 |
| Sign up         | POST   | /signup                       | Sign up a user with an account                   | { mail, username, password }          | /login          |
| Log in          | POST   | /login                        | Log in the user                                  | { mail, password }                    | /profile        |
| Logout          | GET    | /logout                       | Logout a user                                    |                                       | /logout         |
| Profile         | GET    | /profile                      | Get user's profile information                   |                                       |                 |
| Profile delete  | DELETE | /delete                       | Delete a user's profile                          |                                       | /sign up        |
| Edit profile    | PUT    | /edit                         | Edit user's profile                              | { mail, username, password, avatar }  | /profile        |
| Favourites      | GET    | /profile/favourites           | Get user's favourites routes                     |                                       |                 |
| Me              | GET    | /my                           | Get current user's session                       |                                       |                 |
| Location        | GET    | /{location-name}              | Get the location page with all info              |                                       |                 |
| Route           | GET    | /{location-name}/:idRoute     | Get the details of the route                     |                                       |                 |
| Mountain Pass   | GET    | /{location-name}/:idMountainPass | Get the details of the Mountain Pass          |                                       |                 |
| Save Route      | POST   | /{location-name}/:idRoute/add | Save route to favourites                         |                                       |                 |
| Delete Route    | DELETE | /{location-name}/:idRoute/delete | Delete route from favourites                  |                                       |                 |
| Save Mountain Pass | POST   | /{location-name}/:idMountainPass/add | Save Mountain Pass to favourites       |                                       |                 |
| Delete Mountain Pass    | DELETE | /{location-name}/:idMountainPass/delete | Delete Mountain Pass from favourites |                                     |                 |
​
## Models
​
Route model
​
```js
{
    title: String,
    description: String,
    "alpha_name": String,
    "coords": [Numbers],
    "start": {lat, long},
    "ubicacion": String,
    "nombre": String,
    "trailrank": Number,
    "distancia": Number,
    "desnivel": Number,
    "dificultad": String,
    "wikilocRoute": String,
    "photo1": String,
    "photo2": String,
    "photo3": String,
    "start_lat": Number,
    "start_long": Number,
    "mountainPassesIds": [{ type: Schema.Types.ObjectId, ref: 'mountainPasses' }],
    "municipioId": [{ type: Schema.Types.ObjectId, ref: 'locations' }],
}
```
​
User model
​
```js
{
    firstName: String,
    lasttName: String,
    email: String,
    profilePicture: String,
    hashedPassword: String,
    favouriteRoutes: [{ type: Schema.Types.ObjectId, ref: 'Routes' }],
    favouritePasses: [{ type: Schema.Types.ObjectId, ref: 'MountainPasses' }],
    favouriteLocations: [{ type: Schema.Types.ObjectId, ref: 'Location' }]
}
```
​
Locations model
​
```js
{
    "PROVINCIA": String,
    "municipio":  String,
    "POBLACION_MUNI": Number,
    "SUPERFICIE": Number,
    "LONGITUD_ETRS89": Number,
    "LATITUD_ETRS89": Number,
    "ALTITUD": Number,
    "municipio_original": String,
    "radius": Number,
    "routesIds": [{ type: Schema.Types.ObjectId, ref: 'Routes' }],
    "numero_rutas": Number,
    "mountainPassesIds": [{ type: Schema.Types.ObjectId, ref: 'mountainPasses' }],
}
```
​
Mountain Passes model
​
```js
{
    "PROVINCIA": String,
    "municipio":  String,
    "LONGITUD_ETRS89": Number,
    "LATITUD_ETRS89": Number,
    "ALTITUD": Number,
    "radius": Number,
    "routesIds": [{ type: Schema.Types.ObjectId, ref: 'Routes' }],
    "municipioId": [{ type: Schema.Types.ObjectId, ref: 'locations' }],
    "numero_rutas": Number,
    "photo": String,
}
```
## Link
### Github project
- [Frontend project]() 
- [Backend project]()

### Deploy links
- [Frontend deploy]()

### Project kanban
- [Github projects]()

### Wireframes 
- [InVision with Wireframes]()

### Slides
- [Slides]()
