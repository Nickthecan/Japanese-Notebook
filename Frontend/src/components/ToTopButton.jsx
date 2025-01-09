import React, { useEffect, useState } from 'react';
import '../styles/ToTopButton.css';

const ToTopButton = () => {

    const [visible, setVisible] = useState(false);

    const toggleVisibility = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300) {
            setVisible(true);
        }
        else if (scrolled <= 300) {
            setVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
       <button className={`toTopButton ${visible ? 'visible' : ''}`} onClick={scrollToTop}><h1>^</h1></button>
    )
}

export default ToTopButton;