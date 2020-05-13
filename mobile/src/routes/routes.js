import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Welcome from '../screens/WelcomeView';
import Register from '../screens/Register';
import Home from '../screens/Home';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabRoute() {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home} />
        </Tab.Navigator>
    );
}

function Routes() {
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
