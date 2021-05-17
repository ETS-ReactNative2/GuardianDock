import React from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    SafeAreaView,
} from 'react-native';
import { DrawerActions } from '@react-navigation/native';

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
                        <Text style={styles.buttonTxt}>MENU</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerContainer: {
        justifyContent: 'space-around',
        backgroundColor: '#222222',
        minHeight: 40,
    },
    headerLeft: {
        flexDirection: 'row',
    },
    leftButton: {
        margin: 10
    },
    buttonTxt: {
        color: '#ddd',
        fontWeight: 'bold',
    }
});

export default CustomHeader;
