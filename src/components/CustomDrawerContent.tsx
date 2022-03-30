import React, {useState} from 'react';

import {Image, SafeAreaView, ScrollView, Text, View} from 'react-native';
import {Drawer, Subheading} from 'react-native-paper';
import {DrawerContentComponentProps, DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";

import {DrawerContentItems, screenRouteProps} from '../config/DrawerItems';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View style={{flex: 1}}>
                    <View style={{paddingLeft: 20, backgroundColor: '#222222'}}>
                        <View style={{flexDirection: 'row', marginTop: 15}}>
                            <Image source={require('../../assets/logo-og-nbg.png')} style={{width: '100%', height: 162.5}}/>
                        </View>
                    </View>
                    {DrawerContentItems.map((value, index) => {
                        return (<Drawer.Section key={value.key} title={value.title} style={{marginTop: 15}}>
                                {(value.routes.map((route, indexx) => {
                                    return (<Drawer.Item key={route.routerName} label={route.title} onPress={() => props.navigation.navigate(route.routerName)}/>);
                                }))}
                            </Drawer.Section>)
                    })}
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={{marginBottom: 15, borderTopColor: '#f4f4f4', borderTopWidth: 1, justifyContent: 'center', alignContent: 'center'}}>
                <Subheading  style={{textAlign: 'center'}}>
                    Version 0.0.1
                </Subheading>
            </Drawer.Section>
        </View>
    );
}
