var express = require("express");
var router = express.Router();
const employeesSchema = require("../data/employeesSchema");
// Kết nối đến mongoose model Employees
const employees = require("../models/Employees");

//Get list of employees
router.get("/", async function (req, res, next) {
  try {
    const employeeList = await employees.find({});
    if (employeeList.length === 0) {
      return res.status(404).json({ message: "No employees found" });
    }
    res.status(200).json(employeeList);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching employees: " + error.message });
  }
});

// Add a new employee
router.post("/", async function (req, res) {
  try {
    employeesSchema.validateSync(req.body);
    const newEmployee = new employees(req.body);
    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding employee: " + error.message });
  }
});

// Delete employee by ID
router.delete("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    const foundEmployee = await employees.findByIdAndDelete(id);
    if (!foundEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting employee: " + error.message });
  }
});

// Update employee by ID
router.put("/:id", async function (req, res) {
  try {
    const id = req.params.id;
    employeesSchema.validateSync(req.body);
    const updatedEmployee = await employees.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(updatedEmployee);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating employee: " + error.message });
  }
});

module.exports = router;
