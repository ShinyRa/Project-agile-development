from gpiozero import Button
import pymysql.cursors
import time

knop  = Button(3)
knop2 = Button(2)


connection = pymysql.connect(host='localhost',
                                             user='bingo',
                                             password='amsta04-bingo',
                                             db='paddatabase',
                                             charset='utf8mb4',
                                             cursorclass=pymysql.cursors.DictCursor)
while True:
        if knop.is_pressed:
            try:
                with connection.cursor() as cursor:
                    sql = "UPDATE buttons SET button1 = 1"
                    cursor.execute(sql)
                    connection.commit()
            finally:
                print("1")
                time.sleep(0.3)
        if knop2.is_pressed:
            try:
                with connection.cursor() as cursor:
                    sql = "UPDATE buttons SET button2 = 1"
                    cursor.execute(sql)
                    connection.commit()
            finally:
                print("2")
                time.sleep(0.3)
