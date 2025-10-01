import { NavLink, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import History from "./routes/History";

export default function App() {
  return (
    <div className="app">
      <header className="header">
        <nav className="nav">
          <h1 className="brand">GalleryApp</h1>
          <div className="links">
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? "link active" : "link")}
            >
              მთავარი
            </NavLink>
            <NavLink
              to="/history"
              className={({ isActive }) => (isActive ? "link active" : "link")}
            >
              ისტორია
            </NavLink>
          </div>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </main>
    </div>
  );
}
