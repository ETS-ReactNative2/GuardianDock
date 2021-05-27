import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, ImageBackground } from 'react-native';
import FortniteNews from './FortniteNews';
import FortnitePlayer from './FortnitePlayer';
import { Dimensions } from 'react-native';
import ModalSelector from 'react-native-modal-selector';

const sWidth = Dimensions.get('screen').width;
const sHeight = Dimensions.get('screen').height;

/**
 * Platforms to be used for the News class
 */
const platforms = new Map([
    ['Battle Royale', 'br'],
    ['Save The World', 'stw'],
    ['Creative', 'creative']
]);

/**
 * Data to be used with the news
 */
const datas = [{
    key: 0, section: true, label: 'Gamemode'
}, {
    key: 1, label: 'Battle Royale'
}, {
    key: 2, label: 'Save The World'
}, {
    key: 3, label: 'Creative'
}];

/**
 * Home class about Fortnite
 */
class Fortnite extends Component {

    //States about Fortnite home menu
    state = {
        username: '',
        fortnite: null,
        type: '',
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
            marginLeft: 20,
            marginTop: 20
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
     * Component Fortnite CTOR
     * @param {*} props Props containing 3 bools, news, match, stat
     */
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
                <View style={{ flex: 1, flexDirection: 'column'}}>
                    <ImageBackground source={require('../../assets/FortniteBackground.jpg')} style={{width: sWidth, height: sHeight}}>
                        <ModalSelector
                            style={{marginTop: 10}}
                            data={datas}
                            initValue="Select your gamemode"
                            onChange={(option)=>{
                                this.setState({
                                    fortnite: null
                                });
                                setTimeout(() => {
                                    this.setState({
                                        fortnite: <FortniteNews type={platforms.get(option.label)}/>
                                    });
                                }, 500);
                            }}
                        />
                        {this.state.fortnite}
                    </ImageBackground>
                </View>
            );
        }
        return (
            <View style={{ flex: 1, flexDirection: 'column'}}>
                <ImageBackground source={require('../../assets/FortniteBackground.jpg')} style={{width: sWidth, height: sHeight}}>
                    <View style={this.styles.header}>
                        <TextInput style={this.styles.input} onChangeText={this.handleUsername} placeholder="Enter username" placeholderTextColor={"#000"}/>
                        <TouchableOpacity style={this.styles.confirmButton} onPressIn={this.confirmButton}>
                            <Text style={this.styles.confirmText}>Confirmer</Text>
                        </TouchableOpacity>
                    </View>
                    {this.state.fortnite}
                </ImageBackground>
            </View>
        )
    }
}

export default Fortnite;