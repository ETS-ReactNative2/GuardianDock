import React from "react";
import { ScrollView, Text, View } from "react-native";

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
        console.log(props);
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
            `Nombre de joueur dans la partie : ${match.playerCount}\n` +
            `Map : ${match.map}\n` +
            `Mode de jeu : ${match.mode}\n` +
            `Nombre de team dans la partie : ${match.teamCount}\n` +
            `Type de la partie : ${match.privateMatch ? "Privée" : "Public"}\n` +
            `Durée de la partie : ${this.parseTime(match.duration / 60000)}\n\n`
        );
    }

    /**
     * Write every match stats
     * @param {JSON} match A JSON Object containing every match stats
     * @returns JSX.Object
     */
     writeMMatches(match) {
        return (
            `Map : ${match.map}\n` +
            `Mode de jeu : ${match.mode}\n` +
            `Type de la partie : ${match.privateMatch ? "Privée" : "Public"}\n` +
            `Résultat de la partie : ${match.win === "win" ? "Victoire" : "Défaite"}\n` +
            `Score de la team 1 : ${match.team1Score}\n` +
            `Score de la team 2 : ${match.team2Score}\n` +
            `Durée de la partie : ${this.parseTime(match.duration / 60000)}\n\n`
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
            if (this.state.mode === "warzone-matches") {
                let printData = '';
                this.state.matches["matches"].forEach(match => {
                    printData = printData + this.writeWMatches(match);
                });
                return (
                    <View style={{flex: 1}}>
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                            <Text>{printData}</Text>
                        </ScrollView>
                    </View>
                );
            } else {
                let printData = '';
                this.state.matches["matches"].forEach(match => {
                    printData = printData + this.writeMMatches(match);
                });
                return (
                    <View style={{flex: 1}}>
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                            <Text>{printData}</Text>
                        </ScrollView>
                    </View>
                );
            }
        }
    }
}

export default WarzoneMatch;