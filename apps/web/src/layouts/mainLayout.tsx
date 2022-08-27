import React from 'react';

function MainLayout({ children }: { children: React.ReactNode }): JSX.Element {
    return (
        <div className="flex flex-col h-screen">
            <nav className="p-8 text-slate-400 bg-slate-100">&lt;Navbar&gt;</nav>
            <div className="flex-grow flex-shrink-0">{children}</div>
            <footer className="p-8 text-slate-400 bg-slate-100">&lt;Footer&gt;</footer>
        </div>
    );
}

export default MainLayout;
