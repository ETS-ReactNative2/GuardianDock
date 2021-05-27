import React from "react";
import { Text, View } from "react-native";
import FortniteMatch from "./FortniteMatch";
import FortniteStat from "./FortniteStat";

/**
 * Class Fortnite
 */
class FortnitePlayer extends React.Component {

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
        match: false
    };

    /**
     * Component CTOR
     * @param {} props Props containing url, playerName
     */
    constructor(props) {
        super(props);
        this.state = {
            url: props.url,
            playerName: props.playerName,
            isLoaded: false,
            account_id: '',
            error: false,
            invalidAccount: false,
            stat: props.stat,
            match: props.match
        };
    }

    componentDidMount() {
        if (this.state.playerName == '') return;
        fetch(this.state.url + this.state.playerName, {
            method: 'GET',
            headers: {
                'Authorization': 'c905ac22-2ef5e8bd-a9b0a0e0-9f4e3ba3'
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
                        account_id: json.account_id,
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
                    <Text style={{color: 'red', alignContent: 'center'}}>Ce compte n'existe pas, vérifiez le pseudo que vous avez entré est valide.</Text>
                );
            } else {
                if (this.state.stat) {
                    return (
                        <View>
                            <FortniteStat accountId={this.state.account_id} playerName={this.state.playerName}></FortniteStat>
                        </View>
                    );
                } else {
                    return (
                        <View>
                            <FortniteMatch accountId={this.state.account_id} playerName={this.state.playerName}></FortniteMatch>
                        </View>
                    );
                }
            }
        }
    }
}

export default FortnitePlayer;