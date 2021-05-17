/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { drawerItemsMain } from './drawerItemsMain';
import CustomDrawerContent from './CustomDrawerContent.js';
import CustomHeader from './CustomHeader';
import Fortnite from './Fortnite/Fortnite';

const Drawer = createDrawerNavigator();

function HomeScreen() {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home Screen</Text>
        </View>
    );
}

const Stack = createStackNavigator();

function MainDrawerNavigation() {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={(props) => (
                <CustomDrawerContent drawerItems={drawerItemsMain} {...props} />
            )}>
            <Drawer.Screen name="Home" component={HomeScreen} />
            <Drawer.Screen name="Statistiques" component={Fortnite} options={{
                stat: true,
                match: false,
                news: false
            }} />
            <Drawer.Screen name="Match" component={Fortnite} options={{
                stat: false,
                match: true,
                news: false
            }} />
            <Drawer.Screen name="Nouveautés" component={Fortnite} options={{
                stat: false,
                match: false,
                news: true
            }} />
        </Drawer.Navigator>
    );
}

const App: () => React$Node = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerMode: 'screen',
                    headerTintColor: '#404554',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    header: (props) => {
                        return <CustomHeader {...props} />;
                    },
                }}>
                <Stack.Screen name="MainDrawer" component={MainDrawerNavigation} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({});

export default App;
