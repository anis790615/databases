##Conversion Steps
Due to the fact that the installation and conversion steps didn't go as soothly as I assumed, I decided to write all the steps of the experience. They were as follows:

1. I registered an account with MongoDb and opted for a cloud version.
2. I installed 2 of the connector types, Mongo Compass and Mongo shell and tested the connection to the DB. I left the node.js connector for the exercise itself.
3. The conversion was an exercise in frustration, which can be seen through the steps that I followed:
4. Implementing the commands provided by the exercise resulted in an error due to security file writing permissions mysql. The commands were:
   `<select * into outfile 'city.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from city;>`
   `<select * into outfile 'country.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from country;>`
   `<select * into outfile 'countrylanguage.csv' FIELDS TERMINATED BY ',' LINES TERMINATED BY '\n' from countrylanguage;>`
5. Solving the issue resulted in that the file was written, but its location couldn't be found.
6. The location was found in data folder in mysql folder, to access which root user should be used.
7. The [link](https://docs.atlas.mongodb.com/getting-started/#insert-data-into-your-cluster) on the ReadME file that supposedly links to how you could import csv actually doesn't show any information on how to do that. It merely shows the steps on how to insert documents.
8. The search indicated using a tool called _mongoimport_, the installation of which without the whole MongoDB server installation(as I didn't install it), took some time and effort, installing _macports_, which in turn required installing _Xcode_ and the _Xcode_ command line tools, and then simply:
   `<sudo port selfupdate && sudo port install mongo-tools>`
9. By that time I found that Mongo compass had an import built in, using which showed that the csv files that I imported before had no column names. A new import using mysqlWorkbench through the interface turned out to be easier and more efficient.
10. The import froze when trying to change the column types before import (a step provided by the import in Mongo Compass). It only worked when they were all left as strings.
11. Reverted to _mongoimport_ which finally worked using the following command:
    `<sudo mongoimport --uri "my-connector-link" --type csv --collection name-of-collection --headerline --drop --file file-name.csv>`
