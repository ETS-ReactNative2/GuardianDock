import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import APILoader from './ApiLoader';

class App extends Component {

    //States about home menu
    state = {
        username: '',
        apiloader: null
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
            apiloader: null
        });
        setTimeout(() => {
            this.setState({
                apiloader: <APILoader url="https://fortniteapi.io/v1/lookup?username=" playerName={this.state.username} />
            });
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
                {this.state.apiloader}
            </View>
        )
    }
}

export default App;