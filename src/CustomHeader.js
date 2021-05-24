import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    SafeAreaView,
    Image
} from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import {  } from 'native-base';

function CustomHeader(props) {
    const toggleDrawer = () =>
        props.navigation.dispatch(DrawerActions.toggleDrawer());

    return (
        <SafeAreaView>
            <View style={styles.headerContainer}>
                <View style={styles.headerLeft}>
                    <TouchableOpacity
                        onPress={toggleDrawer}
                        style={styles.leftButton}>
                        <Image source={require("../assets/menu_hamburger.png")}
                            style={styles.buttonTxt}/>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        justifyContent: 'space-around',
        minHeight: 40,
    },
    headerLeft: {
        flexDirection: 'row',
    },
    leftButton: {
        margin: 10
    },
    buttonTxt: {
        width: 30,
        height: 30
    }
});

export default CustomHeader;
