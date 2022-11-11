import reactLogo from '../../assets/react.svg';

function HomeBanner(): JSX.Element {
    return (
        <div className="pt-8 flex flex-col justify-center items-center gap-8">
            <h1 className="text-5xl text-purple-800">Project Next Gen</h1>
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
            <h2 className="text-4xl">Vite + React</h2>
            <div className="p-2 flex flex-col gap-2 items-center">
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="text-slate-500">Click on the Vite and React logos to learn more</p>
        </div>
    );
}

export default HomeBanner;
