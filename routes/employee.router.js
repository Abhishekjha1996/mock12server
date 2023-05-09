const express = require("express");
const employRoute = express.Router();
const { EmployModel } = require("../model/empoyees.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

employRoute.get("/", async (req, res) => {
  const { department, pagelimit, salary, search } = req.query;
  try {
    if (department) {
      const data = await EmployModel.find({ Department: department });
      res.status(200).send(data);
    } else if (salary) {
      const data = await EmployModel.find({}).sort({ Salary: 1 });
      res.status(200).send(data);
    } else if (pagelimit) {
      const data = await EmployModel.find({}).limit(pagelimit);
      res.status(200).send(data);
    } else if (search) {
      // db.coll.find({$text: {$search: "cake"}}, {score: {$meta: "textScore"}}).sort({score: {$meta: "textScore"}})
      const data = await EmployModel.findOne({ First_Name: search });
      res.status(200).send(data);
    } else {
      const data = await EmployModel.find();
      res.status(200).send(data);
    }

    // db.coll.find({}).sort({"year": 1, "rating": -1}).skip(10).limit(3)
  } catch (error) {
    res.status(404).send(error.message);
  }
});

employRoute.post("/employees", async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decode = jwt.verify(token, "secretkey");
  console.log(decode.userID)
  const { First_Name, Last_Name, Email, Department, Salary } = req.body;

  try {
    const data = new EmployModel({
      First_Name,
      Last_Name,
      Email,
      Department,
      Salary,
      userID: decode.userID,
    });
    await data.save();
    res.status(200).send({ msg: "data has posted sucessfully", data });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

employRoute.patch("/employees/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  try {
    await EmployModel.findByIdAndUpdate({ _id: id }, data);
    res.status(200).send({ msg: "data has been updated sucessfully" });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

employRoute.delete("/employees/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await EmployModel.findByIdAndDelete({ _id: id });
    res.status(200).send({ msg: "data has been deleted sucessfully" });
  } catch (error) {
    res.status(404).send(error.message);
  }
});

module.exports = {
  employRoute,
};
