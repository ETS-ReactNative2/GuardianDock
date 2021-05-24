import React from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";

/**
 * Class FortniteStat
 */
class FortniteStat extends React.Component {
    /**
     * State into the api loader
     */
    state = {
        url: '',
        isLoaded: false,
        accountId: '',
        playerName: '',
        stats: [],
        error: false
    };

    /**
     * Component CTOR
     * @param {} props Props containing url, playerName
     */
    constructor(props) {
        super(props);
        this.state = {
            url: 'https://fortniteapi.io/v1/stats?account=',
            isLoaded: false,
            accountId: props.accountId,
            playerName: props.playerName,
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
                    stats: json,
                    isLoaded: true
                });
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

    writeStat(stats = JSON, mode = String) {
        return (
            <View style={styles.statContainer}>
                <View elevation={3} style={styles.Container}>
                    <Text style={styles.text}>Donnée de {this.state.stats["name"] ? this.state.stats["name"] : "Error"} en {mode} :</Text>
                    <Text style={styles.text}>Nombre de Top1 effectué : {stats.placetop1 !== null ? stats.placetop1 : "Error"}</Text>
                    <Text style={styles.text}>Nombre de Top3 effectué : {stats.placetop3 !== null ? stats.placetop3 : "Error"}</Text>
                    <Text style={styles.text}>Nombre de Top5 effectué : {stats.placetop5 !== null ? stats.placetop5 : "Error"}</Text>
                    <Text style={styles.text}>Nombre de Top10 effectué : {stats.placetop10 !== null ? stats.placetop10 : "Error"}</Text>
                    <Text style={styles.text}>Nombre de kill effectué : {stats.kills !== null ? stats.kills : "Error"}</Text>
                    <Text style={styles.text}>Nombre de match joué : {stats.matchesplayed !== null ? stats.matchesplayed : "Error"}</Text>
                    <Text style={styles.text}>Temps de jeu effectué : {stats.minutesplayed !== null ? this.parseTime(stats.minutesplayed) : "Error"} </Text>
                </View>
            </View>
        );
    }

    render() {
        if (this.state.error) {
            return (
                <Text style={styles.text}>Erreur lors du chargement des stats.</Text>
            );
        }
        if (!this.state.isLoaded) {
            return (
                <Text style={styles.text}>Chargement des stats…</Text>
            );
        } else {
            return (
                <View>
                    <ScrollView>
                        <View style={styles.header}>
                            <Text style={styles.username}>{this.state.playerName}</Text>
                            <Text style={styles.text}>Level : {this.state.stats["account"]["level"] === null ? "Level indisponible" : this.state.stats["account"]["level"]}</Text>
                        </View>
                        {this.state.stats["global_stats"] !== null ? this.writeStat(this.state.stats["global_stats"]["solo"], "solo") : <Text>Donnée de ce joueur en solo indisponible.</Text>}
                        <Text/>
                        {this.state.stats["global_stats"] !== null ? this.writeStat(this.state.stats["global_stats"]["duo"], "duo") : <Text>Donnée de ce joueur en duo indisponible.</Text>}
                        <Text/>
                        {this.state.stats["global_stats"] !== null ? this.writeStat(this.state.stats["global_stats"]["squad"], "squad") : <Text>Donnée de ce joueur en squad indisponible.</Text>}
                    </ScrollView>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
	text: {
        color: 'black'
    },
    username: {
        fontSize: 20,
        fontWeight: "bold"
    },
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
    },
    header: {
        marginTop: 10,
        alignItems: 'center',
    }
});

export default FortniteStat;