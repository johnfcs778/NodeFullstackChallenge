const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(':memory:');

interface User {
    id: number;
    name: string;
    email: string;
    password: string;
  }

db.serialize(() => {
  db.run('CREATE TABLE users (info TEXT)');

  const stmt = db.prepare('INSERT INTO users VALUES (?)');
  for (let i = 0; i < 5; i++) {
    const user: User = {
        id: 1,
        name: 'John Smith',
        email: 'john@example.com',
        password: 'password123'
      };
    stmt.run({i: JSON.stringify(user)});
  }
  stmt.finalize();

  db.each('SELECT rowid AS id, info FROM lorem', (err: any, row: any) => {
    console.log(row.id + ': ' + row.info);
  });
});

db.close();
