import React, {useEffect, useState} from "react";

import {Divider, Input, View, VStack} from "native-base";
import {ImageBackground} from "react-native";

import {parseDisplayName} from "../utils/utils";

import {API_ROUTE, BUNGIE_API_KEY} from "@env";
import CenteredAlert from "../components/CenteredAlert";

const fetchUsers = async (id: string) : Promise<any> => {
    const [displayName, displayNameCode] = parseDisplayName(id)

    if (displayName === undefined || displayNameCode !== undefined)
        return {};
    const response = await fetch(API_ROUTE + '/User/Search/GlobalName/0/', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'X-API-KEY': BUNGIE_API_KEY
        },
        body: JSON.stringify({ "displayNamePrefix": displayName })
    });

    if (response.ok)
        return response.json()
    console.error('An error occurred when trying to fetch users.')
    return null
}

export default function PvETrackerScreen() {
    const [bungieId, setBungieId] = useState<string>('')
    const [isError, setError] = useState<boolean>(false)

    useEffect(() => {
        console.log(bungieId);
        fetchUsers(bungieId).then((data) => {
            if (data === null)
                setError(true);
            console.log(data.Response.searchResults);
        })
    }, [bungieId]);

    return <>
        <ImageBackground source={require('../../assets/D2Background.jpg')} style={{ width: '100%', height: '100%' }}>
            <View flex='1' alignItems='center'>
                <VStack safeAreaTop w='90%' space='5' alignItems='center' divider={<Divider />} >
                    <Input
                        variant='underlined'
                        w='85%'
                        size='md'
                        style={{ color: '#ffffff' }}
                        placeholder='Guardian Display Name'
                        onChangeText={(guardianDisplayName: string) => setBungieId(guardianDisplayName)}
                    />
                </VStack>
            </View>
            {isError ?
                <CenteredAlert
                    status='error'
                    title='Error when fetching users!'
                    description='An error occurred when trying to fetch users using Bungie API.'
                    onClose={() => setError(false)}
                /> : null
            }
        </ImageBackground>
    </>
}