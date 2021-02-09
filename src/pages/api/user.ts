import auth0 from '../../utils/auth0';
import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import { deserializeArtists, sortArtists } from '../../utils/ArtistHelpers';
import { UserDTO, User } from '../../models/User';
import { IClaims } from '@auth0/nextjs-auth0/dist/session/session';

export default auth0.requireAuthentication(async function loadUserData(req, res) {
  const { user } = await auth0.getSession(req);

  const db = await open({ filename: './tourDB.sqlite', driver: sqlite3.Database });

  if (req.method === 'PUT') {
    updateUserArtists(req, user, db);
  }

  const loadedUserDeserialized = await getUserData(user, db);
  res.json(loadedUserDeserialized);

});

const getUserData = async (user: IClaims, db: Database): Promise<User> => {
  const loadedUser = await db.get<UserDTO>('SELECT * FROM User WHERE name = ?', user.name);
  return deserializeArtists(loadedUser);
}

const updateUserArtists = async (req, user, db: Database) => {
  const statement = await db.prepare(
    'UPDATE User SET selectedArtists = ?, defaultSelectedArtists = ? WHERE name = ?'
  );
  const result = await statement.run(
    JSON.stringify(sortArtists(req.body.value)),
    JSON.stringify(sortArtists(req.body.value)),
    user.name
  );
}