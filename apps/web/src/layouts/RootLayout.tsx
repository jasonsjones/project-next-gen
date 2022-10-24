import React from 'react';
import Navbar from '../components/Navbar';

function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="flex-grow flex-shrink-0">{children}</div>
            <footer className="p-8 text-slate-400 bg-slate-100">&lt;Footer&gt;</footer>
        </div>
    );
}

export default RootLayout;
