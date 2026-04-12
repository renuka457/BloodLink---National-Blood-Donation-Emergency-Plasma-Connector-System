import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddDonor from "./pages/AddDonor";
import FindDonor from "./pages/FindDonor";
import Navbar from "./components/Navbar";

function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user") || "null"));

  return (
    <BrowserRouter>
      <Navbar user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/add-donor" element={<AddDonor />} />
        <Route path="/find-donor" element={<FindDonor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
