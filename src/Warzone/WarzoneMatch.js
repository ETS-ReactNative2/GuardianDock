import React from "react";
import { ScrollView, FlatList, StyleSheet, Text, View } from "react-native";

/**
 * Class Warzone
 *Match
 */
class WarzoneMatch extends React.Component {
    /**
     * State into the api loader
     */
     state = {
        url: '',
        playerName: '',
        isLoaded: false,
        error: false,
        invalidAccount: false,
        matches: null,
        mode: null
    };

    /**
     * Component CTOR
     * @param {} props Props containing url, playerName
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

    componentDidMount() {
        fetch(this.state.url, {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'ad9c7062e9msh5027e0b5810c9ccp18d193jsn69644ec4508e',
                'x-rapidapi-host': 'call-of-duty-modern-warfare.p.rapidapi.com'
            }
        }).then(res => {
            res.json().then(json => {
                if (json.error === true) {
                    this.setState({
                        matches: null,
                        invalidAccount: true,
                        isLoaded: true
                    });
                } else {
                    this.setState({
                        invalidAccount: false,
                        matches: json,
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
    writeWMatches(match) {
        return (
            <View style={styles.statContainer}>
                <View elevation={3} style={styles.Container}>
                    <Text style={styles.text}>Nombre de joueur dans la partie : {match.playerCount !== null ? match.playerCount : "Error"}</Text>
                    <Text style={styles.text}>Map : {match.map !== null ? match.map : "Error"}</Text>
                    <Text style={styles.text}>Mode de jeu : {match.mode !== null ? match.mode : match.mode}</Text>
                    <Text style={styles.text}>Nombre de team dans la partie : {match.teamCount !== null ? match.teamCount : "Error"}</Text>
                    <Text style={styles.text}>Type de la partie : {match.private !== null ? match.privateMatch ? "Privée" : "Public" : "Error"}</Text>
                    <Text style={styles.text}>Durée de la partie : {match.duration !== null ? this.parseTime(match.duration / 60000) : "Error"}</Text>
                </View>
            </View>
        );
    }

    /**
     * Write every match stats
     * @param {JSON} match A JSON Object containing every match stats
     * @returns JSX.Object
     */
     writeMMatches(match) {
        return (
            <View style={styles.statContainer}>
                <View elevation={3} style={styles.Container}>
                    <Text style={styles.text}>Map : {match.map !== null ? match.map : "Error"}</Text>
                    <Text style={styles.text}>Mode de jeu : {match.mode !== null ? match.mode : "Error"}</Text>
                    <Text style={styles.text}>Type de la partie : {match.privateMatch !== null ? match.privateMatch ? "Privée" : "Public" : "Error"}</Text>
                    <Text style={styles.text}>Résultat de la partie : {match.win !== null ? match.win === "win" ? "Victoire" : "Défaite" : "Error"}</Text>
                    <Text style={styles.text}>Score de la team 1 : {match.team1Score !== null ? match.team1Score : "Error"}</Text>
                    <Text style={styles.text}>Score de la team 2 : {match.team2Score !== null ? match.team2Score : "Error"}</Text>
                    <Text style={styles.text}>Durée de la partie : {match.duration !== null ? this.parseTime(match.duration / 60000) : "Error"}</Text>
                </View>
            </View>
        );
    }

    render() {
        if (this.state.error) {
            return (
                <Text style={{color: 'red', alignContent: 'center'}}>Erreur lors du chargement des parties.</Text>
            );
        }
        if (!this.state.isLoaded) {
            return (
                <Text style={{ color: 'black' }}>Chargement des parties...</Text>
            );
        } else {
            if (this.state.invalidAccount) {
                return (
                    <Text style={{color: 'red', alignContent: 'center'}}>Ce compte n'existe pas, vérifiez le pseudo que vous avez entré.</Text>
                );
            } else if (this.state.mode === "warzone-matches") {
                return (
                    <View style={{flex: 1}}>
                        <FlatList data={this.state.matches["matches"]}
                        renderItem={({item}) => {
                            return this.writeWMatches(item);
                        }}
                        keyExtractor={(item, index) => index.toString()}>
                        </FlatList>
                    </View>
                );
            } else {
                return (
                    <View style={{flex: 1}}>
                        <FlatList data={this.state.matches["matches"]}
                        renderItem={({item}) => {
                            return this.writeMMatches(item);
                        }}
                        keyExtractor={(item, index) => index.toString()}>
                        </FlatList>
                    </View>
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
        color: 'white'
    }
});

export default WarzoneMatch;