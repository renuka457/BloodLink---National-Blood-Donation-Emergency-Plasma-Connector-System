from flask import Flask, request, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)
app.config['CORS_HEADERS'] = 'Content-Type'

DB_NAME = "database.db"

COMPATIBILITY = {
    "O-":  ["O-", "O+", "A-", "A+", "B-", "B+", "AB-", "AB+"],
    "O+":  ["O+", "A+", "B+", "AB+"],
    "A-":  ["A-", "A+", "AB-", "AB+"],
    "A+":  ["A+", "AB+"],
    "B-":  ["B-", "B+", "AB-", "AB+"],
    "B+":  ["B+", "AB+"],
    "AB-": ["AB-", "AB+"],
    "AB+": ["AB+"],
}

def get_connection():
    conn = sqlite3.connect(DB_NAME)
    conn.row_factory = sqlite3.Row
    return conn

def create_tables():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS donors (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            blood_group TEXT NOT NULL,
            city TEXT NOT NULL,
            phone TEXT NOT NULL UNIQUE,
            age INTEGER,
            weight INTEGER,
            last_donation TEXT
        )
    """)
    conn.commit()
    conn.close()

create_tables()

# ----------------------------
# Add Donor
# ----------------------------
@app.route('/add-donor', methods=['POST'])
def add_donor():
    data = request.json
    name = data.get('name', '').strip()
    blood_group = data.get('blood_group', '').strip().upper()
    city = data.get('city', '').strip().title()
    phone = data.get('phone', '').strip()
    age = data.get('age')
    weight = data.get('weight')
    last_donation = data.get('last_donation')

    if not name or not blood_group or not city or not phone or not age or not weight:
        return jsonify({"error": "All required fields must be filled"}), 400
    if int(age) < 18 or int(age) > 65:
        return jsonify({"error": "Donor age must be between 18 and 65"}), 400
    if int(weight) < 50:
        return jsonify({"error": "Donor weight must be at least 50 kg"}), 400

    conn = get_connection()
    cursor = conn.cursor()

    existing = cursor.execute("SELECT id FROM donors WHERE phone = ?", (phone,)).fetchone()
    if existing:
        conn.close()
        return jsonify({"error": "Already registered.", "already_registered": True}), 400

    cursor.execute(
        "INSERT INTO donors (name, blood_group, city, phone, age, weight, last_donation) VALUES (?, ?, ?, ?, ?, ?, ?)",
        (name, blood_group, city, phone, int(age), int(weight), last_donation)
    )
    conn.commit()
    conn.close()
    return jsonify({"message": "Donor added successfully"})

# ----------------------------
# Update Donor
# ----------------------------
@app.route('/update-donor', methods=['PUT'])
def update_donor():
    data = request.json
    name = data.get('name', '').strip()
    blood_group = data.get('blood_group', '').strip().upper()
    city = data.get('city', '').strip().title()
    phone = data.get('phone', '').strip()
    age = data.get('age')
    weight = data.get('weight')
    last_donation = data.get('last_donation')

    if not name or not blood_group or not city or not phone or not age or not weight:
        return jsonify({"error": "All required fields must be filled"}), 400
    if int(age) < 18 or int(age) > 65:
        return jsonify({"error": "Donor age must be between 18 and 65"}), 400
    if int(weight) < 50:
        return jsonify({"error": "Donor weight must be at least 50 kg"}), 400

    conn = get_connection()
    cursor = conn.cursor()
    existing = cursor.execute("SELECT id FROM donors WHERE phone = ?", (phone,)).fetchone()
    if not existing:
        conn.close()
        return jsonify({"error": "No donor found with this phone number."}), 404

    cursor.execute("""
        UPDATE donors SET name=?, blood_group=?, city=?, age=?, weight=?, last_donation=?
        WHERE phone=?
    """, (name, blood_group, city, int(age), int(weight), last_donation, phone))
    conn.commit()
    conn.close()
    return jsonify({"message": "Donor updated successfully"})

# ----------------------------
# Get All Donors
# ----------------------------
@app.route('/donors', methods=['GET'])
def get_donors():
    conn = get_connection()
    donors = conn.execute("SELECT * FROM donors").fetchall()
    conn.close()
    return jsonify([{
        "id": d["id"], "name": d["name"], "blood_group": d["blood_group"],
        "city": d["city"], "phone": d["phone"],
        "age": d["age"], "weight": d["weight"], "last_donation": d["last_donation"]
    } for d in donors])

# ----------------------------
# Search Donor with compatibility
# ----------------------------
@app.route('/search-donor', methods=['GET'])
def search_donor():
    blood_group = request.args.get('blood_group', '').strip().upper()
    city = request.args.get('city', '').strip().title()

    if not blood_group or not city:
        return jsonify({"error": "blood_group and city are required"}), 400

    conn = get_connection()
    all_donors = conn.execute("SELECT * FROM donors").fetchall()
    conn.close()

    compatible_groups = [bg for bg, can_donate_to in COMPATIBILITY.items() if blood_group in can_donate_to]

    results = []
    seen_ids = set()

    for d in all_donors:
        if d["blood_group"] == blood_group and d["city"] == city:
            results.append({
                "id": d["id"], "name": d["name"],
                "blood_group": d["blood_group"], "city": d["city"],
                "phone": d["phone"], "age": d["age"], "match_type": "exact"
            })
            seen_ids.add(d["id"])

    for d in all_donors:
        if d["id"] not in seen_ids and d["blood_group"] in compatible_groups and d["blood_group"] != blood_group:
            results.append({
                "id": d["id"], "name": d["name"],
                "blood_group": d["blood_group"], "city": d["city"],
                "phone": d["phone"], "age": d["age"], "match_type": "compatible"
            })
            seen_ids.add(d["id"])

    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True)
