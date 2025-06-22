const bcrypt = require('bcryptjs');
const User = require('../schemas/User');

const handleNewUser = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required' });
  }

  try {
    const duplicate = await User.findOne({ username }).exec();
    if (duplicate) return res.sendStatus(409);

    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPwd,
      roles: ["User"]
    });

    await newUser.save();
    res.status(201).json({ message: `New user ${username} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };
