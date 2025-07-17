consst usersDB = {
  users:require('../model/users.json'),
  setUsers: function(data) { this.users = data; }
}
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });

  // Check for duplicate username in the database
  const foundUser = usersDB.users.find(person => person.username === user);
  if (!foundUser) return res.sendStatus(401); // Unauthorized

  // Evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    res.json({ 'success': `User ${user} is logged in!` });
  } else {
    res.sendStatus(401); // Unauthorized
  }
}

const accessToken = jwt.sign(
  { 'username': foundUser.username },
  process.env.ACCESS_TOKEN_SECRET,
  { expiresIn: '30s' }
);
const refreshToken = jwt.sign(
  { 'username': foundUser.username },
  process.env.REFRESH_TOKEN_SECRET,
  { expiresIn: '1d' }
);
const otherUsers = usersDB.users.filter(person => person.username !== foundUser.username);
usersDB.setUsers([...otherUsers, { username: foundUser.username, password: foundUser.password, refreshToken }]);
await fs.promises.writeFile(
  path.join(__dirname, '..', 'model', 'users.json'),  
  JSON.stringify(usersDB.users, null, 2)
  );