import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from '../features/authorisation/context/AuthContext';
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import EventsPage from "../pages/EventsPage.jsx";
import Layout from "../shared/ui/Layout/Layout.jsx";
/*import '../shared/styles/global.css';*/

function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />} /> {/* path="/" */}
          <Route path="RegisterPage" element={<RegisterPage />} />
          <Route path="EventsPage" element={<EventsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
