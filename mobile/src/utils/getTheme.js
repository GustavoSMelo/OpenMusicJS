import { AsyncStorage } from 'react-native';

async function getTheme() {
    const Theme = await AsyncStorage.getItem('Theme');

    return Theme;
}

export default getTheme;
