import React from "react";

import {Image, ImageBackground, View} from "react-native";
import {Title, Paragraph} from 'react-native-paper';

export default function Accueil() {
    return (
        <ImageBackground source={require('../../assets/Pixel3Main.jpg')} style={{ width: '100%', height: '100%'}}>
            <View style={{flex: 1, justifyContent: 'center'}}>
                <Image source={require('../../assets/logo-og-nbg.png')} style={{backgroundColor: '#000000a0', width: '100%', height: 162.5}}/>
                <Title style={{textAlign: 'center', color: 'white'}}>GuardianDock</Title>
                <Paragraph style={{textAlign: 'center', color: 'white'}}>GuardianDock est un trackeur de statistiques pour Destiny 2 et ses services.</Paragraph>
            </View>
        </ImageBackground>
    );
}
