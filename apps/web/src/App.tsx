import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Providers from './Providers';
import Home from './pages/Home';
import RootLayout from './layouts/RootLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import UserProfile from './pages/UserProfile';
import ProtectedRoutes from './components/ProtectedRoutes';

function App() {
    return (
        <BrowserRouter>
            <Providers>
                <Routes>
                    <Route path="/" element={<RootLayout />}>
                        <Route index element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route element={<ProtectedRoutes />}>
                            <Route path="/profile" element={<UserProfile />} />
                        </Route>
                    </Route>
                </Routes>
            </Providers>
        </BrowserRouter>
    );
}

export default App;
