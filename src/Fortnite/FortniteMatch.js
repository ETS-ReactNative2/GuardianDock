import React from "react";
import { Text, View } from "react-native";

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
    writeMatches(match) {
        return (
            <View>
                <Text style={{ color: 'white' }}>Date de la partie : {new Date(match.date).toLocaleString()}</Text>
                <Text style={{ color: 'white' }}>Plateforme de jeu : {match.platform === "keyboardmouse" || match.platform === "touch" ? "PC" : "Console"}</Text>
                <Text style={{ color: 'white' }}>Mode de la partie : {match.readable_names}</Text>
                <Text style={{ color: 'white' }}>Kill effectué dans la partie : {match.kills}</Text>
                <Text style={{ color: 'white' }}>Durée de la partie : {this.parseTime(match.minutesplayed)} </Text>
            </View>
        );
    }

    render() {
        if (this.state.error) {
            return (
                <Text style={{ color: 'white' }}>Erreur lors du chargement des parties.</Text>
            );
        }
        if (!this.state.isLoaded) {
            return (
                <Text style={{ color: 'white' }}>Chargement des parties...</Text>
            );
        } else {
            return (
                <View>
                    <Text style={{ color: 'white' }}>Level {this.state.stats["account"]["level"]}</Text>
                    {this.state.stats["matches"].forEach(match => {
                        this.writeMatches(match);
                    })}
                </View>
            );
        }
    }
}

export default FortniteMatch;