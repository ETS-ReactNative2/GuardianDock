import React from "react";
import { Text, View } from "react-native";

/**
 * Class FortniteNews
 */
class FortniteNews extends React.Component {

    /**
     * State into the api loader
     */
    state = {
        url: '',
        isLoaded: false,
        error: false,
        allNews: []
    };

    /**
     * Component CTOR
     */
    constructor(props) {
        this.state = {
            url: 'https://fortniteapi.io/v1/news?lang=fr&type=' + props.type,
            isLoaded: false,
            error: false
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
                    allNews: json.news,
                    isLoaded: true
                })
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
                <Text style={{color:'white'}}>La récupération des données a échouée.</Text>
            );
        }
        if (!this.state.isLoaded) {
            return (
                <Text style={{color:'white'}}>Chargement des news...</Text>
            );
        } else {
            return (
                <View>
                    {this.state.allNews.forEach(element => {
                        
                    })}
                </View>
            );
        }
    }
}

export default FortniteNews;