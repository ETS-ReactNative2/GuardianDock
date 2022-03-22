import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";

/**
 * Class DestinyInventory
 */
class DestinyInventory extends React.Component {

    /**
     * States about DestinyInventory
     */
    state = {
        url: '',
        isLoaded: false,
        error: false,
        inventory: [],
        token: null
    };

    /**
     * Component DestinyInventory CTOR
     * @param {} props Props
     */
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://www.bungie.net/fr/OAuth/Authorize?client_id=33564&response_type=code',
            isLoaded: false,
            error: false
        };
    }

    componentDidMount() {
        manager.authorize('bungie').then(
            resp => console.log('Your users ID')
        ).catch(
            err => console.log('Occured Errors')
        );
    }

    render() {
        <View>
            <Text>OAuth 2.0 Test Here</Text>
        </View>
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 10
    }
})

export default DestinyInventory;