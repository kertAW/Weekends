import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import Main from './Pages/Main/Main';
import News from './Pages/News/News';

import Header from './Components/Header/Header';
import Footer from './Components/Footer/Footer';

function App() {
    return (
        <BrowserRouter>
            <div className="wrapper">
                <div className="top_wrapper">
                    <Header />
                    <div className="content">
                        <Switch>
                            <Route path="/" exact>
                                <Main />
                            </Route>
                            <Route path="/news" exact>
                                <News />
                            </Route>
                            <Redirect to="/" />
                        </Switch>
                    </div>
                </div>
                <div className="bottom_wrapper">
                    <Footer />
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;