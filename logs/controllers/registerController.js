const usersDB ={
  user: require('../models/user.json'),
  setUsers: function (data) { this.user = data; }
}
const fsPronmises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const { user, pwd } = req.body;
  if (!user || !pwd) return res.status(400).json({ 'message': 'Username and password are required.' });
// check fordublicate usernames in the db
const duplicate = usersDB.user.find(person => person.username === user);
if (duplicate) return res.status(400).json({ 'message': 'Username is already taken.' });
try {
// encrypt the passwword
const hashePwd = await bcrypt.hash(pwd, 10); // salt rounds
// store the new user
const newUser = { "username": user, "password": hashePwd };
usersDB.setUsers([...usersDB.user, newUser]);
await fsPromise.writeFile(
  path.join(__dirname, '../models/user.json'),
  JSON.stringify(usersDB.user)
);
console.log(usersDB.user);
res.status(201).json({ 'success': `New user ${user} created!` });
}

} catch (err) 