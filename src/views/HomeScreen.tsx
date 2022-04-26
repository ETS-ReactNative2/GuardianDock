import React from "react";

import {ImageBackground} from "react-native";
import {Heading, Text, VStack, Image} from "native-base";

export default function HomeScreen() {
    return (
        <ImageBackground source={require('../../assets/Pixel3Main.jpg')} style={{ width: '100%', height: '100%'}}>
            <VStack style={{flex: 1, justifyContent: 'center'}}>
                <Image source={require('../../assets/logo-og-nbg.png')} style={{backgroundColor: '#000000a0', width: '100%', height: 162.5}} alt="HomeScreen Background"/>
                <Heading style={{textAlign: 'center', color: 'white'}}>
                    GuardianDock
                </Heading>
                <Text style={{textAlign: 'center', color: 'white'}}>
                    GuardianDock est un trackeur de statistiques pour Destiny 2 et ses services.
                </Text>
            </VStack>
        </ImageBackground>
    );
}
