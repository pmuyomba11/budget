// DECLARE DEPENDENCIES
const express = require("express")
const budget = require("./models/budget.js")
const bodyParser = require('body-parser')
let bankAcc = 0;

// INITIALIZE APP EXPRESS
const app = express()

//ESTABLISH MIDDLEWARE
app.use(express.static('public'))
app.use(express.urlencoded({extended: false}))

// defining routes
//INDEX
app.get("/budgets", (req, res) => {
    res.render("budget_index.ejs", {
        budgets: budget,
        bankAcc: bankAcc,
    })
})

//NEW
app.get("/budgets/new", (req, res) => {
    res.render("budget_new.ejs", {
        newBudget: budget
    })
})

//CREATE
app.post("/budgets", (req, res) => {
    let tag = req.body.tags //assigns the tag input to variable tag
    const tagArr = tag.split(", ") //splits the string from the tag input based on a comma and space and puts them in an array
    let budgetObj = { //creates an obj with the keys we need and links their req.body values with the key
        date: req.body.date,
        name: req.body.name,
        from: req.body.from,
        amount: req.body.amount,
        tags: tagArr,
    }
    budget.push(budgetObj) //pushes our budgetObj into the budget array
    console.log(budget)
    res.redirect("/budgets")
})

//SHOW
app.get("/budgets/:index", (req, res) => {
    res.render("budget_show.ejs", {
        budgetIndex: budget[req.params.index]
    })
})


// app listening.....
app.listen(3000, () => {
    console.log("server is up and running...")
})