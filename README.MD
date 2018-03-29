# Grow.it: grow more... buy less

![HTML5,CSS3 and JS](doc/images/html5-css3-js.png)          [![Bootstrap](doc/images/bootstrap.png)](http://getbootstrap.com/)          [![React](doc/images/react.png)](https://facebook.github.io/react/)          [![NodeJS](doc/images/nodejs.png)](https://nodejs.org/)          [![MongoDB](doc/images/mongodb.png)](https://www.mongodb.com/)          [![Skylab](doc/images/skylab-56.png)](http://www.skylabcoders.com/)  

## Target

Grow it is a collaborative urban orchards platform. Intended to connect people having space to grow with people with time to attend and possibly share harvests between  all of them.

-------------------------------------------------------


## Functional description

This application allows to connect people through a growing community of owned plantations. Once a user is registered, he can create an orchard or collaborate in another ones, look for consulting, share the harvest surplus, etc.

Contacts between users are possible by mail.

![Use cases](doc/images/funtional_description.png)


### Screenshots

![landing_page](doc/images/landing_page.png)
![about_us](doc/images/about_us.png)
![register_user](doc/images/register_user.png)
![register_orchard](doc/images/register_orchard.png)
![search](doc/images/search.png)
![orchard](doc/images/orchard.png)
![orchard_admin](doc/images/orchard_admin.png)
![manage_collaborators](doc/images/manage_collaborators.png)
![manage_plantations](doc/images/manage_plantations.png)

[Surge](http://growit.surge.sh)

-------------------------------------------------------


## Technical description

* HTML5
* CSS3
* Javascript
* Node
* MongoDB
* Mongoose
* React

### General structure
![general_structure](doc/images/general_structure.png)

### Data model
![Data model](doc/images/Data_model.png)

#### Client app
![components](doc/images/components.png)

#### API client
HTTP connector client using [request-promise](https://github.com/request/request-promise)

#### API server
3 layers separation:
* Routes/handlers: I/O layer
* Logic: implement business logic
* Models: define Mongoose schemas

API reference detailed in [API server](https://github.com/csd0/REST-API-Server)



-------------------------------------------------------


### Sprint plan

|    Fecha   |  Planificación  |
|------------|-----------------|
| 2018-03-09 | Kick-off meeting | 
| 2018-03-12 | Documented README.MD, with datamodel, mockup & sprint plan | 
| 2018-03-14 | Doc improvements, design & build front-end | 
| 2018-03-16 | Read-only appp deployed to surge, no-funcional React components implementation, API server y MongoDB defined| 
| 2018-03-19 | React functionality: basic funtions. TDD API testing | 
| 2018-03-21 | React functionality: advanced funtions & bug fixes. Functional connection between entre Front-end, API Server and MongoDB | 
| 2018-03-23 | Basic functional application deployed | 
| 2018-03-28 | Improvements, bug testing, hotfixes | 
| 2018-03-30 | Demo day | 

![Gantt](doc/images/Gantt.png)

-------------------------------------------------------


### Links
* Gestión de tareas en [Trello](https://trello.com/b/tXKaT7at)
* [Repositorio](https://github.com/csd0/Grow.it) del proyecto
* [API server](https://github.com/csd0/REST-API-Server)
* [Surge](http://growit.surge.sh)
