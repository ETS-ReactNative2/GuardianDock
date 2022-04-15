import React from 'react';
import { DefaultTheme, ThemeProvider as Provider } from 'react-native-paper';

import CustomHeader from './components/CustomHeader';

import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";

import CustomDrawerContent from "./components/CustomDrawerContent";

import PvEStatsPage from "./views/PvETracker";
import Accueil from "./views/HomePage";

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'white',
    },
};

const SideMenu = createDrawerNavigator();

function App() {
    return (
        <Provider theme={theme}>
            <NavigationContainer>
                <SideMenu.Navigator
                    drawerContent={(props) => {
                        return (<CustomDrawerContent {...props} />);
                    }}
                    screenOptions={{
                        headerTintColor: '#404554', headerTitleStyle: {fontWeight: 'bold'},
                        header: (props) => {
                            return <CustomHeader {...props} />;
                        }
                    }}
                >
                    <SideMenu.Screen name='home' component={Accueil}/>
                    <SideMenu.Screen name='PvETracker' component={PvEStatsPage}/>
                </SideMenu.Navigator>
            </NavigationContainer>
        </Provider>
    );
}

export default App;
