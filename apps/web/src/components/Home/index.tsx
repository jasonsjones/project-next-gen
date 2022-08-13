import { useState } from 'react';
import reactLogo from '../../assets/react.svg';
import { useAuthContext } from '../../context/authContext';
import Button from '../base/Button';
import LoginForm from '../LoginForm';

function Home(): JSX.Element {
    const [count, setCount] = useState(0);
    const { token } = useAuthContext();

    return (
        <div className="h-screen flex flex-col justify-center items-center gap-8">
            {token ? (
                <>
                    <p className="text-green-700 text-2xl">✅ Login successful.</p>
                    <div className="w-1/4">
                        <p>
                            Token:{' '}
                            <span className="text-sm text-gray-400 break-words">{token}</span>
                        </p>
                    </div>
                </>
            ) : (
                <LoginForm className="w-1/4" />
            )}

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
    );
}

export default Home;