import React, {useEffect, useState} from 'react';

import {ImageBackground, SafeAreaView, View, FlatList, StyleSheet} from "react-native";
import {TextInput} from 'react-native-paper';

import {API_ROUTE, UserInfoCard} from "../config/BungieAPI";
import {deserializeUsers, parseDisplayName} from "../utils/utils";

import { BUNGIE_API_KEY } from '@env';

const fetchUsers = async (id: string) : Promise<any> => {
    const [displayName, displayNameCode] = parseDisplayName(id);
    if (displayName === undefined || displayNameCode === undefined)
        return null;

    const response = await fetch(API_ROUTE + '/Destiny2/SearchDestinyPlayerByBungieName/-1', {
        method: 'POST',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-API-KEY": BUNGIE_API_KEY
        },
        body: JSON.stringify({ "displayName": displayName, "displayNameCode": displayNameCode })
    });

    if (response.ok)
        return await response.json();
    console.error("An error occurred when trying to fetch users.");
    return null;
};

export default function PvEStatsPage() {
    const [users, setUserList] = useState<Array<UserInfoCard>>([]);
    const [id, setId] = useState<string>("");

    useEffect(() => {
        fetchUsers(id).then((data) => {
            if (data === null)
                return;
            let usersList: Array<UserInfoCard> = data['Response'].map((user: any) => deserializeUsers(user));
            setUserList(usersList.filter((user) => user.bungieGlobalDisplayName !== ""))
            console.log(users);
        });
    }, [id]);

    return (
        <ImageBackground source={require('../../assets/D2Background.jpg')} style={{ width: '100%', height: '100%'}}>
            <SafeAreaView>
                <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'rgb(66, 66, 66)' }}>
                    <TextInput
                        style={styles.input}
                        underlineColor='black'
                        label="Bungie ID"
                        value={id}
                        onChangeText={(id) => setId(id)}
                    />
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    input: {
        fontSize: 20,
        paddingVertical: 0,
        paddingHorizontal: 0,
        margin: 15,
        backgroundColor: "#ffffff"
    }
})
