# to access the database and retreive from the database
import pymysql
from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os


""" 
IF THERE IS A FUCKING BUG IN THE CODE AND YOU ARE FIXING THE BACKEND, REFRESH THE FILE, RUN THAT SHIT AGAIN PLEASESEEEEEEEE
I HAD TO DEBUG SOMETHING THAT WAS ALREADY WORKING BUT I JUST NEVER RERAN THE CODE, I THOUGHT THAT THIS WAS FRONTEND DEBUGGING 
WHERE A SIMPLE CTRL S FIXES EVERYTHING. I GUESS NOT AND THIS IS A VERY GOOD LEARNING EXPERIENCE FOR ME !!!!!!!!!


AHHH JUST DO CTRL R INSTEAD OF JUST CTRL S
"""


load_dotenv()
HOST = os.getenv("HOST")
USER = os.getenv("USER")
PASSWORD = os.getenv("PASSWORD")
DB = os.getenv("DB")

#flask app
app = Flask(__name__)
CORS(app)

#function to connect to the db
def connect_db():
    return pymysql.connect(
        host= HOST,
        user= USER,
        password= PASSWORD,
        db= DB,
        charset='utf8mb4',
        cursorclass=pymysql.cursors.DictCursor
    )

#retreive words from the db
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

#adds a word into the db
@app.route('/add_vocabulary_word', methods=["POST"])
def add_word():
    conn = connect_db()
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "no data provided"}), 400
        
        english = data.get("english")
        japanese = data.get("japanese")
        part_of_speech = data.get("partOfSpeech")
        vocabulary_chapter = int(data.get("chapterNumber", 0))
        vocabulary_chapter_name = data.get("chapterName")

        if not all([english, japanese, part_of_speech, vocabulary_chapter, vocabulary_chapter_name]):
            return jsonify({"error": "not all fields filled out"}), 400
        with conn.cursor() as cursor:
            sql = "INSERT INTO `words` (`english`, `japanese`, `partOfSpeech`, `vocabularyChapter`, `vocabularyChapterName`) VALUES (%s, %s, %s, %s, %s)"
            cursor.execute(sql, (english, japanese, part_of_speech, vocabulary_chapter, vocabulary_chapter_name))
            id = cursor.lastrowid
            print(f"Inserted word ID: {id}")
        conn.commit()

        return jsonify({
            "message": "word added successfully",
            "word": {
                "idwords": id,
                "english": english, 
                "japanese": japanese,
                "partOfSpeech": part_of_speech,
                "chapterNumber": vocabulary_chapter, 
                "chapterName": vocabulary_chapter_name
            }
        }), 200
    except Exception as e:
        print(f"Failed to add word: {e}")
        return jsonify({"error": "server error"}), 500
    finally:
        conn.close()

#edits an entry in the db
@app.route('/edit_vocabulary_word', methods=["POST"])
def update_word():
    conn = connect_db()
    try:
        data = request.get_json()
        if not data:
            return jsonify({"error": "no data provided"}), 400
        
        idwords = data.get("idwords")
        english = data.get("english")
        japanese = data.get("japanese")
        part_of_speech = data.get("partOfSpeech")
        vocabulary_chapter = data.get("chapterNumber")
        vocabulary_chapter_name = data.get("chapterName")

        with conn.cursor() as cursor:
            sql = "UPDATE `words` SET `english` = %s, `japanese` = %s, `partOfSpeech` = %s, `vocabularyChapter` = %s, `vocabularyChapterName` = %s WHERE `idwords` = %s"
            cursor.execute(sql, (english, japanese, part_of_speech, vocabulary_chapter, vocabulary_chapter_name, idwords))
        conn.commit()

        return jsonify({
            "message": "word added successfully",
            "word": {
                "idwords": idwords,
                "english": english, 
                "japanese": japanese,
                "partOfSpeech": part_of_speech,
                "chapterNumber": vocabulary_chapter, 
                "chapterName": vocabulary_chapter_name
            }
        }), 200
    except Exception as e:
        print(f"Failed to update word: {e}")
        return jsonify({"error": "server error"}), 500
    finally:
        conn.close()

#deletes a certain entry in the db
@app.route('/delete_vocabulary_word', methods=["DELETE"])
def delete_word():
    conn = connect_db()
    try:
        id = request.args.get("idwords")
        if not id:
            return jsonify({"error": "no data provided"}), 400
        
        with conn.cursor() as cursor:
            sql = "DELETE FROM `words` WHERE `idwords` = %s"
            cursor.execute(sql, (id,))
        conn.commit()
        return jsonify({"message": "deleted word successfully"}), 200
    except Exception as e:
        print(f"Failed to delete word: {e}")
        return jsonify({"error": "server error"}), 500
    finally:
        conn.close()

#main function to run the backend
if __name__ == "__main__":
    app.run(debug=True)
