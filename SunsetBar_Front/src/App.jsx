import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import Container from "./pages/layout/Container";
import OrderPage from "./pages/Order/OrderPage";
import StartPage from "./pages/Start/StartPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<StartPage />} />
        </Routes>
        <Routes>
          <Route path="/order" element={<OrderPage />} />
        </Routes>
      </Container>
      <Footer />
    </Router>
  );
}

export default App;
