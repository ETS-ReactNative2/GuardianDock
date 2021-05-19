import { Button, Container } from "native-base";
import React from "react";
import { Text, TouchableOpacity, Image, StyleSheet, View, Modal } from "react-native";
import { Dimensions } from 'react-native';
import Video from "react-native-video";

const sWidth = Dimensions.get('screen').width;
const sHeight = Dimensions.get('screen').height;

/**
 * Class Card
 */
class Card extends React.Component {

    /**
     * State into the api loader
     */
    state = {
        title: '',
        subtitle: '',
        image: '',
        description: '',
        video: '',
        isVisible: false,
        videoVisible: false
    };

    /**
     * Component CTOR
     */
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            subtitle: props.subtitle,
            image: props.image,
            description: props.description,
            video: props.video ? props.video : undefined,
            isVisible: false,
            videoVisible: false
        };
        this.onEnd = this.onEnd.bind(this);
        this.videoError = this.onError.bind(this);
        this.onBuffer = this.onBuffer.bind(this);
    }
    
      onEnd(){
        console.log('onEnd');
      }
    
      onError(){
        console.log('onError');
      }
    
      onBuffer(){
        console.log('onBuffer');
      }

    render() {
        return (
            <View>
                <View style={{backgroundColor: "black"}}>
                    <Modal animationType="slide" visible={this.state.videoVisible} onRequestClose={() => this.setState({ videoVisible: false, isVisible: true })}>
                        <Video style={styles.backgroundVideo} source={{uri: this.state.video}}
                        ref={(ref) => {
                            this.player = ref
                        }}
                        muted={false}                           // Mutes the audio entirely.                  
                        resizeMode="cover"                      // Fill the whole screen at aspect ratio.*
                        repeat={false}                           // Repeat forever.
                        playInBackground={false}                // Audio continues to play when app entering background.
                        playWhenInactive={false}
                        controls={true}
                        onBuffer={this.onBuffer}                // Callback when remote video is buffering
                        onEnd={this.onEnd}                      // Callback when playback finishes
                        onError={this.videoError}  
                        onEnd={() => this.setState({ videoVisible: false, isVisible: true })}/>
                    </Modal>
                </View>
                <View>
                    <Modal animationType="slide" visible={this.state.isVisible} onRequestClose={() => this.setState({ isVisible: false })}>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: 22 }}>
                            <View style={styles.modalView}>
                                {this.state.video === undefined ? 
                                <Image style={{
                                    width: sWidth - 50,
                                    height: 200
                                }} source={{ uri: this.state.image }} /> : 
                                <TouchableOpacity onPress={() => this.setState({ videoVisible: true, isVisible: false })}>
                                    <Text>Regarder la vidéo (Changer de module...)</Text>    
                                </TouchableOpacity>}
                                <Text style={{ fontSize: 18 }}>{this.state.subtitle +"\n"}</Text>
                                <Text style={{ fontSize: 15 }}>{this.state.description}</Text>
                            </View>
                        </View>
                    </Modal>
                </View>
                <View>
                    <TouchableOpacity key={this.state.title} style={styles.card} onPress={() => this.setState({ isVisible: true })}>
                        <Image style={{
                            width: sWidth,
                            height: 200
                        }} source={{ uri: this.state.image }} />
                        <Text style={{ alignSelf: "center", fontSize: 15 }}>{this.state.title}</Text>
                        <Text style={{ alignSelf: "center", fontSize: 12 }}>{this.state.subtitle}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    card: {
        width: sWidth,
        alignSelf: "center",
        height: sHeight / 3
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
});

export default Card;