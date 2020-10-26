const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const team = []
const teamID = []



const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

async function Useroutput() {
    console.log("Welcome to Team Profile Generator")
    await inquirer
        .prompt([
            {
                type: "input",
                message: "Please enter your name",
                name: "name",
                validate: function (value) {
                    const pass = value.match(/^[a-zA-Z\s]+$/i);
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid name (alphabetic characters and spaces only).";
                }
            },
            {
                type: "input",
                message: "Please enter your ID number",
                name: "id",
                validate: function (value) {
                    const pass = value.match(/^\d{3,}$/i);
                    if (pass) {
                        return true;
                    }
                    return "Please enter a ID  number (numeric characters only, minimum 3 digits).";
                }

            },
            {
                type: "input",
                message: "Please your email ID",
                name: "email",
                validate: function (value) {
                    const pass = value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i);
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid email address.";
                }
            },
            {
                type: "input",
                message: "Please your number",
                name: "phoneNumber",
                validate: function (value) {
                    const pass = value.match(/^\d{3,}$/i);
                    if (pass) {
                        return true;
                    }
                    return "Please enter a valid office number (numeric characters only, minimum 3 digits).";
                }
            },
        ]).then(function ({ name, id, email, phoneNumber }) {
            const newManager = new Manager(name, id, email, phoneNumber)
            console.log(newManager.getRole())
            teamID.push(newManager.id)
            team.push(newManager)
            console.log(newManager)

        })
    await AddUsers()
}

function AddUsers() {
    inquirer
        .prompt([
            {
                type: "list",
                name: "moreUsers",
                message: "please choose which employee you will adding",
                choices: ["Intern", "Engineer", "No, Thank You!"]

            },
        ]).then(function ({ moreUsers }) {
            if (moreUsers == "Intern") {
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "Please enter your employees name",
                            name: "employeeName",
                            validate: function (value) {
                                const pass = value.match(/^[a-zA-Z\s]+$/i);
                                if (pass) {
                                    return true;
                                }
                                return "Please enter a valid name (alphabetic characters and spaces only).";
                            }
                        },
                        {
                            type: "input",
                            message: "Please enter your employees ID number",
                            name: "employeesId",
                            validate: function (value) {
                                const pass = value.match(/^\d+$/i);
                                if (pass) {
                                    if (!teamID.includes(value)) return true;
                                    return "This employee ID is already in use. Please choose another."
                                }
                                return "Please enter a valid employee id (numeric characters only).";
                            }
                        },
                        {
                            type: "input",
                            message: "Please your employees email ID",
                            name: "employeesEmail",
                            validate: function (value) {
                                const pass = value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i);
                                if (pass) {
                                    return true;
                                }
                                return "Please enter a valid email address.";
                            }
                        },
                        {
                            type: "input",
                            message: "Please your employees school name",
                            name: "school"
                        },
                    ]).then(function ({ employeeName, employeesId, employeesEmail, school }) {
                        let newEmployee = ""
                        newEmployee = new Intern(employeeName, employeesId, employeesEmail, school)
                        team.push(newEmployee)
                        teamID.push(newEmployee.id)
                        console.log(newEmployee)
                        console.log(newEmployee)
                        AddUsers()

                    })
            } else if (moreUsers == "Engineer") {
                console.log("Engineer")
                inquirer
                    .prompt([
                        {
                            type: "input",
                            message: "Please enter your employees name",
                            name: "employeeName",
                            validate: function (value) {
                                const pass = value.match(/^[a-zA-Z\s]+$/i);
                                if (pass) {
                                    return true;
                                }
                                return "Please enter a valid name (alphabetic characters and spaces only).";
                            }
                        },
                        {
                            type: "input",
                            message: "Please enter your employees ID number",
                            name: "employeesId",
                            validate: function (value) {
                                const pass = value.match(/^\d+$/i);
                                if (pass) {
                                    if (!teamID.includes(value)) return true;
                                    return "This employee ID is already in use. Please choose another."
                                }
                                return "Please enter a valid employee id (numeric characters only).";
                            }

                        },
                        {
                            type: "input",
                            message: "Please your employees email ID",
                            name: "employeesEmail",
                            validate: function (value) {
                                const pass = value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i);
                                if (pass) {
                                    return true;
                                }
                                return "Please enter a valid email address.";
                            }
                        },
                        {
                            type: "input",
                            message: "Please your employees github name",
                            name: "github"
                        },
                    ]).then(function ({ employeeName, employeesId, employeesEmail, github }) {
                        let newEmployee = ""
                        newEmployee = new Engineer(employeeName, employeesId, employeesEmail, github)
                        team.push(newEmployee)
                        teamID.push(newEmployee.id)
                        console.log(teamID)
                        AddUsers()
                    })
            } else if (moreUsers == "No, Thank You!") {
                const html = render(team);
                fs.writeFileSync(outputPath, html);
            }
        })
}

Useroutput();

