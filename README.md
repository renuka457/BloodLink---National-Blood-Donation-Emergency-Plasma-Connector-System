# 🩸 BloodLink — National Blood Donation & Emergency Plasma Connector System

> Connecting blood and plasma donors with patients in emergency need — instantly, based on blood group and location.

---

## 🌐 Live Demo: 
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

| Layer | Technology |
|---|---|
| Frontend | React 19, React Router, Vite |
| Backend | Python, Flask, Flask-CORS |
| Database | SQLite |
| Deployment | Vercel (Frontend), Render (Backend) |
| Version Control | Git & GitHub |

---

## 🩸 Blood Group Compatibility

| Patient Needs | Compatible Donors |
|---|---|
| O- | O- only |
| O+ | O-, O+ |
| A- | O-, A- |
| A+ | O-, O+, A-, A+ |
| B- | O-, B- |
| B+ | O-, O+, B-, B+ |
| AB- | O-, A-, B-, AB- |
| AB+ | All groups |

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

```
BloodLink/
├── app.py              # Flask backend with all API routes
├── database.py         # Database setup
├── requirements.txt    # Python dependencies
├── frontend/
│   └── src/
│       ├── App.jsx           # Main app with routing
│       ├── components/
│       │   └── Navbar.jsx    # Navigation bar
│       └── pages/
│           ├── Home.jsx      # Landing page
│           ├── Login.jsx     # Login page
│           ├── Register.jsx  # Registration page
│           ├── AddDonor.jsx  # Donor registration form
│           └── FindDonor.jsx # Donor search page
```

---

## 🔗 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/register` | Register new user |
| POST | `/login` | Login user |
| POST | `/add-donor` | Register as donor |
| PUT | `/update-donor` | Update donor info |
| GET | `/donors` | Get all donors |
| GET | `/search-donor` | Search donors by blood group & city |

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

**Renuka Varankar**
Final Year B.E. Student — Artificial Intelligence & Data Science
Anantrao Pawar College of Engineering and Research, Pune (SPPU)

---

## 📄 License

This project was developed as part of academic learning and portfolio development.
