import React from "react";
import { ScrollView, Text, View } from "react-native";

/**
 * Class Fortnite
 */
class WarzonePlayer extends React.Component {

    /**
     * State into the api loader
     */
    state = {
        url: '',
        playerName: '',
        isLoaded: false,
        account_id: '',
        error: false,
        invalidAccount: false,
        stat: false,
        match: false,
        stats: null,
        mode: null
    };

    /**
     * Component CTOR
     * @param {} props Props containing url, playerName
     */
    constructor(props) {
        super(props);
        this.state = {
            url: props.url + props.mode + '/' + props.playerName + '/' + props.platform,
            playerName: props.playerName,
            match: props.match,
            mode: props.mode,
            stat: props.stat,
            isLoaded: false,
            stats: null
        };
    }

    componentDidMount() {
        if (this.state.playerName == '') return;
        fetch(this.state.url, {
            method: 'GET',
            headers: {
                'Authorization': 'ad9c7062e9msh5027e0b5810c9ccp18d193jsn69644ec4508e'
            }
        }).then(res => {
            res.json().then(json => {
                if (json.result === false) {
                    this.setState({
                        stats: null,
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

    parseTime(minutesPlayed = Number) {
        var daysPlayed = minutesPlayed / 60 / 24;
        var hoursPlayed = daysPlayed % 1 * 24;
        var minutesPlayed = hoursPlayed % 1 * 60;
        var secondesPlayed = minutesPlayed % 1 * 60;

        return (`${parseInt(daysPlayed)}j ${parseInt(hoursPlayed)}h ${parseInt(minutesPlayed)}m ${parseInt(secondesPlayed)}s`)
    }

    writeBrStat(stats = JSON, mode = String) {
        var kdRatio = Number.parseFloat(stats.kdRation).toFixed(2)
        return (
            <View>
                <Text style={{ color: 'black' }}>Donnée de {this.state.playerName} en {mode} :</Text>
                <Text style={{ color: 'black' }}>Nombre de victoires : {stats.wins}</Text>
                <Text style={{ color: 'black' }}>Nombre de match joué : {stats.gamesPlayed}</Text>
                <Text style={{ color: 'black' }}>Nombre d'élimination : {stats.kills}</Text>
                <Text style={{ color: 'black' }}>Nombre de morts : {stats.deaths}</Text>
                <Text style={{ color: 'black' }}>Ratio élimnation / mort : {kdRatio}</Text>
                <Text style={{ color: 'black' }}>Nombre de Top 5 effectué : {stats.topFive}</Text>
                <Text style={{ color: 'black' }}>Nombre de Top 10 effectué : {stats.topTen}</Text>
                <Text style={{ color: 'black' }}>Nombre de Top 25 effectué : {stats.topTwentyFive}</Text>
                <Text style={{ color: 'black' }}>Temps de jeu effectué : {this.parseTime(stats.timePlayed)} </Text>
            </View>
        );
    }

    writeMultiStat(stats = JSON, mode = String) {
        var kdRatio = Number.parseFloat(stats["lifetime"]["all"]["properties"].kdRation).toFixed(2)
        var wlRatio = Number.parseFloat(stats["lifetime"]["all"]["properties"].wlRation).toFixed(2)
        return (
            <View>
                <Text style={{ color: 'black' }}>Donnée de {this.state.playerName} en {mode} :</Text>
                <Text style={{ color: 'black' }}>Niveau de {this.state.playerName} : {stats.level}</Text>
                <Text style={{ color: 'black' }}>Nombre de victoires : {stats["lifetime"]["all"]["properties"].wins}</Text>
                <Text style={{ color: 'black' }}>Nombre de match joué : {stats["lifetime"]["all"]["properties"].gamesPlayed}</Text>
                <Text style={{ color: 'black' }}>Nombre d'élimination : {stats["lifetime"]["all"]["properties"].kills}</Text>
                <Text style={{ color: 'black' }}>Nombre de morts : {stats["lifetime"]["all"]["properties"].deaths}</Text>
                <Text style={{ color: 'black' }}>Ratio élimnation / mort : {kdRatio}</Text>
                <Text style={{ color: 'black' }}>Ratio victoire / défaite : {wlRatio}</Text>
                <Text style={{ color: 'black' }}>Temps de jeu effectué : {this.parseTime(stats["lifetime"]["all"]["properties"].timePlayedTotal)} </Text>
            </View>
        );
    }

    render() {
        if (this.state.error) {
            return (
                <Text style={{color:'black'}}>La récupération des données a échouée.</Text>
            );
        }
        if (!this.state.isLoaded) {
            return (
                <Text style={{color:'black'}}>Chargement des informations basique...</Text>
            );
        } else {
            if (this.state.invalidAccount) {
                return (
                    <Text style={{color:'black'}}>Ce compte n'existe pas, vérifiez le pseudo que vous avez entré.</Text>
                );
            } else {
                if (this.state.mode == "warzone") {
                    return (
                        <View>
                            <Text style={{color: 'black'}}>Username: {this.state.playerName}</Text>
                            <ScrollView>
                                {this.writeBrStat(this.state.stats["br_all"], "Warzone Global")}
                                {this.writeBrStat(this.state.stats["br"], "Warzone")}
                                {this.writeBrStat(this.state.stats["br_dmz"], "Warzone Plunder")}
                            </ScrollView>
                        </View>
                    );
                } else if (this.state.mode == "multiplayer") {
                    return (
                        <View>
                            <Text style={{color: 'black'}}>Username: {this.state.playerName}</Text>
                            <ScrollView>
                                {this.writeMultiStat(this.state.stats, "Multiplayer")}
                            </ScrollView>
                        </View>
                    );
                }
            }
        }
    }
}

export default WarzonePlayer;