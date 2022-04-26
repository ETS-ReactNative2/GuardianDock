import React from 'react';
import {
    NativeBaseProvider,
    Box,
} from 'native-base';
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "./src/components/CustomDrawerContent";
import HomeScreen from "./src/views/HomeScreen";
import CustomHeader from "./src/components/CustomHeader";

const SideMenu = createDrawerNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <NativeBaseProvider>
                <Box safeArea flex={1}>
                    <SideMenu.Navigator
                        drawerContent={(props) => {
                            return (<CustomDrawerContent {...props} />);
                        }}
                        screenOptions={{
                            header: (props) => {
                                return (<CustomHeader {...props} />);
                            }
                        }}
                    >
                        <SideMenu.Screen name='home' component={HomeScreen}/>
                    </SideMenu.Navigator>
                </Box>
            </NativeBaseProvider>
        </NavigationContainer>
    );
};

export default App;
