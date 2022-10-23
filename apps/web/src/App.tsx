import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Providers from './Providers';
import Home from './pages/Home';
import MainLayout from './layouts/mainLayout';
import Login from './pages/Login';

function App() {
    return (
        <BrowserRouter>
            <Providers>
                <MainLayout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                    </Routes>
                </MainLayout>
            </Providers>
        </BrowserRouter>
    );
}

export default App;
