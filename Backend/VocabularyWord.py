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

conn = pymysql.connect(
    host= HOST,
    user= USER,
    password= PASSWORD,
    db= DB,
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor
)

@app.route('/load_vocabulary_words', methods=["GET"])
def retreive_words():
    try:
        with conn.cursor() as cursor:
            sql = "SELECT * FROM japanese.words"
            cursor.execute(sql)

            rows = cursor.fetchall()

            return jsonify(rows)
    finally:
        conn.close()

def add_word(english, japanese, part_of_speech):
    try:
        with conn.cursor() as cursor:
            sql = "INSERT INTO `japanese.words` (`english`, `japanese`, `partOfSpeech`) VALUES (%s, %s, %s)"
            cursor.execute(sql, (english, japanese, part_of_speech))
        conn.commit()

    finally:
        conn.close()

# todo 
# find out how to update the words just in case the user wants to update something
def update_word(id, english, japanese, part_of_speech):
    try:
        with conn.cursor() as cursor:
            sql = "UPDATE `japanese.words` SET "
        conn.commit()

    finally:
        conn.close()

def delete_word(id):
    try:
        with conn.cursor() as cursor:
            sql = "DELETE FROM `japanese.words` WHERE `idwords` = %d"
            cursor.execute(sql, (id))
        conn.commit()

    finally:
        conn.close()



if __name__ == "__main__":
    app.run(debug=True)
