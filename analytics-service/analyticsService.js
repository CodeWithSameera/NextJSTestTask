const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Initialize the app
const app = express();
const PORT = 4000;
const cors = require('cors');
app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Allow the client origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allowed methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Allowed headers
    res.setHeader('Access-Control-Allow-Credentials', 'true'); // Allow credentials (if needed)
    res.setHeader('Access-Control-Allow-Origin', '*'); // Allow all origins for debugging
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');

    if (req.method === 'OPTIONS') {
      return res.sendStatus(204); // No Content
    }
  
    next();
});


app.use(bodyParser.json());

// Set up SQLite db
const dbPath = path.join(__dirname, 'analytics.db');
const db = new sqlite3.Database(dbPath);

db.run(`
  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    eventType TEXT NOT NULL,
    userId TEXT NOT NULL,
    timestamp TEXT NOT NULL,
    pageUrl TEXT,
    videoUrl TEXT,
    ip TEXT
  )
`);

function logEvent(event, callback) {
  const query = `INSERT INTO events (eventType, userId, timestamp, pageUrl, videoUrl, ip) VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [event.eventType, event.userId, event.timestamp, event.pageUrl || null, event.videoUrl || null, event.ip || null];
  db.run(query, params, callback);
}

// API to log events
app.post('/api/events', (req, res) => {
  const event = req.body;

  const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

  if (!event.eventType || !event.userId || !event.timestamp) {
    return res.status(400).json({ error: 'Invalid event data' });
  }

  event.ip = ip;

  logEvent(event, (err) => {
    if (err) {
      console.error('Failed to log event:', err.message);
      return res.status(500).json({ error: 'Failed to log event' });
    }
    res.status(201).json({ message: 'Event logged successfully' });
  });
});


// API to retrieve events with pagination
app.get('/api/events', (req, res) => {
    const page = parseInt(req.query.page) || 1; 
    const limit = parseInt(req.query.limit) || 10; 
  
    const offset = (page - 1) * limit; 
  
    const query = `SELECT * FROM events LIMIT ? OFFSET ?`;
    
    db.all(query, [limit, offset], (err, rows) => {
      if (err) {
        console.error('Failed to retrieve events:', err.message);
        return res.status(500).json({ error: 'Failed to retrieve events' });
      }
  
      const countQuery = `SELECT COUNT(*) as totalCount FROM events`;
  
      db.get(countQuery, [], (err, countResult) => {
        if (err) {
          console.error('Failed to get event count:', err.message);
          return res.status(500).json({ error: 'Failed to get event count' });
        }
  
        const totalCount = countResult.totalCount;
  
        res.status(200).json({
          events: rows,
          page,
          limit,
          totalCount,
          totalPages: Math.ceil(totalCount / limit),
        });
      });
    });
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Analytics service running at http://localhost:${PORT}`);
});
