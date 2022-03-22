import React from "react";
import { Text, StyleSheet, View } from "react-native";
import DestinyStats from "./DestinyStats"

/**
 * Class DestinyPlayer
 */
class DestinyPlayer extends React.Component {

    /**
     * States about DestinyPlayer menu
     */
    state = {
        url: '',
        playerName: '',
        isLoaded: false,
        account_id: '',
        membershipType: '',
        error: false,
        platformId: '',
        invalidAccount: false,
        stat: false,
        match: false
    };

    /**
     * Component DestinyPlayer CTOR
     * @param {} props Props containing url, playerName
     */
    constructor(props) {
        super(props);
        this.state = {
            playerName: props.playerName,
            isLoaded: false,
            platformId: props.platformId,
            account_id: '',
            membershipType: '',
            error: false,
            invalidAccount: false,
            stat: props.stat,
            match: props.match,
            url: "https://www.bungie.net/Platform/Destiny2/SearchDestinyPlayer/" ,
        };
    }

    /**
     * Triggered when the component is mount.
     * Here it just fetch the url with the platform and the playerName to get some informations about the player
     * @returns nothing
     */
    componentDidMount() {
        if (this.state.playerName === '') return;
        fetch(this.state.url + this.state.platformId + '/' + this.state.playerName, {
            method: 'GET',
            headers: {
                'x-api-key': '551b69f4972440f9bfb0a3b2a8a9ed62'
            }
        }).then(res => {
            res.json().then(json => {
                if (json.ErrorCode !== 1) {
                    this.setState({
                        invalidAccount: true,
                        isLoaded: true
                    })
                } else if (json["Response"] !== null) {
                    this.setState({
                        account_id: json["Response"][0].membershipId,
                        playerName: json["Response"][0].displayName,
                        membershipType: json["Response"][0].membershipType,
                        isLoaded: true
                    })
                }
            }).catch(() => {
                this.setState({
                    error: true
                });
            });
        }).catch(() => {
            this.setState({
                error: true
            });
        });
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
                if (this.state.stat) {
                    return (
                        <View>
                            <Text style={styles.username}>Pseudo Bungie.net: {this.state.playerName}</Text>
                            <Text style={styles.text}>ID de membre: {this.state.account_id}</Text>
                            <DestinyStats accountId={this.state.account_id} playerName={this.state.playerName} membershipType={this.state.membershipType}></DestinyStats>
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
    }
});

export default DestinyPlayer;