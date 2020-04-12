import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from '../views/main';
import ChooseLogin from '../views/chooseLogin';
import ChooseSign from '../views/chooseSign';
import LoginArtist from '../views/LoginArtist';
import LoginUser from '../views/LoginUser';
import SignUser from '../views/SignUser';
import SignArtist from '../views/SignArtist';
import Home from '../views/HomeUser';
import Profile from '../views/UserProfile';
import Search from '../views/Search';
import ArtistProfile4Public from '../views/ArtistProfile4Public';
import ChangeInfoUser from '../views/ChangeInfoUser';
import LikesUser from '../views/LikesUser';
import Album from '../views/Album';

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
                    render={(props) => (
                        <ArtistProfile4Public
                            idArtist={props.location.state.idArtist}
                            {...props}
                        />
                    )}
                />
                <Route
                    exact
                    path="/edit/profile"
                    render={(props) => (
                        <ChangeInfoUser
                            {...props}
                            oldNameUser={props.location.state.oldNameUser}
                            oldEmailUser={props.location.state.oldEmailUser}
                            oldAvatarUser={props.location.state.oldAvatarUser}
                            idUser={props.location.state.idUser}
                        />
                    )}
                />
                <Route exact path="/likes" component={LikesUser} />
                <Route
                    exact
                    path="/album"
                    render={(props) => (
                        <Album
                            {...props}
                            albumID={props.location.state.albumID}
                            name={props.location.state.name}
                            genre={props.location.state.genre}
                            banner={props.location.state.banner}
                        />
                    )}
                />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
