const sqlite3 = require('sqlite3');
const sqlite = require('sqlite');

async function setup() {
    const db = await sqlite.open({filename: './tourDB.sqlite', driver: sqlite3.Database });
    await db.migrate({force: true});
    
    const users = await db.all('SELECT * FROM User');
    console.log('ALL USERS', JSON.stringify(users));
}

setup();