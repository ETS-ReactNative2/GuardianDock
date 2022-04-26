import React from 'react';
import {Box, HStack, Icon, IconButton, StatusBar, Text} from "native-base";

import {DrawerHeaderProps} from "@react-navigation/drawer";

import { MaterialIcons } from "@native-base/icons";

import {DrawerActions} from "@react-navigation/native";

export default function CustomHeader({ navigation }: DrawerHeaderProps) {
    const index = navigation.getState().index;
    const routeName = navigation.getState().routes[index].name;

    const toggleSideMenu = () => navigation.dispatch(DrawerActions.toggleDrawer);

    return <>
        <StatusBar backgroundColor='#000000' barStyle='light-content' />
        <Box safeAreaTop bg='#DF00FF' />
        <HStack bg='#DF00FF' px='1' py='3' justifyContent='space-between' alignItems='flex-end' w='100%'>
            <HStack alignItems='center'>
                <IconButton icon={<Icon size='sm' as={MaterialIcons} name='menu' color='#ECF0F9' />} onPress={toggleSideMenu}/>
                <Text color='#ECF0F9' fontSize='20' fontWeight='bold' >
                    {routeName}
                </Text>
            </HStack>
        </HStack>
    </>;
}