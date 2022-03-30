import React from 'react';

import CustomHeader from './components/CustomHeader';

import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";

import CustomDrawerContent from "./components/CustomDrawerContent";
import Accueil from "./views/HomePage";

const SideMenu = createDrawerNavigator();

function App() {
    return (
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
            </SideMenu.Navigator>
        </NavigationContainer>
    );
}

export default App;
