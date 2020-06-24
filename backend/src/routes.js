const { Router } = require("express");
const DevController = require("./controllers/DevController");
const SearchController = require("./controllers/SearchController");

const routes = Router();

routes.get("/devs", DevController.index);
routes.post("/devs", DevController.store);

routes.get("/search", SearchController.index);

module.exports = routes;

// HTTP Methods: GET, POST, PUT, DELETE

// PARAMETERS:
// Query Params = request.query (filter, order...)
// Route Params = request.params (Identify a resource at change or removal)
// Body = request.body (Data for creation or change of a previous register)


// index: to display a list, 
// show: to display a unique dev, 
// store: to create, 
// update: to modify, 
// destroy: to delete


// When we use GET, we use query