import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import reactLogo from './assets/react.svg';
import Button from './components/base/Button';
import LoginForm from './components/LoginForm';

const queryClient = new QueryClient();

function App() {
    const [count, setCount] = useState(0);

    return (
        <QueryClientProvider client={queryClient}>
            <div className="h-screen flex flex-col justify-center items-center gap-8">
                <LoginForm className="w-1/4" />
                <div className="flex gap-8">
                    <a href="https://vitejs.dev" target="_blank">
                        <img
                            src="/vite.svg"
                            className="w-28 h-28 hover:drop-shadow-[0_0_2em_#646cffaa]"
                            alt="Vite logo"
                        />
                    </a>
                    <a href="https://reactjs.org" target="_blank">
                        <img
                            src={reactLogo}
                            className="animate-slow-spin w-28 h-28 hover:drop-shadow-[0_0_2em_#61dafbaa]"
                            alt="React logo"
                        />
                    </a>
                </div>
                <h1 className="text-5xl">Vite + React</h1>
                <div className="p-2 flex flex-col gap-2 items-center">
                    <Button
                        variant="secondary"
                        className="w-1/2"
                        clickAction={() => setCount((count) => count + 1)}
                    >
                        count is {count}
                    </Button>
                    <p>
                        Edit <code>src/App.tsx</code> and save to test HMR
                    </p>
                </div>
                <p className="text-slate-500">Click on the Vite and React logos to learn more</p>
            </div>
        </QueryClientProvider>
    );
}

export default App;
