const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../schemas/User');

exports.register = async (req, res) => {
  const { username, password, roles } = req.body;
  if (!username || !password) return res.status(400).json({ message: "Username and password required" });

  const duplicate = await User.findOne({ username });
  if (duplicate) return res.status(409).json({ message: "Username taken" });

  const hashedPwd = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPwd, roles: roles || ["User"] });
  await user.save();
  res.status(201).json({ message: "User registered" });
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign(
    { username: user.username, roles: user.roles },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  res.json({ token });
};
