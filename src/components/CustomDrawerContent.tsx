import React from 'react';

import {DrawerContentComponentProps, DrawerContentScrollView} from "@react-navigation/drawer";

import {DrawerContentItems} from '../config/DrawerItems';
import {Divider, VStack, Text, Heading, Pressable, HStack, View, Image} from "native-base";

export default function CustomDrawerContent(props: DrawerContentComponentProps) {
    return (
        <View style={{flex: 1}}>
            <DrawerContentScrollView {...props}>
                <View style={{flex: 1}}>
                    <View style={{paddingLeft: 20, backgroundColor: '#222222'}}>
                        <View style={{flexDirection: 'row', marginTop: 15}}>
                            <Image source={require('../../assets/logo-og-nbg.png')} style={{width: '100%', height: 162.5}} alt="GuardianDock Logo"/>
                        </View>
                    </View>
                    {DrawerContentItems.map((value, _) => {
                        return (<VStack divider={<Divider/>} key={value.key} style={{marginTop: 15}}>
                            <Text fontWeight="500" fontSize="14" px="5" color="gray.500">{value.title}</Text>
                            {(value.routes.map((route, __) => {
                                return (
                                    <Pressable
                                        key={route.routerName}
                                        px='5' py='3'
                                        rounded='md'
                                        // @ts-ignore
                                        onPress={(event) => props.navigation.navigate(route.routerName)}
                                    >
                                        <HStack space='7' alignItems='center'>
                                            <Text color="gray.700" fontWeight="500">
                                                {route.title}
                                            </Text>
                                        </HStack>
                                    </Pressable>
                                );
                            }))}
                        </VStack>)
                    })}
                </View>
            </DrawerContentScrollView>
            <VStack space='5' style={{marginBottom: 15, borderTopColor: '#f4f4f4', borderTopWidth: 1, justifyContent: 'center', alignContent: 'flex-end'}}>
                <Heading size='xs' style={{textAlign: 'center'}}>
                    Version 0.0.1
                </Heading>
            </VStack>
        </View>
    );
}
