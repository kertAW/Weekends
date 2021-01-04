import React from 'react';
import { css } from 'aphrodite-jss';
import sheet from './RatesStyles';

function Rates() {
    return (
        <div className={css(sheet.rates)}>
            <pre>1 $ = 78    1 E = 80</pre>
        </div>
    );
}

export default Rates;