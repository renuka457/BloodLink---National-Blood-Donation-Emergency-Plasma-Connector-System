donors = []

def add_donor():
    name = input("Enter donor name: ")
    blood_group = input("Enter blood group: ")
    city = input("Enter city: ")
    donors.append({
        "name": name,
        "blood_group": blood_group,
        "city": city
    })
    print("Donor added successfully!\n")

def search_donor():
    blood_group = input("Enter required blood group: ")
    city = input("Enter city: ")

    found = False
    for donor in donors:
        if donor["blood_group"] == blood_group and donor["city"] == city:
            print("Match Found:", donor["name"])
            found = True

    if not found:
        print("No matching donor found.\n")

while True:
    print("1. Add Donor")
    print("2. Search Donor")
    print("3. Exit")

    choice = input("Enter choice: ")

    if choice == "1":
        add_donor()
    elif choice == "2":
        search_donor()
    elif choice == "3":
        print("Exiting BloodLink...")
        break
    else:
        print("Invalid choice\n")
