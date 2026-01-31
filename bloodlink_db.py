import sqlite3

DB_NAME = "bloodlink.db"

def connect_db():
    return sqlite3.connect(DB_NAME)

def create_table():
    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS donors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            blood_group TEXT NOT NULL,
            city TEXT NOT NULL,
            phone TEXT NOT NULL
        )
    """)

    conn.commit()
    conn.close()

def add_donor():
    name = input("Enter donor name: ")
    blood_group = input("Enter blood group: ").upper()
    city = input("Enter city: ").lower()
    phone = input("Enter phone number: ")

    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute(
        "INSERT INTO donors (name, blood_group, city, phone) VALUES (?, ?, ?, ?)",
        (name, blood_group, city, phone)
    )

    conn.commit()
    conn.close()
    print("✅ Donor added to database\n")

def search_donor():
    blood_group = input("Enter blood group: ").upper()
    city = input("Enter city: ").lower()

    conn = connect_db()
    cursor = conn.cursor()

    cursor.execute(
        "SELECT name, city, phone FROM donors WHERE blood_group=? AND city=?",
        (blood_group, city)
    )

    results = cursor.fetchall()
    conn.close()

    if results:
        print("\n🩸 Matching Donors:")
        for r in results:
            print(f"- {r[0]} | {r[1].title()} | {r[2]}")
        print()
    else:
        print("❌ No donor found\n")

def menu():
    create_table()

    while True:
        print("---- BloodLink (Database Version) ----")
        print("1. Add Donor")
        print("2. Search Donor")
        print("3. Exit")

        choice = input("Enter choice: ")

        if choice == "1":
            add_donor()
        elif choice == "2":
            search_donor()
        elif choice == "3":
            break
        else:
            print("Invalid choice\n")

menu()
