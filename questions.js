let inquirer = require("inquirer");
let fs = require('fs');
const axios = require("axios");

inquirer.prompt([
    {
        message: "Enter your GitHub username:",
        name: "username"
    },
    {
        type: "input",
        name: "project",
        message: "What is your project's name?"
    },
    {
        type: "input",
        name: "description",
        message: "Write a short description of your project?"
    },
    {
        //or a list
        type: "list",
        message: "What kind of license should your project have?",
        name: "license",
        choices: [
            "MIT",
            "GNU",
            "Apache"
        ]
    },
    {
        type: "input",
        name: "dependencies",
        message: "What command should be run to install dependencies?"
    },
    {
        type: "input",
        name: "npm",
        message: "What command should be run test?"
    },
    {
        type: "input",
        name: "repo",
        message: "What does user need to know about using the repo?"
    },
    {
        type: "input",
        name: "contributing",
        message: "What does the user need to know about contributing to the repo?"
    }
]).then(function (questions) {

    const queryUrl = `https://api.github.com/users/${questions.username}`;

    axios.get(queryUrl).then(function (res) {
        writeFile({ ...questions, ...res.data })
    }).catch(err=>{
        console.log(err)
    throw err}
        );
}).catch(err=>console.log(err));

function writeFile(data) {
    console.log(data)
    let badge = data.license === 'MIT' ? '(https://img.shields.io/badge/license-MIT-blue.svg)' :
        data.license === 'GNU' ? '(https://img.shields.io/badge/License-GPLv3-blue.svg)' : '(https://img.shields.io/badge/License-Apache%202.0-blue.svg)'
    let fileStr = `
# ${data.project}
[![GitHub license]${badge}](${data.html_url})
​
## Description
​
${data.description}
​
## Table of Contents 
* [Installation](#installation)
​
* [Usage](#usage)
​
* [License](#license)
​
* [Contributing](#contributing)
​
* [Tests](#tests)
​
* [Questions](#questions)
​
## Installation
​
${data.dependencies}
​
## Usage
​
${data.repo}
​
## License
​
This project is licensed under the ${data.license} license.
  
## Contributing
​
${data.contributing}
​
## Tests
​
To run tests, run the following command:
​
${data.npm}
​
## Questions
​
<img src="${data.avatar_url}" alt="avatar" style="border-radius: 16px" width="30" />
​
If you have any questions about the repo, open an issue or contact [${data.login}](${data.html_url}) directly.
    `
    fs.writeFile(`${data.project}.md`, fileStr, function (err) {
        if (err) {
            throw err;
        }
    })
}




// .then(function(data) {
//   console.log(data);
//   let info = JSON.stringify(data);

//   .then(function({ username }) {
//     const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;
//     axios.get(queryUrl).then(function(res) {
//           console.log(data);
//   let info = JSON.stringify(res);
//     //     const repoNames = res.data.map(function(repo) {
//     //       return repo.name;
//     //     });

//     //     // const repoNamesStr = repoNames.join("\n");
//     // let repoNamesStr = JSON.stringify(data);


// //   let fs = require("fs");

//   fs.writeFile("ReadMe.txt", info, function(err) {

//     if (err) {
//       return console.log(err);
//     }

//     console.log("Success!");

//   });

//   // Then write the user response to a file.

// });
