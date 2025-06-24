import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import GifCreation from "./pages/GifCreationPage";
import Footer from "./components/Footer";
import Header from "./components/Header";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-primary">
        <Header />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/gif" element={<GifCreation />} />
        </Routes>
        <Footer />
      </div>
    </Router>
    );
};

export default App;
