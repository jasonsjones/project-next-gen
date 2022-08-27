import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Providers from './Providers';
import Home from './pages/Home';
import MainLayout from './layouts/mainLayout';

function App() {
    return (
        <BrowserRouter>
            <Providers>
                <MainLayout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </MainLayout>
            </Providers>
        </BrowserRouter>
    );
}

export default App;
