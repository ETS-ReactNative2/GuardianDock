import React, {useEffect, useState} from 'react';

import {Divider, Input, KeyboardAvoidingView, View, VStack} from "native-base";
import {ImageBackground} from "react-native";

import {UserInfoCard} from "../config/BungieAPI";
import {parseDisplayName} from "../utils/utils";

import { API_ROUTE, BUNGIE_API_KEY } from '@env';

const fetchUsers = async (id: string) : Promise<any> => {
    const [displayName, displayNameCode] = parseDisplayName(id)

    if (displayName === undefined || displayNameCode === undefined)
        return null
    const response = await fetch(API_ROUTE + '/Destiny2/SearchDestinyPlayerByBungieName/-1', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-API-KEY': BUNGIE_API_KEY
        },
        body: JSON.stringify({ "displayName": displayName, "displayNameCode": displayNameCode })
    });

    if (response.ok)
        return await response.json()
    console.error('An error occurred when trying to fetch users.')
    return null
}

export default function PvETrackerScreen() {
    const [users, setUserList] = useState<Array<UserInfoCard>>([]);

    return <>
        <ImageBackground source={require('../../assets/D2Background.jpg')} style={{ width: '100%', height: '100%' }}>
            <View flex='1' alignItems='center'>
                <VStack safeAreaTop w='90%' space='5' alignItems='center' divider={<Divider />} >
                    <Input variant='underlined' w='85%' size='md' placeholder='GuardianID#Code'/>
                </VStack>
            </View>
        </ImageBackground>
    </>
}