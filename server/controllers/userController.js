const createUser = async (req, res) => {
  const emailExists = await User.findOne({ email: req.body.email });

  if (emailExists) return res.status(400).send("Email already exists");

  const usernameExists = await User.findOne({ username: req.body.username });

  if (usernameExists) return res.status(400).send("Username already exists");

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const hasheduser = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashPassword,
  });

  try {
    const saveduser = await User.create(hasheduser);
    res.status(201).json(saveduser);
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const loginUser = async (req, res) => {
  const user = await User.findOne({
    username: req.body.username,
  });
  if (!user) return res.status(400).send("Invalid username");

  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass) return res.status(400).send("Invalid password");

  const token = jwt.sign({ name: user.username }, "sfsfs");
  try {
    res.send({ token: token });
  } catch (error) {
    res.send("Incorrect login details");
  }
};

module.exports = {
  loginUser,
  createUser,
};
