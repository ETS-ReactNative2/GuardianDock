import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

/**
 * Class DestinyPlayer
 */
 class DestinyStats extends React.Component {

    /**
     * States about DestinyStats
     */
    state = {
        playerName: '',
        isLoaded: false,
        account_id: '',
        error: false,
        membershipType: '',
        invalidAccount: false,
        stats: null,
        url: null
    };

    /**
     * Component DestinyStats CTOR
     * @param {} props Props containing playerName, membershipType and accountId
     */
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            playerName: props.playerName,
            membershipType: props.membershipType,
            account_id: props.accountId,
            error: false,
            invalidAccount: false,
            url: "https://www.bungie.net/Platform/Destiny2/"
        };
    }

    /**
     * Triggered when the component is mount.
     * Here it just fetch the url with the membershipType and the accountId to get the stat of the player
     * @returns nothing
     */
    componentDidMount() {
        if (this.state.playerName == '') return;
        fetch(this.state.url + this.state.membershipType + "/Account/" + this.state.account_id + "/Stats/?groups=0&modes=5,7&periodType=0", {
            method: 'GET',
            headers: {
                'x-api-key': '551b69f4972440f9bfb0a3b2a8a9ed62'
            }
        }).then(res => {
            res.json().then(json => {
                if (json.result === false) {
                    this.setState({
                        invalidAccount: true,
                        isLoaded: true
                    })
                } else {
                    this.setState({
                        invalidAccount: false,
                        stats: json,
                        isLoaded: true
                    })
                }
            });
        }).catch(err => {
            this.setState({
                error: true
            });
        });
    }

    /**
     * Parse the json stats to return a JSX.Element containing every pve (player versus mob, ia) stat
     * @param {JSON} stats json containing every stats of a player
     * @param {String} mode the gamemode we're looking
     * @returns JSX.Element
     */
    writePveStats(stats, mode) {
        return (
            <View style={styles.statContainer}>
                <View elevation={3} style={styles.Container}>
                    <Text style={{ color: 'white' }}>
                        Données en mode {mode} :
                    </Text>
                    <Text style={{ color: 'white' }}>Nombre d'activités {mode} complétées : {stats["activitiesCleared"]["basic"].displayValue !== null ? stats["activitiesCleared"]["basic"].displayValue : "Error"}</Text>
                    <Text style={{ color: 'white' }}>
                        {'\n'}
                        Ratio élimnation / mort : {stats["killsDeathsRatio"]["basic"].displayValue !== null ? stats["killsDeathsRatio"]["basic"].displayValue : "Error"}
                    </Text>
                    <Text style={{ color: 'white' }}>Ratio élimnation - assistance / mort : {stats["killsDeathsAssists"]["basic"].displayValue !== null ? stats["killsDeathsAssists"]["basic"].displayValue : "Error"}</Text>
                    <Text style={{ color: 'white' }}>Efficacitée PvE : {stats["efficiency"]["basic"].displayValue !== null ? stats["efficiency"]["basic"].displayValue : "Error"}</Text>
                    <Text style={{ color: 'white' }}>Nombre d'éliminations : {stats["kills"]["basic"].displayValue !== null ? stats["kills"]["basic"].displayValue : "Error"}</Text>
                    <Text style={{ color: 'white' }}>Nombre de morts : {stats["deaths"]["basic"].displayValue !== null ? stats["deaths"]["basic"].displayValue : "Error"}</Text>
                    <Text style={{ color: 'white' }}>Nombre d'assistances : {stats["assists"]["basic"].displayValue !== null ? stats["assists"]["basic"].displayValue : "Error"}</Text>
                    <Text style={{ color: 'white' }}>Nombre d'éliminations avec des tirs en pleine tête : {stats["precisionKills"]["basic"].displayValue !== null ? stats["precisionKills"]["basic"].displayValue : "Error"}</Text>
                    <Text style={{ color: 'white' }}>
                        {'\n'}
                        Temps de jeu total effectif : {stats["secondsPlayed"]["basic"].displayValue !== null ? stats["secondsPlayed"]["basic"].displayValue : "Error"}
                    </Text>
                    <Text style={{ color: 'white' }}>Score : {stats["score"]["basic"].displayValue !== null ? stats["score"]["basic"].displayValue: "Error"}</Text>
                </View>
            </View>
        );
    }

    /**
     * Parse the json stats to return a JSX.Element containing every pvp (player versus player) stat
     * @param {JSON} stats json containing every stats of a player
     * @param {String} mode the gamemode we're looking
     * @returns JSX.Element
     */
    writePvpStats(stats, mode) {
        let gamesLost = ((stats["activitiesEntered"]["basic"].value !== null ? stats["activitiesEntered"]["basic"].value : 0) - (stats["activitiesWon"]["basic"].value !== null ? stats["activitiesWon"]["basic"].value : 0)).toFixed(0);
        return (
            <View style={styles.statContainer}>
                <View elevation={3} style={styles.Container}>
                    <Text style={{ color: 'white' }}>
                        Données en mode {mode} :
                    </Text>
                    <Text style={{ color: 'white' }}>Nombre d'activités {mode} complétées : {stats["activitiesEntered"]["basic"].displayValue !== null ? stats["activitiesEntered"]["basic"].displayValue : "Error"}</Text>
                    <Text style={{ color: 'white' }}>Nombre d'activités {mode} gagnées : {stats["activitiesWon"]["basic"].displayValue !== null ? stats["activitiesWon"]["basic"].displayValue : "Error"}</Text>
                    <Text style={{ color: 'white' }}>Nombre d'activités {mode} perdues : {gamesLost}</Text>
                    <Text style={{ color: 'white' }}>
                        {'\n'}
                        Ratio élimnation / mort : {stats["killsDeathsRatio"]["basic"].displayValue !== null ? stats["killsDeathsRatio"]["basic"].displayValue : "Error"}
                    </Text>
                    <Text style={{ color: 'white' }}>Ratio élimnation - assistance / mort : {stats["killsDeathsAssists"]["basic"].displayValue !== null ? stats["killsDeathsAssists"]["basic"].displayValue : "Error"}</Text>
                    <Text style={{ color: 'white' }}>Efficacité PvP : {stats["efficiency"]["basic"].displayValue !== null ? stats["efficiency"]["basic"].displayValue : "Error"}</Text>
                    <Text style={{ color: 'white' }}>Nombre d'élimination : {stats["kills"]["basic"].displayValue !== null ? stats["kills"]["basic"].displayValue : "Error"}</Text>
                    <Text style={{ color: 'white' }}>Nombre de morts : {stats["deaths"]["basic"].displayValue !== null ? stats["deaths"]["basic"].displayValue : "Error"}</Text>
                    <Text style={{ color: 'white' }}>Nombre d'assistances : {stats["assists"]["basic"].displayValue !== null ? stats["assists"]["basic"].displayValue : "Error"}</Text>
                    <Text style={{ color: 'white' }}>Nombre d'élimination avec des tirs en pleine tête : {stats["precisionKills"]["basic"].displayValue !== null ? stats["precisionKills"]["basic"].displayValue : "Error"}</Text>
                    <Text style={{ color: 'white' }}>
                        {'\n'}
                        Temps de jeu total effectif : {stats["secondsPlayed"]["basic"].displayValue !== null ? stats["secondsPlayed"]["basic"].displayValue : "Error"}
                    </Text>
                    <Text style={{ color: 'white' }}>Score : {stats["score"]["basic"].displayValue !== null ? stats["score"]["basic"].displayValue: "Error"}</Text>
                </View>
            </View>
        );
    }

    /**
     * Parse the json stats to return a JSX.Element containing every global stat
     * @param {JSON} stats json containing every stats of a player
     * @param {String} mode the gamemode we're looking
     * @returns JSX.Element
     */
    writeAccountStats(stats = JSON) {
        return (
            <View style={styles.statContainer}>
                <View elevation={3} style={styles.Container}>
                    <Text style={{ color: 'white' }}>
                        Données globales de {this.state.playerName} :
                    </Text>
                    <Text style={{ color: 'white' }}>Nombre d'activités complétées : {stats["activitiesCleared"]["basic"].displayValue !== null ? stats["activitiesCleared"]["basic"].displayValue : "Error"}</Text>
                    <Text style={{ color: 'white' }}>
                        {'\n'}
                        Ratio élimnation / mort : {stats["killsDeathsRatio"]["basic"].displayValue !== null ? stats["killsDeathsRatio"]["basic"].displayValue : "Error"}
                    </Text>
                    <Text style={{ color: 'white' }}>Ratio élimnation - assistance / mort : {stats["killsDeathsAssists"]["basic"].displayValue !== null ? stats["killsDeathsAssists"]["basic"].displayValue : "Error"}</Text>
                    <Text style={{ color: 'white' }}>Efficacité : {stats["efficiency"]["basic"].displayValue !== null ? stats["efficiency"]["basic"].displayValue : "Error"}</Text>
                    <Text style={{ color: 'white' }}>Nombre d'élimination : {stats["kills"]["basic"].displayValue !== null ? stats["kills"]["basic"].displayValue : "Error"}</Text>
                    <Text style={{ color: 'white' }}>Nombre de morts : {stats["deaths"]["basic"].displayValue !== null ? stats["deaths"]["basic"].displayValue : "Error"}</Text>
                    <Text style={{ color: 'white' }}>Nombre d'assistances : {stats["assists"]["basic"].displayValue !== null ? stats["assists"]["basic"].displayValue : "Error"}</Text>
                    <Text style={{ color: 'white' }}>Nombre d'élimination avec des tirs en pleine tête : {stats["precisionKills"]["basic"].displayValue !== null ? stats["precisionKills"]["basic"].displayValue : "Error"}</Text>
                    <Text style={{ color: 'white' }}>
                        {'\n'}
                        Temps de jeu total effectif : {stats["secondsPlayed"]["basic"].displayValue !== null ? stats["secondsPlayed"]["basic"].displayValue : "Error"}
                    </Text>
                    <Text style={{ color: 'white' }}>Score : {stats["score"]["basic"].displayValue !== null ? stats["score"]["basic"].displayValue: "Error"}</Text>
                </View>
            </View>
        );
    }

    /**
     * Graphics
     * @returns JSX.Element
     */
    render() {
        if (this.state.error) {
            return (
                <Text style={{color: 'red', alignContent: 'center'}}>La récupération des données a échouée.</Text>
            );
        }
        if (!this.state.isLoaded) {
            return (
                <Text style={{color:'black'}}>Chargement des informations basiques...</Text>
            );
        } else {
            if (this.state.invalidAccount) {
                return (
                    <Text style={{color: 'red', alignContent: 'center'}}>Ce compte n'existe pas, vérifiez le pseudo que vous avez entré.</Text>
                );
            } else {
                return (
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={{ flex: 1 }}>
                            {this.writePveStats(this.state.stats["Response"]["mergedAllCharacters"]["results"]["allPvE"]["allTime"], "PvE")}
                            <Text>{'\n'}</Text>
                            {this.writePvpStats(this.state.stats["Response"]["mergedAllCharacters"]["results"]["allPvP"]["allTime"], "PvP")}
                            <Text>{'\n'}</Text>
                            {this.writeAccountStats(this.state.stats["Response"]["mergedAllCharacters"]["merged"]["allTime"])}
                        </View>
                    </ScrollView>
                );
            }
        }
    }
}

const styles = StyleSheet.create({
    statContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.35)'
    },
    Container: {
        borderRadius: 2,
        padding: 10,
        shadowColor: 'black',
        shadowOpacity: 1.0
    },
    text: {
        color: 'black'
    },
    username: {
        fontSize: 20,
        fontWeight: "bold"
    },
    header: {
        marginTop: 10,
        alignItems: 'center',
    }
});

export default DestinyStats;
