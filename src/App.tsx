import "./App.css";
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Admin from "./components/Admin/Admin";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />,
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
