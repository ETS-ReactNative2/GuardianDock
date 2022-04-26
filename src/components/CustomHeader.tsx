import React from 'react';

import {Box, HStack, Icon, IconButton, StatusBar, Text} from "native-base";
import {MaterialIcons} from "@native-base/icons";

import {DrawerHeaderProps} from "@react-navigation/drawer";
import {DrawerActions} from "@react-navigation/native";

import {useTranslation} from "react-i18next";
import '../i18n/config';

export default function CustomHeader({ navigation }: DrawerHeaderProps) {
    const { t } = useTranslation();

    const index = navigation.getState().index;
    const routeName = navigation.getState().routes[index].name;

    const toggleSideMenu = () => navigation.dispatch(DrawerActions.toggleDrawer);

    return <>
        <StatusBar backgroundColor='#000000' barStyle='light-content' />
        <Box safeAreaTop bg='#570BFF' />
        <HStack bg='#570BFF' px='1' py='3' justifyContent='space-between' alignItems='flex-end' w='100%'>
            <HStack alignItems='center'>
                <IconButton icon={<Icon size='sm' as={MaterialIcons} name='menu' color='#F2EFDE' />} onPress={toggleSideMenu}/>
                <Text color='#F2EFDE' fontSize='20' fontWeight='bold' >
                    {t(routeName) as string}
                </Text>
            </HStack>
        </HStack>
    </>;
}