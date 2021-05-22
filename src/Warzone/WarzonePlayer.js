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
        error: false,
        invalidAccount: false,
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
            url: "https://call-of-duty-modern-warfare.p.rapidapi.com/" + props.mode + '/' + props.playerName.replace(/#/g, "%23") + '/' + props.platform,
            playerName: props.playerName,
            isLoaded: false,
            mode: props.mode
        };
    }

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

    parseTime(minutesPlayed = Number) {
        var daysPlayed = minutesPlayed / 60 / 24;
        var hoursPlayed = daysPlayed % 1 * 24;
        var minutesPlayed = hoursPlayed % 1 * 60;
        var secondesPlayed = minutesPlayed % 1 * 60;

        return (`${parseInt(daysPlayed)}j ${parseInt(hoursPlayed)}h ${parseInt(minutesPlayed)}m ${parseInt(secondesPlayed)}s`);
    }

    writeBrStat(stats = JSON, mode = String) {
        let scorePerMinute = stats.scorePerMinute.toFixed(2)
        let kdRatio = stats.kdRatio.toFixed(2)
        return (
            <View>
                <Text style={{ color: 'black' }}>
                    {'\n'}
                    Donnée de {this.state.playerName} en {mode} :</Text>
                <Text style={{ color: 'black' }}>Nombre de match joué : {stats.gamesPlayed}</Text>
                <Text style={{ color: 'black' }}>Nombre de Top 25 effectué : {stats.topTwentyFive}</Text>
                <Text style={{ color: 'black' }}>Nombre de Top 10 effectué : {stats.topTen}</Text>
                <Text style={{ color: 'black' }}>Nombre de Top 5 effectué : {stats.topFive}</Text>
                <Text style={{ color: 'black' }}>Nombre de victoires : {stats.wins}</Text>
                <Text style={{ color: 'black' }}>Temps de jeu effectué : {this.parseTime(stats.timePlayed / 60)} </Text>
                <Text style={{ color: 'black' }}>
                    {'\n'}
                    Ratio élimnation / mort : {kdRatio}
                </Text>
                <Text style={{ color: 'black' }}>Nombre d'élimination : {stats.kills}</Text>
                <Text style={{ color: 'black' }}>Nombre de morts : {stats.deaths}</Text>
                <Text style={{ color: 'black' }}>Score par minute : {scorePerMinute}</Text>
            </View>
        );
    }

    writeMultiStat(stats = JSON, mode = String) {
        let scorePerMinute = stats["lifetime"]["all"]["properties"].scorePerMinute.toFixed(2)
        let kdRatio = stats["lifetime"]["all"]["properties"].kdRatio.toFixed(2)
        let wlRatio = stats["lifetime"]["all"]["properties"].wlRatio.toFixed(2)
        return (
            <View>
                <Text style={{ color: 'black' }}>Donnée de {this.state.username} en {mode} :</Text>
                <Text style={{ color: 'black' }}>Ratio Victoire / Défaite : {wlRatio}</Text>
                <Text style={{ color: 'black' }}>Nombre de matchs joués : {stats["lifetime"]["all"]["properties"].wins + stats["lifetime"]["all"]["properties"].losses}</Text>
                <Text style={{ color: 'black' }}>Nombre de victoires : {stats["lifetime"]["all"]["properties"].wins}</Text>
                <Text style={{ color: 'black' }}>Nombre de défaites : {stats["lifetime"]["all"]["properties"].losses}</Text>
                <Text></Text>
                <Text style={{ color: 'black' }}>Ratio élimnation / mort : {kdRatio}</Text>
                <Text style={{ color: 'black' }}>Nombre d'élimination : {stats["lifetime"]["all"]["properties"].kills}</Text>
                <Text style={{ color: 'black' }}>Nombre de morts : {stats["lifetime"]["all"]["properties"].deaths}</Text>
                <Text style={{ color: 'black' }}>Nombre d'assistances : {stats["lifetime"]["all"]["properties"].assists}</Text>
                <Text style={{ color: 'black' }}>Nombre d'élimination avec des tirs en pleine tête : {stats["lifetime"]["all"]["properties"].headshots}</Text>
                <Text></Text>
                <Text style={{ color: 'black' }}>Temps de jeu total effectif : {this.parseTime(stats["lifetime"]["all"]["properties"].timePlayedTotal / 60)}</Text>
                <Text style={{ color: 'black' }}>Score par minute : {scorePerMinute}</Text>
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
                <Text style={{color:'black'}}>Chargement des informations basiques...</Text>
            );
        } else {
            if (this.state.invalidAccount) {
                return (
                    <Text style={{color:'black'}}>Ce compte n'existe pas, vérifiez le pseudo que vous avez entré.</Text>
                );
            } else {
                if (this.state.mode == "warzone") {
                    return (
                        <View style={{flex: 1}}>
                            <Text style={{color: 'black'}}>Username: {this.state.playerName}</Text>
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
                            <Text style={{color: 'black'}}>Username: {this.state.playerName}</Text>
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

export default WarzonePlayer;