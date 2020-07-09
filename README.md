<p align="center">
	<img src=".github/logo.png" alt="logo" width="400" />
</p>
<h1 align="center">OpenMusicJS</h1>
<p align="center">
	This Readme was write in english, if you want a portuguese version <a href="/">click here</a>
	<br/>
	(Este "Leia me" foi escrito em ingles, se quiser a versao em portugues <a href="/">click aqui</a>)
	<br />
	App open source to users listen musics for free and artists unknow post yours creations
</p>
<p align="center">
	<img src="https://img.shields.io/github/forks/GustavoSMelo/OpenMusicJS" alt="forks" />
	<img src="https://img.shields.io/github/stars/GustavoSMelo/OpenMusicJS" alt="stars" />
	<img src="https://img.shields.io/github/license/GustavoSMelo/OpenMusicJS" alt="license" />
</p>

# :ship: Navigation menu

- [Web Application Screenshots](#globe_with_meridians-Web-Application-Screenshots)
- [Android App Light](#iphone-Android-App-Light)
- [Android App Dark](#iphone-Android-App-Dark)
- [Run this project](#Run-this-project)
- [About me](#bust_in_silhouette-About-me)

# Website responsive and animations

![CreateAccountArtist](https://user-images.githubusercontent.com/45046288/86982307-4e6c5d80-c15f-11ea-8219-9e98ccc30b2d.gif)

![ResponsiveScreen](https://user-images.githubusercontent.com/45046288/86982624-203b4d80-c160-11ea-8d77-d722f2f76a02.gif)

# :globe_with_meridians: Web Application Screenshots

<p align="center">
	<img src=".github/frontend/ArtistScreen.PNG" alt="ArtistScreen"/>
	<img src=".github/frontend/EditAndInsertMusic.PNG" alt="EditAndInsertMusicScreen"/>
	<img src=".github/frontend/HomeScreen.PNG" alt="HomeScreen"/>
	<img src=".github/frontend/LikeesScreen.PNG" alt="LikesScreen"/>
	<img src=".github/frontend/LoginScreen.PNG" alt="LoginScreen"/>
	<img src=".github/frontend/MainPageArtist.PNG" alt="MainPageArtist"/>
	<img src=".github/frontend/ProfileScreen.PNG" alt="ProfileScreen"/>
	<img src=".github/frontend/SearchScreen.PNG" alt="SearchScreen"/>
</p>

# :iphone: Android App Light

<p align="center">
	<img src=".github/mobile/HomeScreenLight.PNG" width="250px" height="541px" alt="HomeScreenLight"/> &nbsp;&nbsp;&nbsp; <img src=".github/mobile/SearchScreen.PNG" width="250px" height="541px" alt="SearchLight"/> &nbsp;&nbsp;&nbsp; <img src=".github/mobile/LikeScreenLight.PNG" width="250px" height="541px" alt="LikeScreenLight"/>
	<br />
	<img src=".github/mobile/ProfileScreenLight.PNG" width="250px" height="541px" alt="ProfileScreenLight" /> &nbsp;&nbsp;&nbsp; <img src=".github/mobile/PlayerMusicLight.PNG" width="250px" height="541px" alt="PlayerMusic" /> &nbsp;&nbsp;&nbsp; <img src=".github/mobile/ArtistProfileLight.PNG" width="250px" height="541px" alt="ArtistProfileLight" />
</p>

# :iphone: Android App Dark

<p align="center">
	<img src=".github/mobile/HomeScreenDark.PNG" width="250px" height="541px" alt="HomeScreenDark"/> &nbsp;&nbsp;&nbsp; <img src=".github/mobile/SearchScreenDark.PNG" width="250px" height="541px" alt="SearchDark"/> &nbsp;&nbsp;&nbsp; <img src=".github/mobile/LikeScreenDark.PNG" width="250px" height="541px" alt="LikeScreenDark"/>
	<br />
	<img src=".github/mobile/ProfileScreenDark.PNG" width="250px" height="541px" alt="ProfileScreenDark" /> &nbsp;&nbsp;&nbsp; <img src=".github/mobile/PlayerMusicDark.PNG" width="250px" height="541px" alt="PlayerMusic" /> &nbsp;&nbsp;&nbsp; <img src=".github/mobile/ArtistProfileDark.PNG" width="250px" height="541px" alt="ArtistProfileLight" />
</p>

<h2>Tecnologies useds in this project: </h2>

| Backend | Frontend | Mobile       | Database |
| ------- | -------- | ------------ | -------- |
| NodeJS  | ReactJS  | React Native | Postgres |

## Run this project

### :clipboard: Things that you need:

- SGBD (I'm using postgres)
- Node.JS
- Yarn (recommend, but not necessary)
- Expo
- Mobile Emulator (or physical cellphone)

### :file_folder: Backend

- Open the `backend` folder in your terminal.
- Run in your console: `yarn` (in case you use yarn) or `npm install`.
- Create a new folder inside of the `backend` folder and outside the `src` folder called: "tmp".
- Inside of `tmp`, create a new folder called `uploads` and inside of this folder
  create another two folders: `img` and `music`.
- Create a database called "OpenMusicJS".
- Run in your console: `yarn (or npx) sequelize db:migrate`.
- After that, go to `backend` and run `yarn start`.

### :computer: Frontend

- Firstly, you need to do the backend step.
- After that, you need to run `yarn` or `npm install` in your console (inside the `frontend` folder) and run `yarn start` or `npm start`.

### :iphone: Mobile (with Android emulator)

- First, run the backend.
- Open your Android emulator.
- Open the mobile folder in the console.
- Run `yarn` or `npm install`.
- After that, run `expo start` and wait until the application opens.
- When the application opens, enter in the console and click 'A'.

### :iphone: Mobile (with physical cellphone)

- Download the Expo app in your cellphone.
- Enter the Expo app.
- Open the mobile folder in the console.
- Run `yarn` or `npm install`.
- After that, run `expo start` and wait until the application opens.
- When the application opens, scan the QR CODE with your cellphone.

## :bust_in_silhouette: About me

    I am a simple developer that love study and play video games
    if you want to enter in contact with me:

    Email: gsantos15569@gmail.com
    Linkedin: https://www.linkedin.com/in/gustavo-santos-melo-66092317a/

## Make with Love :heartbeat: Gustavo S. Melo
