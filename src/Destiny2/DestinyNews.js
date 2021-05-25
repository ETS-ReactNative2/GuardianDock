import React from "react";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import Card from "../Card/Card";

/**
 * Class DestinyNews
 */
class DestinyNews extends React.Component {

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
        super(props);
        this.state = {
            url: 'https://www.bungie.net/Platform/Trending/Categories/News/0?lc=fr',
            isLoaded: false,
            error: false
        };
    }

    componentDidMount() {
        fetch(this.state.url, {
            method: 'GET',
            headers: {
                'x-api-key': '551b69f4972440f9bfb0a3b2a8a9ed62'
            }
        }).then(res => {
            res.json().then(json => {
                this.setState({
                    allNews: json["Response"]["results"],
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
                <Text style={{color:'black'}}>La récupération des données a échouée.</Text>
            );
        }
        if (!this.state.isLoaded) {
            return (
                <Text style={{color:'black'}}>Chargement des news...</Text>
            );
        } else {
            return (
                <View style={styles.container}>
                    <FlatList data={this.state.allNews}
                    renderItem={(key, value) => {
                            return <Card title={key.item.displayName} subtitle={key.item.displayName} link={"https://www.bungie.net" + key.item.link} description={"Cliquez ici pour voir l'article"} image={"https://www.bungie.net" + key.item.image}/>
                        }
                    }
                    keyExtractor={(item, index) => index.toString()}
                    ></FlatList>
                </View>
            );
        }
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 10
    }
})

export default DestinyNews;