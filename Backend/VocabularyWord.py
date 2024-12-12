# to access the database and retreive from the database
import pymysql

conn = pymysql.connect(
    host='localhost',
    user='root',
    password='littleCaesars',
    db='japanese',
    charset='utf8mb4',
    cursorclass=pymysql.cursors.DictCursor
)

def retreive_words():
    try:
        with conn.cursor() as cursor:
            sql = "SELECT * FROM japanese.words"
            cursor.execute(sql)

            rows = cursor.fetchall()

            for row in rows:
                print(row)
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
