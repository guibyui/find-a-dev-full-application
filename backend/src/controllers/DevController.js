const axios = require("axios");
const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");
const { findConnections, sendMessage } = require("../websocket");
// Index to display a list, show to display a unique dev, store to create, update to modify, destroy to delete

module.exports = {
  // Route to List all the devs/users
  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },

  // Route to create a new dev/user
  async store(request, response) {
    // Getting the data from the body of the call from insomnia
    const { github_username, techs, latitude, longitude } = request.body;

    // Avoiding duplicated accounts
    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      // API Call using axios
      const apiResponse = await axios.get(
        `http://api.github.com/users/${github_username}`
      );

      const { name = login, avatar_url, bio } = apiResponse.data;

      console.log(name, avatar_url, bio, github_username);

      // Getting the techs from our request.body and converting them to an Array
      const techsArray = parseStringAsArray(techs);

      // Getting the data from PointSchema to pass for our const dev
      const location = {
        type: "Point",
        coordinates: [longitude, latitude],
      };

      // Short Sintax
      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      });

      // Filter the connections that are in a 10km radius
      // and the new dev must have at least one tech

      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      );

      sendMessage(sendSocketMessageTo, "new-dev", dev);
    }

    return response.json(dev);
  },

  // async update() {
  //   // name, avatar, bio, location, techs
  // },

  // async destroy() {

  // },
};
