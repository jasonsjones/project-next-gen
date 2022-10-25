import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Providers from './Providers';
import Home from './pages/Home';
import RootLayout from './layouts/RootLayout';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
    return (
        <BrowserRouter>
            <Providers>
                <Routes>
                    <Route path="/" element={<RootLayout />}>
                        <Route index element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Route>
                </Routes>
            </Providers>
        </BrowserRouter>
    );
}

export default App;
