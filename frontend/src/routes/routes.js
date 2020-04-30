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
import DashboardArtist from '../views/DashboardArtists';
import AddMusic from '../views/addMusic';
import EditMusic from '../views/EditMusic';
import AllMusics4Edit from '../views/allMusics4Edit';
import AddAlbum from '../views/addAlbum';
import AllAlbum4Edit from '../views/allAlbum4edit';
import EditAlbum from '../views/editAlbum';

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
                <Route
                    exact
                    path="/artist/dashboard"
                    render={(props) => (
                        <DashboardArtist
                            {...props}
                            artistID={props.location.state.artistID}
                            artistEmail={props.location.state.artistEmail}
                            name_artistic={props.location.state.name_artistic}
                            avatar={props.location.state.avatar}
                        />
                    )}
                />
                <Route
                    exact
                    path="/add/music"
                    render={(props) => (
                        <AddMusic
                            {...props}
                            artistID={props.location.state.artistID}
                        />
                    )}
                />
                <Route
                    exact
                    path="/edit/music"
                    render={(props) => (
                        <EditMusic
                            {...props}
                            musicID={props.location.state.musicID}
                            name={props.location.state.name}
                            genre={props.location.state.genre}
                        />
                    )}
                />
                <Route
                    exact
                    path="/show/musics/for/edit"
                    render={(props) => (
                        <AllMusics4Edit
                            {...props}
                            artistID={props.location.state.artistID}
                        />
                    )}
                />

                <Route
                    exact
                    path="/add/album"
                    render={(props) => (
                        <AddAlbum
                            {...props}
                            artistID={props.location.state.artistID}
                        />
                    )}
                />
                <Route
                    exact
                    path="/index/album"
                    render={(props) => (
                        <AllAlbum4Edit
                            {...props}
                            artistID={props.location.state.artistID}
                        />
                    )}
                />
                <Route
                    exact
                    path="/edit/album"
                    render={(props) => (
                        <EditAlbum
                            {...props}
                            artistID={props.location.state.artistID}
                            oldName={props.location.state.oldName}
                            oldGenre={props.location.state.oldGenre}
                            oldDescription={props.location.state.oldDescription}
                            idAlbum={props.location.state.idAlbum}
                        />
                    )}
                />
            </Switch>
        </BrowserRouter>
    );
}

export default Routes;
