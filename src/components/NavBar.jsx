import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <>
            <div className="nav-bar">
                <ul className="links">
                    <li>
                        <Link className="home" to="/">
                            <h1>Home</h1>
                        </Link>
                    </li>
                    <li>
                        <Link className="vocabulary" to="/vocabulary-words">
                            <h1>Vocabulary</h1>
                        </Link>
                    </li>
                    <li></li>
                </ul>
            </div>
        </>
    );
}

export default NavBar;