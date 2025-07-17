const userDB = {
  users: require('../../models/user.json'),
  setUsers: function (data) {this.users = data; }
}
const fsPromises = require('fs').promises;
const path = require('path');

const handleLogout = async (req, res) => {
  // On client, also delete the access token

  const cookies = req.cookies;
  console.log(cookies);
  if (!cookies?.jwt) return res.sendStatus(401); 
  console.log(cookies.jwt);
  const refreshToken = cookies.jwt;

  const foundUser = userDB.users.find(user => user.refreshToken === refreshToken);
  if (!foundUser) return res.sendStatus(403); // Forbidden
  // evaluate jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err) {
        console.log(err);
        return res.sendStatus(403); // Forbidden
      }
      // delete refreshToken from the user
      const otherUsers = userDB.users.filter(user => user.refreshToken !== refreshToken);
      userDB.setUsers(otherUsers);
      fsPromises.writeFile(
        path.join(__dirname, '../../models/user.json'),
        JSON.stringify(userDB.users)
      ).catch(err => console.error(err));

      res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true }); // clear cookie
      res.sendStatus(204); // No Content
    }