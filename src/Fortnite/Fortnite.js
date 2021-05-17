import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FortniteMatch from './FortniteMatch';
import FortnitePlayer from './FortnitePlayer';

let stat = false;
let match = false;
let news = false;

function changeState(props) {
    stat = props.stat;
    match = props.match;
    news = props.news;
}

class Fortnite extends Component {

    //States about home menu
    state = {
        username: '',
        fortnite: null,
        stat: stat,
        match: match,
        news: news
    };

    tempUsername = '';

    //CSS
    styles = StyleSheet.create({
        input: {
            backgroundColor: "white",
            color: "black",
            height: 40,
            width: 180,
            textAlign: "center",
            marginTop: 20,
            marginLeft: 20
        },
        header: {
            flexDirection: 'row'
        },
        confirmButton: {
            marginTop: 25,
            marginLeft: 20,
            height: 30,
            width: 100,
            backgroundColor: "white"
        },
        confirmText: {
            color: "black",
            textAlign: 'center',
            marginTop: 5
        }
    });

    /**
     * Handle username changes while you're typing on your keyboard
     * 
     * @param {String} text 
     */
    handleUsername = (text) => {
        this.tempUsername = text;
    }

    /**
     * Update player's information
     */
    confirmButton = () => {
        this.setState({
            username: this.tempUsername,
            fortnite: null
        });
        setTimeout(() => {
            if (this.state.news) {
                //! TODO News class
            } else if (this.state.stat) {
                this.setState({
                    fortnite: <FortnitePlayer url="https://fortniteapi.io/v1/lookup?username=" playerName={this.state.username} stat={true} match={false} />
                });
            } else if (this.state.match) {
                this.setState({
                    fortnite: <FortnitePlayer url="https://fortniteapi.io/v1/lookup?username=" playerName={this.state.username} match={true} stat={false} />
                });
            }
        }, 500);
    }

    /**
     * Graphics
     * @returns JSX.Element
     */
    render() {
        console.log(this.state);
        console.log(news, stat, match);
        return (
            <View>
                <View style={this.styles.header}>
                    <TextInput style={this.styles.input} onChangeText={this.handleUsername}></TextInput>
                    <TouchableOpacity style={this.styles.confirmButton} onPress={this.confirmButton}>
                        <Text style={this.styles.confirmText}>Confirmer</Text>
                    </TouchableOpacity>
                </View>
                {this.state.fortnite}
            </View>
        )
    }
}

export default {Fortnite, changeState};