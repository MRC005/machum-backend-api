const Employee = require('../schemas/Employee');

exports.getAllEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};

exports.createEmployee = async (req, res) => {
  const employee = new Employee(req.body);
  await employee.save();
  res.status(201).json(employee);
};

exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const employee = await Employee.findByIdAndUpdate(id, req.body, { new: true });
  if (!employee) return res.status(404).json({ message: "Employee not found" });
  res.json(employee);
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  const employee = await Employee.findByIdAndDelete(id);
  if (!employee) return res.status(404).json({ message: "Employee not found" });
  res.json({ message: "Employee deleted" });
};

exports.searchByDepartment = async (req, res) => {
  const { department } = req.query;
  const employees = await Employee.find({ department });
  res.json(employees);
};
