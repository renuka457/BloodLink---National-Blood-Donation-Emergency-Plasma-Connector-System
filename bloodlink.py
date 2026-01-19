import json

FILE_NAME = "donors.json"

valid_blood_groups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"]
valid_cities = ["pune", "mumbai", "bangalore", "delhi", "chennai", "hyderabad"]

def load_donors():
    try:
        with open(FILE_NAME, "r") as file:
            return json.load(file)
    except FileNotFoundError:
        return []

def save_donors(donors):
    with open(FILE_NAME, "w") as file:
        json.dump(donors, file, indent=4)

donors = load_donors()

def add_donor():
    name = input("Enter donor name: ")
    blood_group = input("Enter blood group: ").upper()
    city = input("Enter city: ").lower()
    phone = input("Enter phone number: ")

    if blood_group not in valid_blood_groups:
        print("❌ Invalid blood group\n")
        return

    if city not in valid_cities:
        print("❌ Service not available in this city\n")
        return

    donors.append({
        "name": name,
        "blood_group": blood_group,
        "city": city,
        "phone": phone
    })

    save_donors(donors)
    print("✅ Donor added successfully!\n")

def search_donor():
    blood_group = input("Enter required blood group: ").upper()
    city = input("Enter city: ").lower()

    matches = [
        d for d in donors
        if d["blood_group"] == blood_group and d["city"] == city
    ]

    if matches:
        print("\n🩸 Matching Donors:")
        for d in matches:
            print(f"- {d['name']} | {d['city'].title()} | {d['phone']}")
        print()
    else:
        print("⚠ No exact match found. Showing nearby donors:\n")
        for d in donors:
            if d["blood_group"] == blood_group:
                print(f"- {d['name']} | {d['city'].title()} | {d['phone']}")
        print()

while True:
    print("---- BloodLink Menu ----")
    print("1. Add Donor")
    print("2. Search Donor")
    print("3. Exit")

    choice = input("Enter choice: ")

    if choice == "1":
        add_donor()
    elif choice == "2":
        search_donor()
    elif choice == "3":
        print("Thank you for using BloodLink.")
        break
    else:
        print("Invalid choice. Try again.\n")
