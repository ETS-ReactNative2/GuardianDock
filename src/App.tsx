import React from 'react';
import {StatusBar, Text, View,} from 'react-native';

import CustomHeader from './components/CustomHeader';

import {NavigationContainer} from "@react-navigation/native";
import {createDrawerNavigator} from "@react-navigation/drawer";
import Accueil from "./views/HomePage";

const Stack = createDrawerNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerTintColor: '#404554', headerTitleStyle: {fontWeight: 'bold'},
                    header: (props) => {
                        return <CustomHeader {...props} />;
                    }
                }}
            >
                <Stack.Screen name='Accueil' component={Accueil}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
