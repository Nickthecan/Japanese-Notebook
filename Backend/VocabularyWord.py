# to access the database and retreive from the database
import pymysql
from flask import Flask, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()
HOST = os.getenv("HOST")
USER = os.getenv("USER")
PASSWORD = os.getenv("PASSWORD")
DB = os.getenv("DB")

app = Flask(__name__)
CORS(app)

def connect_db():
    return pymysql.connect(
        host= HOST,
        user= USER,
        password= PASSWORD,
        db= DB,
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

@app.route('/load_vocabulary_words', methods=["GET"])
def retreive_words():
    conn = connect_db()
    try:
        with conn.cursor() as cursor:
            sql = "SELECT * FROM japanese.words"
            cursor.execute(sql)

            rows = cursor.fetchall()

            return jsonify(rows)
    except Exception as e:
        print(f"Failed to retreive words: {e}")
    finally:
        conn.close()

def add_word(english, japanese, part_of_speech):
    conn = connect_db()
    try:
        with conn.cursor() as cursor:
            sql = "INSERT INTO `japanese.words` (`english`, `japanese`, `partOfSpeech`) VALUES (%s, %s, %s)"
            cursor.execute(sql, (english, japanese, part_of_speech))
        conn.commit()
    except Exception as e:
        print(f"Failed to add word: {e}")
    finally:
        conn.close()

def update_word(id, english, japanese, part_of_speech):
    conn = connect_db()
    try:
        with conn.cursor() as cursor:
            sql = "UPDATE `japanese.words` SET `english` = %s, `japanese` = %s. `partOfSpeech` = %s WHERE `idwords` = %s"
            cursor.execute(sql, (english, japanese, part_of_speech, id))
        conn.commit()
    except Exception as e:
        print(f"Failed to update word: {e}")
    finally:
        conn.close()

def delete_word(id):
    conn = connect_db()
    try:
        with conn.cursor() as cursor:
            sql = "DELETE FROM `japanese.words` WHERE `idwords` = %d"
            cursor.execute(sql, (id))
        conn.commit()
    except Exception as e:
        print(f"Failed to delete word: {e}")
    finally:
        conn.close()

if __name__ == "__main__":
    app.run()
