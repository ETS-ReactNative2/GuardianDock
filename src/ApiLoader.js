import React from "react";
import { Text } from "react-native";

class APILoader extends React.Component {

    /**
     * State into the api loader
     */
    state = {url: '', playerName: '', isLoaded: false, account_id: ''};

    constructor(props) {
        super(props);
        this.state = {
            url: props.url,
            playerName: props.playerName,
            isLoaded: false,
            account_id: ''
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
                this.setState({
                    account_id: json.account_id,
                    isLoaded: true
                })
            });
        });
    }

    render() {
        if (!this.state.isLoaded) {
            return (
                <Text style={{color:'white'}}>Chargement…</Text>
            );
        } else {
            return (
                <Text style={{color:'white'}}>PlayerID: {this.state.account_id}</Text>
            );
        }
    }
}

export default APILoader;