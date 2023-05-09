const mongoose = require("mongoose");

const empSchema = mongoose.Schema(
  {
    First_Name: String,
    Last_Name: String,
    Email: String,
    Department: String,
    Salary: Number,
    userId: String,
  },
  {
    versionKey: false,
  }
);

const EmployModel = mongoose.model("employe", empSchema);

module.exports = {
  EmployModel,
};
