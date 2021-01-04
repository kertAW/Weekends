import React from 'react';
import { css } from 'aphrodite-jss';
import sheet from './NavbarStyles';

function Navbar(props) {
    return (
        <nav className={css(sheet.navbar)}>
            <div className="links">
                <ul>
                    <li><a href="/" className="link">Главная</a></li>
                    <li><a href="/news" className="link">Новости</a></li>
                    <li><a href="#" className="link">Категории</a></li>
                    <li><a href="#" className="link">Авторизация</a></li>
                </ul>
            </div>
            <div className="searchbar">
                <input
                    type="text"
                    placeholder="Поиск"
                />
                <input
                    type="button"
                    id="submitBtn"
                />
                <label htmlFor="submitBtn">
                    <svg width="31" height="31" viewBox="0 0 31 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.6631 0C5.22342 0 0.00195312 5.22147 0.00195312 11.6612C0.00195312 18.1009 5.22342 23.3224 11.6632 23.3224C14.1395 23.3224 16.436 22.55 18.3238 21.2343L18.3251 21.233L26.9736 29.8815C27.1341 30.042 27.3893 30.0461 27.5539 29.8815L29.8848 27.5506C30.0453 27.3901 30.0371 27.124 29.8834 26.9703L21.2363 18.3232C22.5519 16.434 23.3243 14.1375 23.3243 11.6612C23.3243 5.22147 18.1028 0 11.6631 0ZM11.6631 20.5786C6.73795 20.5786 2.74572 16.5863 2.74572 11.6612C2.74572 6.73604 6.738 2.74382 11.6631 2.74382C16.5882 2.74382 20.5805 6.73604 20.5805 11.6612C20.5805 16.5863 16.5883 20.5786 11.6631 20.5786Z" fill="black"/>
                    </svg>
                </label>
            </div>
        </nav>
    );
}

export default Navbar;