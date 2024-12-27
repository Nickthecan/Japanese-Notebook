import { Link } from 'react-router-dom';
import "../styles/NavBar.css"

const NavBar = () => {
    return (
        <>
            <div className="nav-bar">
                <h1>Japanese Notebook</h1>
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
                    <li>
                        <Link className="study" to="/study">
                            <h1>Study</h1>
                        </Link>
                    </li>
                </ul>
            </div>
        </>
    );
}

export default NavBar;