import React from 'react';
import { css } from 'aphrodite-jss';
import sheet from './HeaderStyles';

import Navbar from './Navbar/Navbar';
import Rates from './Rates/Rates';

function Header() {
    return (
        <header className={css(sheet.header)}>
            <div className="container">
                <div className="logo">Weekends</div>
                <Navbar />
                <Rates />
            </div>
        </header>
    );
}

export default Header;