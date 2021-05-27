import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

/**
 * Class WarzonePlayer
 */
class WarzonePlayer extends React.Component {

    /**
     * States about WarzonePlayer
     */
    state = {
        url: '',
        playerName: '',
        isLoaded: false,
        error: false,
        invalidAccount: false,
        stats: null,
        mode: null
    };

    /**
     * Component WarzonePlayer CTOR
     * @param {} props Props containing mode, playerName, platform
     */
    constructor(props) {
        super(props);
        this.state = {
            url: "https://call-of-duty-modern-warfare.p.rapidapi.com/" + props.mode + '/' + props.playerName.replace(/#/g, "%23") + '/' + props.platform,
            playerName: props.playerName,
            isLoaded: false,
            mode: props.mode
        };
    }

    /**
     * Triggered when the component is mount.
     * Here it just fetch the url to get the stats of a player
     * @returns nothing
     */
    componentDidMount() {
        if (this.state.playerName == '') return;
        fetch(this.state.url, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'ad9c7062e9msh5027e0b5810c9ccp18d193jsn69644ec4508e',
                'x-rapidapi-host': 'call-of-duty-modern-warfare.p.rapidapi.com'
            }
        }).then(res => {
            res.json().then(json => {
                if (json.error === false) {
                    this.setState({
                        stats: null,
                        invalidAccount: true,
                        isLoaded: true
                    });
                } else {
                    this.setState({
                        invalidAccount: false,
                        stats: json,
                        isLoaded: true
                    });
                }
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
     * @returns string parsed
     */
    parseTime(minutesPlayed) {
        var daysPlayed = minutesPlayed / 60 / 24;
        var hoursPlayed = daysPlayed % 1 * 24;
        var minutesPlayed = hoursPlayed % 1 * 60;
        var secondesPlayed = minutesPlayed % 1 * 60;

        return (`${parseInt(daysPlayed)}j ${parseInt(hoursPlayed)}h ${parseInt(minutesPlayed)}m ${parseInt(secondesPlayed)}s`);
    }

    /**
     * Write every stats
     * @param {JSON} stats A JSON Object containing every stats
     * @param {String} mode gamemode
     * @returns JSX.Object
     */
    writeBrStat(stats, mode) {
        let scorePerMinute = stats.scorePerMinute.toFixed(2) !== null ? stats.scorePerMinute.toFixed(2) : "Error";
        let kdRatio = stats.kdRatio.toFixed(2) !== null ? stats.kdRatio.toFixed(2) : "Error";
        return (
            <View style={styles.statContainer}>
                <View elevation={3} style={styles.Container}>
                    <Text style={styles.text}>Donnée de {this.state.playerName} en {mode} :</Text>
                    <Text style={styles.text}>Nombre de match joué : {stats.gamesPlayed !== null ? stats.gamesPlayed : "Error"}</Text>
                    <Text style={styles.text}>Nombre de Top 25 effectué : {stats.topTwentyFive !== null ? stats.topTwentyFive : "Error"}</Text>
                    <Text style={styles.text}>Nombre de Top 10 effectué : {stats.topTen !== null ? stats.topTen : "Error"}</Text>
                    <Text style={styles.text}>Nombre de Top 5 effectué : {stats.topFive !== null ? stats.topFive : "Error"}</Text>
                    <Text style={styles.text}>Nombre de victoires : {stats.wins !== null ? stats.wins : "Error"}</Text>
                    <Text style={styles.text}>Temps de jeu effectué : {stats.timePlayed !== null ? this.parseTime(stats.timePlayed / 60) : "Error"} </Text>
                    <Text></Text>
                    <Text style={styles.text}>Ratio élimnation / mort : {kdRatio}</Text>
                    <Text style={styles.text}>Nombre d'élimination : {stats.kills !== null ? stats.kills : "Error"}</Text>
                    <Text style={styles.text}>Nombre de morts : {stats.deaths !== null ? stats.deaths : "Error"}</Text>
                    <Text style={styles.text}>Score par minute : {scorePerMinute}</Text>
                </View>
            </View>
        );
    }

    /**
     * Write every stats
     * @param {JSON} stats A JSON Object containing every stats
     * @param {String} mode gamemode
     * @returns JSX.Object
     */
    writeMultiStat(stats, mode) {
        let scorePerMinute = stats["lifetime"]["all"]["properties"].scorePerMinute.toFixed(2) !== null ? stats["lifetime"]["all"]["properties"].scorePerMinute.toFixed(2) : "Error";
        let kdRatio = stats["lifetime"]["all"]["properties"].kdRatio.toFixed(2) !== null ? stats["lifetime"]["all"]["properties"].kdRatio.toFixed(2) : "Error";
        let wlRatio = stats["lifetime"]["all"]["properties"].wlRatio.toFixed(2) !== null ? stats["lifetime"]["all"]["properties"].wlRatio.toFixed(2) : "Error";
        let wins = stats["lifetime"]["all"]["properties"].wins !== null ? stats["lifetime"]["all"]["properties"].wins : -1;
        let losses = stats["lifetime"]["all"]["properties"].losses !== null ? stats["lifetime"]["all"]["properties"].losses : -1;
        let matchPlayed = wins !== -1 && losses !== -1 ? wins + losses : "Error";
        return (
            <View style={styles.statContainer}>
                <View elevation={3} style={styles.Container}>
                    <Text style={styles.text}>Donnée de {this.state.username} en {mode} :</Text>
                    <Text style={styles.text}>Ratio Victoire / Défaite : {wlRatio}</Text>
                    <Text style={styles.text}>Nombre de matchs joués : {matchPlayed}</Text>
                    <Text style={styles.text}>Nombre de victoires : {wins}</Text>
                    <Text style={styles.text}>Nombre de défaites : {losses}</Text>
                    <Text></Text>
                    <Text style={styles.text}>Ratio élimnation / mort : {kdRatio}</Text>
                    <Text style={styles.text}>Nombre d'élimination : {stats["lifetime"]["all"]["properties"].kills !== null ? stats["lifetime"]["all"]["properties"].kills : "Error"}</Text>
                    <Text style={styles.text}>Nombre de morts : {stats["lifetime"]["all"]["properties"].deaths !== null ? stats["lifetime"]["all"]["properties"].deaths : "Error"}</Text>
                    <Text style={styles.text}>Nombre d'assistances : {stats["lifetime"]["all"]["properties"].assists !== null ? stats["lifetime"]["all"]["properties"].assists : "Error"}</Text>
                    <Text style={styles.text}>Nombre d'élimination avec des tirs en pleine tête : {stats["lifetime"]["all"]["properties"].headshots !== null ? stats["lifetime"]["all"]["properties"].headshots : "Error"}</Text>
                    <Text></Text>
                    <Text style={styles.text}>Temps de jeu total effectif : {stats["lifetime"]["all"]["properties"].timePlayedTotal !== null ? this.parseTime(stats["lifetime"]["all"]["properties"].timePlayedTotal / 60) : "Error"}</Text>
                    <Text style={styles.text}>Score par minute : {scorePerMinute}</Text>
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
                if (this.state.invalidAccount) {
                    return (
                        <Text style={{color: 'red', alignContent: 'center'}}>Ce compte n'existe pas, vérifiez que le pseudo vous avez entré et votre tag (#) appartiennent bien au même joueur.</Text>
                    );
                } else if (this.state.mode == "warzone") {
                    return (
                        <View style={{flex: 1}}>
                            <Text style={styles.username}>Pseudonyme: {this.state.playerName}</Text>
                            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                {this.writeBrStat(this.state.stats["br_all"], "Warzone Global")}
                                {this.writeBrStat(this.state.stats["br"], "Warzone")}
                                {this.writeBrStat(this.state.stats["br_dmz"], "Warzone Plunder")}
                            </ScrollView>
                        </View>
                    );
                } else if (this.state.mode == "multiplayer") {
                    return (
                        <View style={{flex: 1}}>
                            <Text style={styles.username}>Pseudonyme: {this.state.playerName}</Text>
                            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                {this.writeMultiStat(this.state.stats, "Multijoueur")}
                            </ScrollView>
                        </View>
                    );
                }
            }
        }
    }
}

const styles = StyleSheet.create({
    username: {
        fontSize: 20,
        marginTop: 10,
        textAlign: 'center',
        fontWeight: "bold",
        color: 'white'
    },
    text: {
        marginTop: 10,
        textAlign: 'center',
        color: 'white'
    },
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
    }
});

export default WarzonePlayer;