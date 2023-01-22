const express = require('express')
const app = express()
const bodyParser = require("body-parser");
let studentArray = require("./InitialData");
const isvalid = require("../script/validation");

const path = require("path")
const port = 8000;
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here


app.get("/api/student", async (req, res) => {
    res.status(200).send(studentArray);
})

//---------------
app.get("/api/student/:id", (req, res) => {
    let student = studentArray.findIndex(data => data.id == req.params.id);
    if (student != -1)
        res.status(200).json({
            status: "success",
            result: studentArray[student]
        })
    else {
        res.status(400).json({
            status: "failed"
        })
    }
})


app.post("/api/student", (req, res) => {
    let id = new Date().getTime();
    currentClass = parseInt(req.body.currentClass);
    // const { name, currentClass, division } = req.body;
    let result = isvalid(req.body.name, currentClass, req.body.division);
    console.log(req.body)
    // let result = true;
    if (result) {
        // console.log("hello");
        studentArray.push({
            id,
            name: req.body.name,
            currentClass: req.body.currentClass,
            division: req.body.division
        })
        res.status(200).json({
            status: "success",
            message: (`${id} is sucessfully created `)
        })
    }
    else {
        res.status(400).json({
            status: "failed",
            result: "invalid field"
        })
    }
});


// app.put('/api/student/:id', (req, res) => {
//     const student = studentArray.findIndex(student => student.id == req.params.id)
//     // console.log(student) //----> 6

//     if (student != -1) {
//         const result = isvalid(req.body);
//         if (result) {
//             // console.log({ ...studentArray[student], ...req.body });  // { id: 7, name: 'amansss', currentClass: 7, division: 'B' }
//             studentArray.splice(student, 1, { ...studentArray[student], ...req.body })
//             //             splice--> (index to remove, number of element to be remove,  {   })
//             res.status(201).json({ message: 'Student record updated successfully' })
//         } else {
//             res.status(404).json({ error: message })
//         }
//     } else {
//         res.status(404).json({ error: 'Student id is not valid!' })
//     }

// })


app.put("/student/:id", (req, res) => {
    // console.log(req.params.id);
    let bool = true;
    studentArray.map((data) => {
        if (data.id == req.params.id) {
            bool = false;
            data.name = req.body.name;
            res.json({ name: req.body.name });
        }
    });
    if (bool) {
        res.status(400).send("bad request");
    }
});


app.delete("/api/student/:id", (req, res) => {
    let student = studentArray.find(student => student.id == req.params.id);
    // console.log(student)
    if (student) {
        studentArray = studentArray.filter((user) => {
            return (user.id != req.params.id);
        })
        res.status(200).json({
            status: "success",
            Rest_Data: studentArray
        })
    } else {
        res.status(400).send("invalid id")

    }

})


app.delete("*", (req, res) => {
    res.status(400).send("not matched")
})
app.put("*", (req, res) => {
    res.status(400).send("not matched")
})
app.get("*", (req, res) => {
    res.status(400).send("not matched")
})
app.post("*", (req, res) => {
    res.status(400).send("not matched")
})
app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   