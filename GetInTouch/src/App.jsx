import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Layout from "./pages/Layout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </>
  );
}

export default App
