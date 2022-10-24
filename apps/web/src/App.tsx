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
                <RootLayout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                    </Routes>
                </RootLayout>
            </Providers>
        </BrowserRouter>
    );
}

export default App;
