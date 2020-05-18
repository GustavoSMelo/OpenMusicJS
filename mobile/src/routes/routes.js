import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Welcome from '../screens/WelcomeView';
import Register from '../screens/Register';
import Home from '../screens/Home';
import Profile from '../screens/Profile';
import Search from '../screens/Search';
import Likes from '../screens/Likes';
import Icons from 'react-native-vector-icons/FontAwesome';
import { AsyncStorage } from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
let theme;

async function getTheme() {
    theme = await AsyncStorage.getItem('Theme');
    console.log(theme);
    return;
}

function TabRoute() {
    if (theme == 'DarkMode') {
        console.log('aqui');
        return (
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Home') {
                            iconName = 'home';
                        } else {
                            iconName = 'angellist';
                        }

                        return <Icons name={iconName} size={26} />;
                    },
                })}
            >
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Search" component={Search} />
                <Tab.Screen name="Likes" component={Likes} />
                <Tab.Screen name="Profile" component={Profile} />
            </Tab.Navigator>
        );
    }
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Search" component={Search} />
            <Tab.Screen name="Likes" component={Likes} />
            <Tab.Screen name="Profile" component={Profile} />
        </Tab.Navigator>
    );
}

function Routes() {
    useEffect(() => {
        getTheme();
    }, []);
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Register" component={Register} />
                <Stack.Screen name="Home" component={TabRoute} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default Routes;
