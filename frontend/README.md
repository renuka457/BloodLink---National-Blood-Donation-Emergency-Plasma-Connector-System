# 🩸 BloodLink

> *Real-time blood and plasma donor matching system with location-based search, blood group compatibility logic, and emergency response features.*

## 📸 Screenshots

<details>
<summary>Click to view screenshots</summary>
<br>

### Home Page
<img src="https://github.com/user-attachments/assets/e4448e93-5dcc-460f-ae5a-cc346d3b0d3f" alt="Home Page" width="100%" />

### Login & Registration
<img src="https://github.com/user-attachments/assets/d65854cb-0d7c-4ca4-b0c6-13449e484622" alt="Login & Registration Page" width="100%" />

### Add Donor Profile
<img src="https://github.com/user-attachments/assets/372434bd-baaa-4b58-ad70-9af8bdad2324" alt="Add Donor Page" width="100%" />

### Find / Search Donor
<img src="https://github.com/user-attachments/assets/24bf58f4-f882-419d-915a-4f6813b988cf" alt="Search Donor Page" width="100%" />

</details>

## 🔍 Problem Statement

During medical emergencies, locating compatible blood or plasma donors quickly in a specific city is critical and time-sensitive. Standard donor databases often lack automatic biological compatibility routing, resulting in critical delays when rare blood groups are needed. BloodLink solves this by offering a location-based search that automatically calculates compatible donor groups alongside exact matches, reducing search time for patients in emergency need.

## ✨ Features

* 🔐 **User Authentication**: Secure registration and login flows for users to manage profiles.
* 📋 **Donor Management**: Add and update donor profiles with medical eligibility validation.
* 📍 **Location-Based Search**: Instantly query active donors filtered by specific cities.
* 🧬 **Smart Blood Compatibility Engine**: Automatically resolves compatible fallback donor groups (e.g., matching O- donors for other groups) based on biological compatibility rules.
* 🛡️ **Health Rule Enforcement**: Restricts donor registration to eligible candidates (Age 18-65 and Weight ≥ 50 kg).

## 🛠️ Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19, React Router, Vite |
| **Styling** | Tailwind CSS (v4) |
| **Backend** | Python, Flask, Flask-CORS |
| **Database** | SQLite |
| **Version Control** | Git & GitHub |

## 🧬 Blood Group Compatibility

BloodLink automatically suggests compatible fallback donors if an exact blood group match is unavailable. Below is the compatibility matrix implemented in the search engine:

| Patient Needs | Compatible Donors |
| :---: | :--- |
| **O-** | O- only |
| **O+** | O-, O+ |
| **A-** | O-, A- |
| **A+** | O-, O+, A-, A+ |
| **B-** | O-, B- |
| **B+** | O-, O+, B-, B+ |
| **AB-** | O-, A-, B-, AB- |
| **AB+** | All groups *(Universal Recipient)* |

## 🚀 How to Run Locally

### Backend Setup

1. Navigate to the root directory and create a virtual environment:
   ```bash
   python -m venv venv
   ```
2. Activate the virtual environment:
   * **Windows:**
     ```bash
     venv\Scripts\activate
     ```
   * **macOS/Linux:**
     ```bash
     source venv/bin/activate
     ```
3. Install backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the Flask development server:
   ```bash
   python app.py
   ```
   *The backend server will run on `http://127.0.0.1:5000`.*

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *The client application will run on `http://localhost:5173`.*

## 📁 Project Structure

```
BloodLink/
├── app.py                # Main Flask backend with all API endpoints
├── database.py           # SQLite database connection setup
├── requirements.txt      # Python dependencies
└── frontend/             # Frontend application root
    ├── src/
    │   ├── main.jsx        # React DOM mounting & entry point
    │   ├── App.jsx         # App router setup
    │   ├── components/
    │   │   └── Navbar.jsx  # Navigation bar
    │   └── pages/
    │       ├── Home.jsx        # Landing dashboard page
    │       ├── Login.jsx       # User login page
    │       ├── Register.jsx    # User registration page
    │       ├── AddDonor.jsx    # Donor profile creation/update page
    │       └── FindDonor.jsx   # Compatibility search & donor view
    ├── vite.config.js      # Vite compilation configuration
    └── package.json        # Frontend NPM script definitions and dependencies
```

## 🔌 API Endpoints

| Method | Endpoint | Description | Request Body / Query Params |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Register a new user | `{ name, email, password }` |
| `POST` | `/login` | Authenticate existing user | `{ email, password }` |
| `POST` | `/add-donor` | Add a new donor to the registry | `{ name, blood_group, city, phone, age, weight, last_donation }` |
| `PUT` | `/update-donor` | Update details of an existing donor | `{ name, blood_group, city, phone, age, weight, last_donation }` |
| `GET` | `/donors` | Fetch all registered donors | None |
| `GET` | `/search-donor` | Search and match compatible donors | Query params: `?blood_group=X&city=Y` |

## 🔮 Future Enhancements & Limitations

* 🔒 **Password Hashing (Known Limitation)**: Passwords are currently stored in plain text in the database for demonstration. Implementing secure hashing (e.g., via `bcrypt` or `argon2`) is a critical security enhancement.
* 📍 **Distance-Based Matching**: Integrate GPS maps to calculate real-world distance between recipients and donors.
* 📩 **SMS/Email Alert System**: Automated real-time alerts for local emergency requests.
* 👮 **Admin Verification Dashboard**: Create a secure panel to verify donor documents.

## 👩‍💻 Author

**Renuka Varankar**  
*Software Engineer | AI & Backend Developer*

## 📄 License

This project was developed for portfolio purposes.
