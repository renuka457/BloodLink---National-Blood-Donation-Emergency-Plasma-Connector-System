import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import AddDonor from "./pages/AddDonor";
import FindDonor from "./pages/FindDonor";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-donor" element={<AddDonor />} />
        <Route path="/find-donor" element={<FindDonor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
