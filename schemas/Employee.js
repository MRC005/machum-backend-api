const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: String,
  department: String,
  salary: Number,
  hireDate: Date
});

module.exports = mongoose.models.Employee || mongoose.model('Employee', employeeSchema);
