import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FortniteNews from './FortniteNews';
import FortnitePlayer from './FortnitePlayer';
import { Dimensions } from 'react-native';

const sWidth = Dimensions.get('screen').width;

class Fortnite extends Component {

    //States about home menu
    state = {
        username: '',
        fortnite: null,
        stat: false,
        match: false,
        news: false
    };

    tempUsername = '';

    //CSS
    styles = StyleSheet.create({
        /*! Change width search bar when screen rotate */
        input: {
            backgroundColor: "white",
            color: "black",
            height: 40,
            width: sWidth - 160,
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

    constructor(props) {
        super(props);
        this.state.news = props.news;
        this.state.match = props.match;
        this.state.stat = props.stat;
    }

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
            if (this.state.stat) {
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
        if (this.state.news) {
            return (
                <View>
                    <FortniteNews type="br"/>
                </View>
            );
        }
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

export default Fortnite;