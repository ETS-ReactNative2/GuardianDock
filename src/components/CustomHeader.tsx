import React from "react";
import {Image, SafeAreaView, TouchableOpacity, View} from "react-native";

import {DrawerHeaderProps} from "@react-navigation/drawer";
import {DrawerActions} from "@react-navigation/native";

export default function CustomHeader({navigation}: DrawerHeaderProps) {
    const toggleSideMenu = () => navigation.dispatch(DrawerActions.toggleDrawer);

    return (
        <SafeAreaView style={{backgroundColor: '#222222'}}>
            <View style={{justifyContent: 'space-around', minHeight: 40}}>
                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity onPress={toggleSideMenu} style={{marginLeft: 20, margin: 10}}>
                        <Image source={require('../../assets/menu_hamburger.png')} style={{width: 30, height: 30}}/>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}
