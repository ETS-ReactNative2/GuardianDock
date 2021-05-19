import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Dimensions } from 'react-native';
import WarzonePlayer from './WarzonePlayer';

const sWidth = Dimensions.get('screen').width;

class Warzone extends Component {

    //States about home menu
    state = {
        username: '',
        warzone: null,
        multiplayer: false,
        match: false,
        stat: false
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
        this.state.multiplayer = props.mode;
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
            warzone: null
        });
        setTimeout(() => {
            if (this.state.stat && this.state.multiplayer) {
                this.setState({
                    warzone: <WarzonePlayer url="https://call-of-duty-modern-warfare.p.rapidapi.com/" mode={"multiplayer"} playerName={this.state.username} platform={"battle"} />
                });
            } else if (this.state.stat && !this.state.multiplayer) {
                this.setState({
                    warzone: <WarzonePlayer url="https://call-of-duty-modern-warfare.p.rapidapi.com/" mode={"warzone"} playerName={this.state.username} platform={"battle"} />
                });
            } else if (this.state.match && this.state.multiplayer) {
                this.setState({
                    warzone: <WarzoneMatch url="https://call-of-duty-modern-warfare.p.rapidapi.com/" mode={"multiplayer"} playerName={this.state.username} platform={"battle"} />
                });
            } else if (this.state.match && !this.state.multiplayer) {
                this.setState({
                    warzone: <WarzoneMatch url="https://call-of-duty-modern-warfare.p.rapidapi.com/" mode={"warzone"} playerName={this.state.username} platform={"battle"} />
                });
            }
        }, 500);
    }

    /**
     * Graphics
     * @returns JSX.Element
     */
    render() {
        return (
            <View>
                <View style={this.styles.header}>
                    <TextInput style={this.styles.input} onChangeText={this.handleUsername}></TextInput>
                    <TouchableOpacity style={this.styles.confirmButton} onPress={this.confirmButton}>
                        <Text style={this.styles.confirmText}>Confirmer</Text>
                    </TouchableOpacity>
                </View>
                {this.state.warzone}
            </View>
        )
    }
}

export default Warzone;