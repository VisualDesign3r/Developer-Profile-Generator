const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

inquirer
  .prompt({
    message: "Enter your GitHub username:",
    name: "username"
  },
  {
    type: "input",
    message: "What is your Repo name?",
    name: "reponame"
  })
  .then(function({ username }) {
    const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

    axios.get(queryUrl).then(function(res) {
      const repoNames = res.data.map(function(repo) {
        return repo.name;
      });

      const repoNamesStr = repoNames.join("\n");

      fs.writeFile("repos.txt", repoNamesStr, function(err) {
        if (err) {
          throw err;
        }

        console.log(`Saved ${repoNames.length} repos`);
      });
    });
  });
















// const fs = require("fs");
// const axios = require("axios");
// const inquirer = require("inquirer");



// inquirer
//   .prompt({
//     message: "Enter your GitHub username",
//     name: "username"
//   })
//   .then(function({ username }) {
//     const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
    
//     axios
//     .get(queryUrl)
//     .then(function(res) {
//       //add for loop
//       for(let i = 0; i < res.data.length; i++)
//       console.log(res.data[0].owner.repos_url)//add path
//     })
//   });



// const questions = [

// ];
// // .then(function(data) {
// //     console.log(data);
// //     let info = JSON.stringify(data);
  
// //     let fs = require("fs");
// // fs.writeToFile("repos.txt", data, function(err) {
    
// //         if (err) {
// //           return console.log(err);
// //         }
      
// //         console.log("Success!");
      
// //       });

// // }
  
   




// function init() {

// }

// init();



// //reference


// // inquirer.prompt([
// //   {
// //     type: "input",
// //     name: "name",
// //     message: "What is your name?"
// //   },
// //   {
// //     type: "checkbox",
// //     message: "What languages do you know?",
// //     name: "stack",
// //     choices: [
// //       "HTML",
// //       "CSS",
// //       "JavaScript",
// //       "MySQL"
// //     ]
// //   },
// //   {
// //     type: "list",
// //     message: "What is your preferred method of communication?",
// //     name: "contact",
// //     choices: [
// //       "email",
// //       "phone",
// //       "telekinesis"
// //     ]
// //   }
// // ]).then(function(data) {
// //   console.log(data);
// //   let info = JSON.stringify(data);

// //   let fs = require("fs");

// //   fs.writeFile("info.txt", info, function(err) {
  
// //     if (err) {
// //       return console.log(err);
// //     }
  
// //     console.log("Success!");
  
// //   });

// //   // Then write the user response to a file.

// // });