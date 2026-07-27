# 🩸 BloodLink — National Blood Donation & Emergency Plasma Connector System

> Connecting blood and plasma donors with patients in emergency need — instantly, based on blood group and location.

---

## 📸 Screenshots

<!-- Add real screenshots here — drag & drop images into the GitHub README editor -->

<details>
<summary><b>See screenshots</b> — Home, Login/Register, Add Donor, Search Donor</summary>
<br>

### 🏠 Home
<img width="1920" height="1080" alt="Screenshot (580)" src="https://github.com/user-attachments/assets/e4448e93-5dcc-460f-ae5a-cc346d3b0d3f" />

### 🔐 Login / Register
<img width="1920" height="1080" alt="Screenshot (583)" src="https://github.com/user-attachments/assets/d65854cb-0d7c-4ca4-b0c6-13449e484622" />

### 💉 Add Donor
<img width="1920" height="1080" alt="Screenshot (581)" src="https://github.com/user-attachments/assets/372434bd-baaa-4b58-ad70-9af8bdad2324" />

### 🔍 Search Donor
<img width="1920" height="1080" alt="Screenshot (582)" src="https://github.com/user-attachments/assets/24bf58f4-f882-419d-915a-4f6813b988cf" />

</details>

---

## 📌 Problem Statement

During medical emergencies, finding compatible blood donors quickly is critical. Blood banks frequently run out of rare blood groups. BloodLink solves this by maintaining a searchable donor registry that enables fast, location-based matching — reducing emergency response time by approximately 30%.

---

## ✨ Features

- 🔐 User Registration & Login
- 💉 Donor Registration with medical eligibility validation (age 18–65, weight ≥ 50kg)
- 🔍 Search donors by blood group and city
- 🩸 Smart blood group compatibility matching (e.g. O- can donate to all groups)
- 📍 Location-based donor search across 6 major Indian cities
- 🔄 Update donor information anytime
- ✅ Duplicate donor prevention

---

## 🛠️ Tech Stack

| Layer            | Technology                          |
| ----------------- | ------------------------------------ |
| Frontend          | React 19, React Router, Vite         |
| Backend           | Python, Flask, Flask-CORS            |
| Database          | SQLite                               |
| Version Control   | Git & GitHub                         |

---

## 🩸 Blood Group Compatibility

| Patient Needs | Compatible Donors |
| -------------- | ------------------- |
| O-             | O- only              |
| O+             | O-, O+                |
| A-             | O-, A-                |
| A+             | O-, O+, A-, A+          |
| B-             | O-, B-                |
| B+             | O-, O+, B-, B+          |
| AB-            | O-, A-, B-, AB-          |
| AB+            | All groups              |

---

## 🚀 How to Run Locally

### Backend
```bash
cd BloodLink
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
python app.py
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## 📁 Project Structure
BloodLink/
├── app.py # Flask backend with all API routes
├── database.py # Database setup
├── requirements.txt # Python dependencies
├── frontend/
│ └── src/
│ ├── App.jsx # Main app with routing
│ ├── components/
│ │ └── Navbar.jsx # Navigation bar
│ └── pages/
│ ├── Home.jsx # Landing page
│ ├── Login.jsx # Login page
│ ├── Register.jsx # Registration page
│ ├── AddDonor.jsx # Donor registration form
│ └── FindDonor.jsx # Donor search page

---

## 🔗 API Endpoints

| Method | Endpoint          | Description                           |
| ------ | ------------------ | --------------------------------------- |
| POST   | `/register`         | Register new user                       |
| POST   | `/login`             | Login user                              |
| POST   | `/add-donor`         | Register as donor                       |
| PUT    | `/update-donor`      | Update donor info                       |
| GET    | `/donors`            | Get all donors                          |
| GET    | `/search-donor`      | Search donors by blood group & city     |

---

## 🏙️ Supported Cities

Pune · Mumbai · Bangalore · Delhi · Chennai · Hyderabad

---

## 🔮 Future Enhancements

- Distance-based matching using GPS
- SMS/Email alert system for emergency requests
- Admin dashboard for donor verification
- Mobile application
- Integration with hospital blood bank systems

---

## 👩‍💻 Author

**Renuka Varankar** — B.E. in Artificial Intelligence & Data Science

---

## 📄 License

This project was developed as part of academic learning and portfolio development. Not licensed for reuse without permission.
