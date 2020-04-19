import auth0 from '../../utils/auth0';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import { deserializeArtists } from '../../utils/ArtistHelpers';
import { UserDTO } from '../../models/User';

export default auth0.requireAuthentication(async function loadUserData(req, res) {
    const { user } = await auth0.getSession(req);
    
    const db = await open({filename: './tourDB.sqlite', driver: sqlite3.Database });
    const loadedUser = await db.get<UserDTO>('SELECT * FROM User WHERE name = ?', user.name);
    const loadedUserDeserialized = deserializeArtists(loadedUser);

    res.json(loadedUserDeserialized);

  });