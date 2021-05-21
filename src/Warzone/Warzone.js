import { Picker } from 'native-base';
import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Dimensions } from 'react-native';
import WarzonePlayer from './WarzonePlayer';
import ModalSelector from 'react-native-modal-selector'

const sWidth = Dimensions.get('screen').width;
    
const platforms = new Map([
    ['Playstation', 'psn'],
    ['Steam', 'steam'],
    ['Xbox', 'xbl'],
    ['Battle.Net', 'battle'],
    ['Activision (tag)', 'acti']
]);

const datas = [{
    key: 0, section: true, label: 'Platform'
}, {
    key: 1, label: 'Playstation'
}, {
    key: 2, label: 'Steam'
}, {
    key: 3, label: 'Xbox'
}, {
    key: 4, label: 'Battle.Net'
}, {
    key: 5, label: 'Activision (tag)'
}];

class Warzone extends Component {

    //States about home menu
    state = {
        username: '',
        warzone: null,
        multiplayer: false,
        match: false,
        stat: false,
        platformSelected: '',
        buttonDisabled: true
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
            marginTop: 15,
            marginLeft: 20
        },
        header: {
            flexDirection: 'row'
        },
        confirmButton: {
            marginTop: 20,
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
     confirmButtonStat = () => {
        this.setState({
            username: this.tempUsername,
            warzone: null
        });
        setTimeout(() => {
            if (this.state.stat && this.state.multiplayer) {
                this.setState({
                    warzone: <WarzonePlayer mode={"multiplayer"} playerName={this.state.username} platform={platforms.get(this.state.platformSelected)} />
                });
            } else if (this.state.stat && !this.state.multiplayer) {
                this.setState({
                    warzone: <WarzonePlayer mode={"warzone"} playerName={this.state.username} platform={platforms.get(this.state.platformSelected)} />
                });
            }
        }, 500);
    }

    /**
     * Update player's information
     */
    confirmButtonMatch = () => {
        this.setState({
            username: this.tempUsername,
            warzone: null
        });
        setTimeout(() => {
            if (this.state.match && this.state.multiplayer) {
                this.setState({
                    warzone: <WarzoneMatch mode={"multiplayer-matches"} playerName={this.state.username} platform={platforms.get(this.state.platformSelected)} />
                });
            } else if (this.state.match && !this.state.multiplayer) {
                this.setState({
                    warzone: <WarzoneMatch mode={"warzone-matches"} playerName={this.state.username} platform={platforms.get(this.state.platformSelected)} />
                });
            }
        }, 500);
    }

    dropDownChanges = (text) => {
        this.setState({platformSelected: text});
        this.setState({buttonDisabled: false});
    }

    /**
     * Graphics
     * @returns JSX.Element
     */
    render() {
        if (this.state.match) {
            return (
                <View style={{ flex: 1, flexDirection: 'column'}}>
                    <View style={this.styles.header}>
                        <TextInput style={this.styles.input} onChangeText={this.handleUsername} placeholder="Enter username" placeholderTextColor={"#000"}/>
                        <TouchableOpacity style={this.styles.confirmButton} disabled={this.state.buttonDisabled} onPressIn={this.confirmButtonStat}>
                            <Text style={this.styles.confirmText}>Confirmer</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 15, width: sWidth / 1.09, marginTop: 20 }}>
                        <ModalSelector
                            data={datas}
                            initValue="Select your platform"
                            onChange={(option)=>{
                                this.dropDownChanges(option.label);
                            }} />
                    </View>
                    {this.state.warzone}
                </View>
            );
        } else if (this.state.stat) {
            return (
                <View style={{ flex: 1, flexDirection: 'column'}}>
                    <View style={this.styles.header}>
                        <TextInput style={this.styles.input} onChangeText={this.handleUsername} placeholder="Enter username" placeholderTextColor={"#000"}/>
                        <TouchableOpacity style={this.styles.confirmButton} disabled={this.state.buttonDisabled} onPressIn={this.confirmButtonStat}>
                            <Text style={this.styles.confirmText}>Confirmer</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: 15, width: sWidth / 1.09, marginTop: 20 }}>
                        <ModalSelector
                            data={datas}
                            initValue="Select your platform"
                            onChange={(option)=>{
                                this.dropDownChanges(option.label);
                            }} />
                    </View>
                    {this.state.warzone}
                </View>
            );
        }
    }
}

export default Warzone;