import { StyleSheet, Text, ImageBackground, TextInput, TouchableOpacity, View } from 'react-native';
import { Dimensions } from 'react-native';
import React, { Component } from 'react';
import ModalSelector from 'react-native-modal-selector';
import DestinyInventory from './DestinyInventory';
import DestinyPlayer from './DestinyPlayer';
import DestinyNews from './DestinyNews';

const sWidth = Dimensions.get('screen').width;
const sHeight = Dimensions.get('screen').height;

/**
 * Platforms to be used for the News class
 */
const platforms = new Map([
    ['Playstation', 2],
    ['Xbox', 1],
    ['Blizzard', 4],
    ['Other', -1],
]);

/**
 * Data to be used with the news
 */
const datas = [{
    key: 0, section: true, label: 'Platform'
}, {
    key: 1, label: 'Playstation'
}, {
    key: 2, label: 'Xbox Live'
}, {
    key: 3, label: 'Battle.net'
}, {
    key: 4, label: 'Other'
}];

/**
 * Home class about Destiny
 */
class Destiny extends Component  {

    //States about DestinyHome
    state =  {
        username: '',
        destiny: null,
        stat: false,
        inventory: false,
        news: false,
        platformSelected: '',
        buttonDisabled: true
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
     * Component Destiny CTOR
     * @param {*} props Props containing 3 bools : news, inventory, stat 
     */
    constructor(props)  {
        super(props);
        this.state.news = props.news;
        this.state.inventory = props.inventory;
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
            destiny: null
        });
        setTimeout(() => {
            if (this.state.stat) {
                this.setState({
                    destiny: <DestinyPlayer platformId={platforms.get(this.state.platformSelected)} playerName={this.state.username} stat={true} />
                })
            }
        }, 500);
    }

    /**
     * Event triggered when a platform is selected
     */
    dropDownChanges = (text) => {
        this.setState({platformSelected: text});
        this.setState({buttonDisabled: false});
    }

    /**
     * Graphics
     * @returns JSX.Element
     */
    render() {
        if (this.state.stat) {
            return (
                <ImageBackground source={require('../../assets/D2Background.jpg')} style={{width: sWidth, height: sHeight}}>
                    <View style={{ flex: 1, flexDirection: 'column'}}>
                        <View style={this.styles.header}>
                            <TextInput style={this.styles.input} onChangeText={this.handleUsername} placeholder="Enter username" placeholderTextColor={"#000"}/>
                            <TouchableOpacity style={this.styles.confirmButton} disabled={this.state.buttonDisabled} onPressIn={this.confirmButton}>
                                <Text style={this.styles.confirmText}>Confirmer</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginLeft: 15, width: sWidth / 1.09, marginTop: 20 }}>
                            <ModalSelector
                                data={datas}
                                initValue="Select your platform"
                                selectedItemTextStyle={{color: 'white'}}
                                onChange={(option)=>{
                                    this.dropDownChanges(option.label);
                                }} />
                        </View>
                        {this.state.destiny}
                    </View>
                </ImageBackground>
            )
        } else if (this.state.news) {
            return (
                <View style={{ flex: 1, flexDirection: 'column'}}>
                    <ImageBackground source={require('../../assets/D2Background.jpg')} style={{width: sWidth, height: sHeight}}>
                        <DestinyNews/>
                    </ImageBackground>
                </View>
            )
        } else if (this.state.inventory) {
            return (
                <View style={{ flex: 1, flexDirection: 'column'}}>
                    <ImageBackground>
                        <DestinyInventory/>
                    </ImageBackground>
                </View>
            )
        }
    }

};

export default Destiny;