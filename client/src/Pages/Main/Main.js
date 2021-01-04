import React from 'react';
import { css } from 'aphrodite-jss';
import sheet from './MainStyles';

function Main() {
    return (
        <section className={css(sheet.main)}>
            <div className="container">
                <div className="news">
                    <div className="topNews">
                        <div className="media">
                            media
                        </div>
                        <div className="about">
                            <h2 className="heading">
                                Заголовок
                            </h2>
                            <div className="text-about">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet mollitia sunt ipsa animi dignissimos tempore odit culpa maxime harum? Sapiente illum soluta cupiditate. Aliquid at eveniet labore, voluptas ut voluptatum. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae sunt quod explicabo voluptas porro quos deserunt, natus provident commodi, et optio quia ex quaerat consectetur ad adipisci sed assumenda molestiae? Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dignissimos, aliquam iste repellat reiciendis a vero veritatis ipsam, esse deleniti quos blanditiis officia voluptas laboriosam numquam excepturi quia ab quis ad. Lorem ipsum,di corporis quisquam id, non sint harum. Quod quaerat, facere nisi blanditiis, ducimus nostrum quis, obcaecati earum enim aliquam ipsa in nesciunt?
                            </div>
                        </div>
                    </div>
                    <div className="middleNews">
                        <div className="news">text about</div>
                        <div className="news">text about</div>
                        <div className="news">text about</div>
                        <div className="news">text about</div>
                    </div>
                    <div className="bottomNews">
                        <div className="news">text about</div>
                        <div className="news">text about</div>
                        <div className="news">text about</div>
                        <div className="news">text about</div>
                        <div className="news">text about</div>
                        <div className="news">text about</div>
                    </div>
                    <div className="showAll">                      {/* Костыль */}
                        <div className="ww"></div>
                        <div className="ww"></div>
                        <input type="button" value="Показать все"/>
                        <div className="ww"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Main;