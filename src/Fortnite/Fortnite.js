import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import FortniteNews from './FortniteNews';
import FortnitePlayer from './FortnitePlayer';
import { Dimensions } from 'react-native';
import ModalSelector from 'react-native-modal-selector';

const sWidth = Dimensions.get('screen').width;
const platforms = new Map([
    ['Battle Royale', 'br'],
    ['Save The World', 'stw'],
    ['Creative', 'creative']
]);

const datas = [{
    key: 0, section: true, label: 'Platform'
}, {
    key: 1, label: 'Battle Royale'
}, {
    key: 2, label: 'Save The World'
}, {
    key: 3, label: 'Creative'
}];

class Fortnite extends Component {

    //States about home menu
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