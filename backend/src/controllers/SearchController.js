const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");

module.exports = {
  async index(request, response) {
    // Getting the info from the query from insomnia
    const { latitude, longitude, techs } = request.query;

    const techsArray = parseStringAsArray(techs);

    // Creating a list with filters, so I pass an object ( {} )
    const devs = await Dev.find({
      techs: {
        // MongoDB operator (https://docs.mongodb.com/manual/reference/operator/query/)
        $in: techsArray,
      },
      location: {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [longitude, latitude],
          },
          $maxDistance: 50000,
        },
      },
    });

    // Search all the dev within 10miles
    // Filter them by technology

    return response.json({ devs });
  },
};
