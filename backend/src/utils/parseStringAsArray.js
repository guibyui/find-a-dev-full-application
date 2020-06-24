// Isolating a function so we don't repeat it in the code

module.exports = function parseStringAsArray(arrayAsString) {
  // Creating the array splitting in the comma, and trimming any space (' ')
  return arrayAsString.split(",").map((tech) => tech.trim());
};
