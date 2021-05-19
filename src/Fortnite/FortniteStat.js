import React from "react";
import { ScrollView, Text, View } from "react-native";

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
            <View>
                <Text style={{ color: 'black' }}>Donnée de {this.state.stats["name"]} en {mode} :</Text>
                <Text style={{ color: 'black' }}>Nombre de Top1 effectué : {stats.placetop1}</Text>
                <Text style={{ color: 'black' }}>Nombre de Top3 effectué : {stats.placetop3}</Text>
                <Text style={{ color: 'black' }}>Nombre de Top5 effectué : {stats.placetop5}</Text>
                <Text style={{ color: 'black' }}>Nombre de Top10 effectué : {stats.placetop10}</Text>
                <Text style={{ color: 'black' }}>Nombre de kill effectué : {stats.kills}</Text>
                <Text style={{ color: 'black' }}>Nombre de match joué : {stats.matchesplayed}</Text>
                <Text style={{ color: 'black' }}>Temps de jeu effectué : {this.parseTime(stats.minutesplayed)} </Text>
            </View>
        );
    }

    render() {
        if (this.state.error) {
            return (
                <Text style={{ color: 'black' }}>Erreur lors du chargement des stats.</Text>
            );
        }
        if (!this.state.isLoaded) {
            return (
                <Text style={{ color: 'black' }}>Chargement des stats…</Text>
            );
        } else {
            return (
                <View>
                    <Text style={{ color: 'black' }}>Level : {this.state.stats["account"]["level"] === null ? "???" : this.state.stats["account"]["level"]}</Text>
                    <ScrollView>
                        {this.writeStat(this.state.stats["global_stats"]["solo"], "solo")}
                        {this.writeStat(this.state.stats["global_stats"]["duo"], "duo")}
                        {this.writeStat(this.state.stats["global_stats"]["squad"], "squad")}
                    </ScrollView>
                </View>
            );
        }
    }
}

export default FortniteStat;