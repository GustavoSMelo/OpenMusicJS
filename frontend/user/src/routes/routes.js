import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from '../views/main';
import ChooseLogin from '../views/chooseLogin';
import ChooseSign from '../views/chooseSign';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/login" component={ChooseLogin} />
                <Route exact path="/sign" component={ChooseSign} />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
