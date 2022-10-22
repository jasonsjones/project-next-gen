function Navbar() {
    return (
        <header className="p-8 text-slate-400 bg-slate-100">
            <nav className="flex">
                <p>&lt;Site Logo&gt;</p>
                <ul className="grow flex gap-6 justify-end">
                    <li>Log in</li>
                    <li>Register</li>
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;
