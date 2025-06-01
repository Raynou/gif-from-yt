import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/home";
import GifCreation from "./pages/GifCreationPage";
import Footer from "./components/Footer";
import Header from "./components/Header";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/gif" element={<GifCreation />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
