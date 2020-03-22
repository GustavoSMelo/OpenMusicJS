import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from '../views/main';
import ChooseLogin from '../views/chooseLogin';
import ChooseSign from '../views/chooseSign';
import LoginArtist from '../views/LoginArtist';
import LoginUser from '../views/LoginUser';
import SignUser from '../views/SignUser';
import SignArtist from '../views/SignArtist';
import Home from '../views/Home';
import Profile from '../views/profile';
import Search from '../views/Search';
import ArtistProfile4Public from '../views/ArtistProfile4Public';

function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Main} />
                <Route exact path="/login" component={ChooseLogin} />
                <Route exact path="/sign" component={ChooseSign} />
                <Route exact path="/login/artist" component={LoginArtist} />
                <Route exact path="/login/user" component={LoginUser} />
                <Route exact path="/sign/user" component={SignUser} />
                <Route exact path="/sign/artist" component={SignArtist} />
                <Route exact path="/home" component={Home} />
                <Route exact path="/profile" component={Profile} />
                <Route exact path="/search" component={Search} />
                <Route
                    exact
                    path="/artist/profile/public"
                    render={props => (
                        <ArtistProfile4Public
                            idArtist={props.location.state.idArtist}
                            {...props}
                        />
                    )}
                />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
