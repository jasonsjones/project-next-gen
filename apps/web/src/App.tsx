import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Providers from './Providers';
import Home from './components/Home';

function App() {
    return (
        <BrowserRouter>
            <Providers>
                <Routes>
                    <Route path="/" element={<Home />} />
                </Routes>
            </Providers>
        </BrowserRouter>
    );
}

export default App;
