import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";

/**
 * Class FortniteMatch
 */
class FortniteMatch extends React.Component {
    /**
     * State into the api loader
     */
    state = {
        url: '',
        isLoaded: false,
        accountId: '',
        matches: [],
        error: false
    };

    /**
     * Component CTOR
     * @param {} props Props containing url, playerName
     */
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://fortniteapi.io/v1/matches?account=',
            isLoaded: false,
            accountId: props.accountId,
            error: false
        };
    }

    componentDidMount() {
        if (this.state.accountId == '') return;
        fetch(this.state.url + this.state.accountId, {
            method: 'GET',
            headers: {
                'Authorization': 'c905ac22-2ef5e8bd-a9b0a0e0-9f4e3ba3'
            }
        }).then(res => {
            res.json().then(json => {
                this.setState({
                    matches: json,
                    isLoaded: true
                });
            });
        }).catch(err => {
            this.setState({
                error: true
            });
        });
    }

    /**
     * Parse the stat "minutesplayed" to the following format : XXh XXm XXs
     * @param {Number} minutesPlayed
     * @returns JSX.Object
     */
    parseTime(minutesPlayed) {
        var daysPlayed = minutesPlayed / 60 / 24;
        var hoursPlayed = daysPlayed % 1 * 24;
        var minutesPlayed = hoursPlayed % 1 * 60;
        var secondesPlayed = minutesPlayed % 1 * 60;

        return (`${parseInt(hoursPlayed)}h ${parseInt(minutesPlayed)}m ${parseInt(secondesPlayed)}s`)
    }

    /**
     * Write every match stats
     * @param {JSON} match A JSON Object containing every match stats
     * @returns JSX.Object
     */
    writeStat(match) {
        return (
            <View style={styles.statContainer}>
                <View elevation={3} style={styles.Container}>
                    <Text style={styles.text}>Date de la partie : {match.date !== null ? new Date(match.date).toLocaleString() : "Error"}</Text>
                    <Text style={styles.text}>Plateforme de jeu : {match.platform === null ? "Error" : match.platform === "keyboardmouse" || match.platform === "touch" ? "PC" : "Console"}</Text>
                    <Text style={styles.text}>Mode de la partie : {match.readable_name !== null ? match.readable_name !== "" ? match.readable_name : "Mode inconnue." : "Error"}</Text>
                    <Text style={styles.text}>Kill effectué dans la partie : {match.kills !== null ? match.kills : "Error"}</Text>
                    <Text style={styles.text}>Durée de la partie : {match.minutesplayed !== null ? this.parseTime(match.minutesplayed) : "Error"}</Text>
                </View>
            </View>
        );
    }

    render() {
        if (this.state.error) {
            return (
                <Text style={{ color: 'black' }}>Erreur lors du chargement des parties.</Text>
            );
        }
        if (!this.state.isLoaded) {
            return (
                <Text style={{ color: 'black' }}>Chargement des parties...</Text>
            );
        } else {
            return (
                <View style={{marginTop: 15}}>
                    <FlatList data={this.state.matches["matches"]}
                    renderItem={({item}) => {
                        return this.writeStat(item);
                    }}
                    keyExtractor={(item, index) => index.toString()}>
                    </FlatList>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    statContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    Container: {
        borderRadius: 2,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 1.0
    }
});

export default FortniteMatch;