import sqlite3
import json
from datetime import datetime

class DatabaseHandler:
    def __init__(self, db_name="messages.db"):
        self.db_name = db_name
        self.init_db()

    def init_db(self):
        with sqlite3.connect(self.db_name) as conn:
            cursor = conn.cursor()
            cursor.execute('''
                CREATE TABLE IF NOT EXISTS messages (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL,
                    message TEXT NOT NULL,
                    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
                )
            ''')
            conn.commit()

    def save_message(self, name, email, message):
        with sqlite3.connect(self.db_name) as conn:
            cursor = conn.cursor()
            cursor.execute(
                'INSERT INTO messages (name, email, message) VALUES (?, ?, ?)',
                (name, email, message)
            )
            conn.commit()
            return cursor.lastrowid

    def get_all_messages(self):
        with sqlite3.connect(self.db_name) as conn:
            conn.row_factory = sqlite3.Row
            cursor = conn.cursor()
            cursor.execute('SELECT * FROM messages ORDER BY timestamp DESC')
            messages = cursor.fetchall()
            return [dict(row) for row in messages]

    def delete_message(self, message_id):
        with sqlite3.connect(self.db_name) as conn:
            cursor = conn.cursor()
            cursor.execute('DELETE FROM messages WHERE id = ?', (message_id,))
            conn.commit()
            return cursor.rowcount > 0
