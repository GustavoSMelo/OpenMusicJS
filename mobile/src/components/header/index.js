import React from 'react';
import { Navigation, Figure } from './style';
import DarkMode from '../../styles/themes/dark';
import LightMode from '../../styles/themes/light';
import { TouchableOpacity, AsyncStorage } from 'react-native';
import Logo from '../../../assets/logo.png';
import Icons from 'react-native-vector-icons/FontAwesome';
import { Updates } from 'expo';

function Header(props) {
    async function setTheme() {
        const theme = await AsyncStorage.getItem('Theme');

        if (theme === 'DarkMode') {
            await AsyncStorage.setItem('Theme', 'LightMode');
            return Updates.reload();
        }
        await AsyncStorage.setItem('Theme', 'DarkMode');
        return Updates.reload();
    }

    function Layout() {
        if (props.theme === 'DarkMode') {
            return (
                <Navigation
                    backgroundcolor={DarkMode.backgroundcolor}
                    color={DarkMode.color}
                >
                    <Figure source={Logo} />
                    <TouchableOpacity onPress={() => setTheme()}>
                        <Icons name="sun-o" size={30} color={DarkMode.color} />
                    </TouchableOpacity>
                </Navigation>
            );
        }
        return (
            <Navigation
                backgroundcolor={LightMode.backgroundcolor}
                color={LightMode.color}
            >
                <Figure source={Logo} />
                <TouchableOpacity onPress={() => setTheme()}>
                    <Icons name="moon-o" size={30} color={LightMode.color} />
                </TouchableOpacity>
            </Navigation>
        );
    }
    return Layout();
}

export default Header;
