import React, {useState} from 'react';

import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import {Drawer} from 'react-native-paper';
import {DrawerContentComponentProps, DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";

import {DrawerContentItems, screenRouteProps} from '../config/DrawerItems';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View style={{flex: 1}}>
                    {DrawerContentItems.map((value, index) => {
                        return value.routes.length === 1 ?
                            (<Drawer.Section style={{marginTop: 15}}>
                                <Drawer.Item label={value.title} onPress={() => {
                                    props.navigation.navigate(value.routes[0].routerName)
                                }}/>
                            </Drawer.Section>) :
                            (<Drawer.Section title={value.title} style={{marginTop: 15}}>
                                {(value.routes.map((route, indexx) => {
                                    return (<Drawer.Item label={route.title} onPress={() => props.navigation.navigate(route.routerName)}/>);
                                }))}
                            </Drawer.Section>)
                    })}
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style={{marginBottom: 15, borderTopColor: '#f4f4f4', borderTopWidth: 1}}>
                <Drawer.Item
                    icon={({color, size}) => (<Icon name="settings" color={color} size={size}/>)}
                    label="Paramètres"
                    onPress={() => true}
                />
            </Drawer.Section>
        </View>
    );
}
