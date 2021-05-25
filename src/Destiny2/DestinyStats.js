import React from "react";
import { Text, View } from "react-native";

/**
 * Class DestinyPlayer
 */
 class DestinyStats extends React.Component {

    /**
     * State into the api loader
     */
    state = {
        playerName: '',
        isLoaded: false,
        account_id: '',
        error: false,
        platformId: '',
        invalidAccount: false,
        stats: null,
        url: null
    };

    /**
     * Component CTOR
     * @param {} props Props containing url, playerName
     */
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            playerName: props.playerName,
            platformId: props.membershipType,
            account_id: props.accountId,
            error: false,
            invalidAccount: false,
            url = "https://www.bungie.net/Platform/Destiny2/" + this.state.platformId + "/Account/" + this.state.account_id + "/Stats/?groups=0&modes=5,7&periodType=0"
        };
    }
    componentDidMount() {
        if (this.state.playerName == '') return;
        this.getIdMembership();
        fetch(this.state.url, {
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

    writePveStats(stats = JSON, mode = String) {
        return (
            <View style={styles.statContainer}>
                <View elevation={3} style={styles.Container}>
                    <Text style={{ color: 'black' }}>Donnée en {mode} :</Text>
                    <Text style={{ color: 'black' }}>Nombre d'activité {mode} complétées : {stats["activitiesCleared"]["basic"].value !== null ? stats["activitiesCleared"]["basic"].displayValue : "Error"}</Text>
                    <Text style={{ color: 'black' }}>
                        {'\n'}
                        Ratio élimnation / mort : {stats["killsDeathsRatio"]["basic"].displayValue !== null ? stats["killsDeathsRatio"]["basic"].displayValue : "Error"}
                    </Text>
                    <Text style={{ color: 'black' }}>Ratio élimnation - assistance / mort : {stats["killsDeathsAssists"]["basic"].displayValue !== null ? stats["killsDeathsAssists"]["basic"].displayValue : "Error"}</Text>
                    <Text style={{ color: 'black' }}>Efficacité PvE : {stats["efficiency"]["basic"].displayValue !== null ? stats["efficiency"]["basic"].displayValue : "Error"}</Text>
                    <Text style={{ color: 'black' }}>Nombre d'élimination : {stats["kills"]["basic"].displayValue !== null ? stats["kills"]["basic"].displayValue : "Error"}</Text>
                    <Text style={{ color: 'black' }}>Nombre de morts : {stats["deaths"]["basic"].displayValue !== null ? stats["deaths"]["basic"].displayValue : "Error"}</Text>
                    <Text style={{ color: 'black' }}>Nombre d'assistances : {stats["assists"]["basic"].displayValue !== null ? stats["assists"]["basic"].displayValue : "Error"}</Text>
                    <Text style={{ color: 'black' }}>Nombre d'élimination avec des tirs en pleine tête : {stats["precisionKills"]["basic"].displayValue !== null ? stats["precisionKills"]["basic"].displayValue : "Error"}</Text>
                    <Text style={{ color: 'black' }}>
                        {'\n'}
                        Temps de jeu total effectif : {stats["secondsPlayed"]["basic"].displayValue !== null ? stats["secondsPlayed"]["basic"].displayValue : "Error"}
                    </Text>
                    <Text style={{ color: 'black' }}>Score par minute : {stats["score"]["basic"].displayValue !== null ? stats["score"]["basic"].displayValue: "Error"}</Text>
                </View>
            </View>
        );
    }

    // writePvpStats(stats = JSON, mode = String) {
    //     return();
    // }

    writeAccountStats(stats = JSON, mode = String) {
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
                if (this.state.stat) {
                    return (
                        <View style={{flex: 1}}>
                            <Text style={{color: 'black'}}>Username: {this.state.playerName}</Text>
                            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                                {this.writePveStats(this.state.stats["Response"]["mergedAllCharacters"]["results"]["allPvE"]["allTime"], "PvE")}
                            </ScrollView>
                        </View>
                    );
                }
            }
        }
    }
}

export default DestinyStats;
