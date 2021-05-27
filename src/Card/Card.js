import React from "react";
import { Text, TouchableOpacity, Image, StyleSheet, View, Modal, Linking } from "react-native";
import { Dimensions } from 'react-native';
import Video from "react-native-video";

const sWidth = Dimensions.get('screen').width;
const sHeight = Dimensions.get('screen').height;

/**
 * Class Card created by us
 * @extends React.Component a component made to create an element called "Card"
 */
class Card extends React.Component {

    /**
     * State into Card component
     */
    state = {
        title: '',
        subtitle: '',
        image: '',
        description: '',
        video: '',
        isVisible: false,
        videoVisible: false,
        redirect: null
    };

    /**
     * Card CTOR
     */
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            subtitle: props.subtitle,
            image: props.image,
            description: props.description,
            video: props.video ? props.video : undefined,
            redirect: props.link ? props.link : undefined,
            isVisible: false,
            videoVisible: false
        };
    }

    goToURL() {
        if (this.state.redirect === undefined) return;
        Linking.canOpenURL(this.state.redirect).then(supported => {
            if (supported)
                Linking.openURL(this.state.redirect)
        });
    }

    /**
     * Render function for the Card component
     * @returns JSX.Element
     */
    render() {
        return (
            <View>
                <View style={{backgroundColor: "black"}}>
                    <Modal animationType="slide" visible={this.state.videoVisible} onRequestClose={() => this.setState({ videoVisible: false, isVisible: true })}>
                        <Video style={styles.backgroundVideo} source={{uri: this.state.video}}
                        ref={(ref) => {
                            this.player = ref
                        }}
                        muted={false}
                        resizeMode="cover"
                        repeat={false}
                        playInBackground={false}
                        playWhenInactive={false}
                        controls={true}
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
                                    <Text>Regarder la vidéo (Pas disponible pour l'instant)</Text>
                                </TouchableOpacity>}
                                <Text style={{ fontSize: 18, fontWeight: "bold", color: this.state.redirect ? "blue" : "black"}} onPress={() => this.goToURL()}>
                                    {this.state.subtitle + '\n'}
                                </Text>
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
                        <Text style={{ alignSelf: "center", fontSize: 15, fontWeight: "bold", color: this.state.redirect ? "aliceblue" : "white"}} onPress={() => this.goToURL()}>
                            {this.state.title}
                        </Text>
                        <Text style={{ alignSelf: "center", fontSize: 12, color: this.state.subtitle ? "white" : "black" }}>{this.state.subtitle}</Text>
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
        backgroundColor: "transparent",
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