import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../features/authorisation/context/AuthContext";
import LoginPage from "../pages/LoginPage.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import EventsPage from "../pages/EventsPage.jsx";
import Layout from "../shared/ui/Layout/Layout.jsx";
/*import '../shared/styles/global.css';*/
import ProtectedRoute from "../features/authorisation/components/ProtectedRoute.jsx";
import ProfilePage from "../pages/ProfilePage.jsx";

function App() {
  return (
    <>
<AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<LoginPage />} /> {/* path="/" */}
            <Route
              path="EventsPage"
              element={
                <>
            <ProtectedRoute>
                  <EventsPage/>
               </ProtectedRoute>
             </> }
            />
            <Route
              path="ProfilePage"
              element={
                <>
            {/*  <ProtectedRoute>*/}
                  <ProfilePage/>
             {/*  </ProtectedRoute>*/}
             </> }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
   </>
  );
}

export default App;
