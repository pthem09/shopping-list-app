# Shopping List App

Hosting link: https://pthem09.github.io/shopping-list-app

## Project overview

- Developed by Paul Them, 2024

- The website allows users to enter a wishlist. Entries are stored in a public SQL database and are visible by anyone and accessible from any machine.

  - When many items are added to the list, it may become cumbersome to scroll through. Additional functionality allows users to select the number of items displayed on the screen.
  - Dropdown menus appear as needed to allow users to go to the next or previous page, or jump to a specific page.
  - The current displayed page will change as items are added and deleted, as necessary.

- Technologies used:

    - HTML
    - CSS
    - JavaScript
    - SQL (CodeSandbox)
    - Express.js
    - Node.js
- Ideas for improvements:
 1. Create a log-in page to allow users to view and edit only their items.
 2. Allow users to view and restore recently deleted items by creating a deleted flag in the SQL database. Also, allow for users to permanently delete items from the recycle bin.
 3. Allow users to select dark mode and different color schemes.

## User stories

```
As a grocery shopper
I want to make a list of the items I need
so that I have all the food I need for the week.

As an avid reader 
I want to keep track of new books
so that I am prepared for my next book club meeting.

As a traveler
I want to make a list of the things I need to pack
so that I have everything I need on my vacation.
```

### Server side code (Code Sandbox)
Link: https://codesandbox.io/p/devbox/node-express-hn7jn8?file=%2Findex.js

```
import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";

const app = express();
const port = process.env.PORT || 8080;
let db = null;

// cors elimination middleware
app.use(cors());

// post request handling
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

function dbSetup(doInsert) {
  if (db === null) {
    return;
  }

  db.run(`
    CREATE TABLE IF NOT EXISTS ShoppingList (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      item TEXT NOT NULL,
      quantity INTEGER NOT NULL
    );
  `);

  if (doInsert) {
    db.run(`
      INSERT INTO ShoppingList (item, quantity)
      VALUES ("Eggs", 12), ("Milk", 2);
    `);
  }
}

function appStartedCallback() {
  console.log("App is listening on port " + port);
  db = new sqlite3.Database("shopping_list.db");
  dbSetup(true);
}

app.listen(port, appStartedCallback);

app.get("/", (req, res) => {
  res.status(200).json({ status: true });
});

app.get("/api/list", (req, res) => {
  db.all("SELECT * FROM ShoppingList", (error, rows) => {
    if (error) {
      res.status(500).json({ error });
    } else {
      res.status(200).json(rows);
    }
  });
});

app.post("/api/list/new", (req, res) => {
  db.run(
    `
    INSERT INTO ShoppingList (item, quantity)
    VALUES (?, ?);
  `,
    [req.body.item, req.body.quantity],
    (error, response) => {
      if (error) {
        res.status(500).json({ error });
      } else {
        res.status(201).json({ response });
      }
    },
  );
});

app.delete("/api/list/:id", (req, res) => {
  db.run(
    `
    DELETE FROM ShoppingList
    WHERE id = ?
  `,
    [req.params.id],
    (error, _response) => {
      if (error) {
        res.status(500).json({ error });
      } else {
        res.status(200).json({ status: true });
      }
    },
  );
});

app.put("/api/list/:id", (req, res) => {
  db.run(
    `
      UPDATE ShoppingList
      SET item = ?, quantity = ?
      WHERE id =?
    `,
    [req.body.item, req.body.quantity, req.params.id],
    (error, _response) => {
      if (error) {
        res.status(500).json({ error });
      } else {
        res.status(201).json({ status: true });
      }
    },
  );
});
```