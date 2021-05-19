import { super } from 'jscodeshift';
import React,  { Component } from 'react';
import  { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

class Destiny extends Component  {

    //States about home menu
    state =  {
        username: '',
        destiny: null,
        stat: false,
        inventory: false,
        news: false
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

    constructor(props)  {
        super(props);
        this.state.news = props.news;
        this.state.inventory = props.inventory;
        this.state.stat = props.stat;
    }

    handleUsername = (text) => {
        this.tempUsername = text;
    }

    confirmButton = () => {
        this.setState({
            username: this.tempUsername,
            destiny: null
        });
        setTimeout(() => {
            if (this.state.news) {
                //TODO: DestinyNews class
            } else if (this.state.stat) {
                this.setState({
                    destiny: <DestinyPlayer url="" />
                })
            }
        })
    }

};