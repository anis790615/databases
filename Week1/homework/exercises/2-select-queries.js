const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "world",
});
connection.connect();
// 1-  Names of countries with population greater than 8 million
connection.query(
  "SELECT Name FROM country WHERE Population > 8000000;",
  function (error, results, fields) {
    if (error) throw error;
    console.log("Countries with population over 8 mil:");
    results.forEach((result) => console.log(result.Name));
  }
  // The above function could made as a function so not to be repeated, logging the results parameter only. I did however output a different message in each query, and format it differently. Thus, I opted out of such approach. I thought I should mention that it could be done.
);
// 2- The names of countries that have “land” in their names
connection.query(
  "SELECT Name FROM country WHERE Name LIKE '%land%';",
  function (error, results, fields) {
    if (error) throw error;
    console.log("Countries with 'land' in their names:");
    results.forEach((result) => console.log(result.Name));
  }
);
// 3- the names of the cities with population in between 500,000 and 1 million
connection.query(
  "SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000;",
  function (error, results, fields) {
    if (error) throw error;
    console.log("Cities with population between 500,000 and 1,000,000:");
    results.forEach((result) => console.log(result.Name));
  }
);
// 4- The name of all the countries on the continent ‘Europe’
connection.query(
  "SELECT Name FROM country WHERE Continent = 'Europe';",
  function (error, results, fields) {
    if (error) throw error;
    console.log("The countries on the continent ‘Europe’:");
    results.forEach((result) => console.log(result.Name));
  }
);
// 5- List all the countries in the descending order of their surface areas.
connection.query("SELECT * FROM country ORDER BY SurfaceArea DESC;", function (
  error,
  results,
  fields
) {
  if (error) throw error;
  console.log("Countries in descending order of their surface area:");
  results.forEach((result) => {
    const { Name, SurfaceArea } = result;
    console.log(`${Name} : ${SurfaceArea} sqkm`);
  });
});
// 6- The names of all the cities in the Netherlands
connection.query("SELECT Name FROM city WHERE CountryCode= 'NLD';", function (
  error,
  results,
  fields
) {
  if (error) throw error;
  console.log("Names of all the cities in the Netherlands:");
  results.forEach((result) => {
    console.log(`${result.Name}`);
  });
});
// 7- The names of all the cities in the Netherlands
connection.query("SELECT Name FROM city WHERE CountryCode= 'NLD';", function (
  error,
  results,
  fields
) {
  if (error) throw error;
  console.log("Names of all the cities in the Netherlands:");
  results.forEach((result) => {
    console.log(`${result.Name}`);
  });
});
// 8- The population of Rotterdam
connection.query(
  "SELECT Population FROM city WHERE Name= 'Rotterdam';",
  function (error, results, fields) {
    if (error) throw error;
    console.log("The population of Rotterdam:");
    results.forEach((result) => {
      console.log(`${result.Population} people`);
    });
  }
);
// 9- Top ten most populated cities
connection.query(
  "SELECT * FROM city ORDER BY Population DESC LIMIT 10;",
  function (error, results, fields) {
    if (error) throw error;
    console.log("Top ten most populated cities:");
    results.forEach((result) => {
      console.log(`${result.Name}: population ${result.Population}`);
    });
  }
);
// 10- The population number of the world?
connection.query(
  "SELECT SUM(Population) AS totalPopulation FROM country;",
  function (error, results, fields) {
    if (error) throw error;
    console.log("The total population in the world:");
    results.forEach((result) => {
      console.log(`${result.totalPopulation}`);
    });
  }
);
// Trying to do the same with reduce
// connection.query("SELECT Population FROM country;", function (
//   error,
//   results,
//   fields
// ) {
//   if (error) throw error;
//   console.log("The total population in the world:");
//   const totalPopulation = results.reduce(
//     (acc, result) => acc + result.Population,
//     0
//   );
//   console.log(`${totalPopulation}`);
// });

connection.end();
