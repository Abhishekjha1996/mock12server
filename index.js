const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const {connection} = require("./db")
const {userRoute} = require("./routes/user.route")
const {employRoute} = require("./routes/employee.router")
const {auth} = require("./middleware/auth.middleware")

require('dotenv').config()
const app = express()
app.use(express.json())
app.use(cors())



app.use("/user", userRoute)

app.use(auth)

app.use("/dashboard", employRoute)

app.listen(process.env.PORT, async () => {

    try {
        await connection
        console.log("MONGO")        
    } catch (error) {
        console.log(error)
    }

    console.log("server")
})




/*

"First_Name": "Nikku",
  "Last_Name": "jha",
  "Email": "aj@gmail.com",
  "Department": "backend",
  "Salary": 15,
  "userID": "sring"




*/