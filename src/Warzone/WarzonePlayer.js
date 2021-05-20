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
        console.log("Platforme : ", props.platform);
        this.state = {
            url: "https://call-of-duty-modern-warfare.p.rapidapi.com/" + props.mode + '/' + props.playerName + '/' + props.platform,
            playerName: props.playerName,
            isLoaded: false,
            matchs: null
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
                        matchs: null,
                        invalidAccount: true,
                        isLoaded: true
                    });
                } else {
                    this.setState({
                        invalidAccount: false,
                        matchs: json,
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
        return (
            <View>
                <Text style={{ color: 'black' }}>Donnée de {this.state.playerName} en {mode} :</Text>
                <Text style={{ color: 'black' }}>Map jouée : {stats.map}</Text>
                <Text style={{ color: 'black' }}>Mod de jeu joué : {stats.mode}</Text>
                <Text style={{ color: 'black' }}>Nombre de joueur présent : {stats.playerCount}</Text>
                <Text style={{ color: 'black' }}>Nombre d'équipe : {stats.teamCount}</Text>
                <Text style={{ color: 'black' }}>Partie privée : {stats.privateMatch ? "Oui" : "Non"}</Text>
                <Text style={{ color: 'black' }}>Durée de la partie : {this.parseTime(stats.duration)}</Text>
            </View>
        );
    }

    writeMultiStat(stats = JSON, mode = String) {
        return (
            <View>
                <Text style={{ color: 'black' }}>Donnée de {this.state.playerName} en {mode} :</Text>
                <Text style={{ color: 'black' }}>Map jouée : {stats.map}</Text>
                <Text style={{ color: 'black' }}>Mod de jeu joué : {stats.mode}</Text>
                <Text style={{ color: 'black' }}>Nombre de joueur présent : {stats.playerCount}</Text>
                <Text style={{ color: 'black' }}>Nombre d'équipe : {stats.teamCount}</Text>
                <Text style={{ color: 'black' }}>Partie privée : {stats.privateMatch ? "Oui" : "Non"}</Text>
                <Text style={{ color: 'black' }}>Durée de la partie : {this.parseTime(stats.duration)}</Text>
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
                    console.log(this.state.stats);
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
                    console.log(this.state.stats);
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