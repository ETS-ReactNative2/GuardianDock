/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View, Text, ImageBackground } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { drawerItemsMain } from './drawerItemsMain';
import CustomDrawerContent from './CustomDrawerContent.js';
import CustomHeader from './CustomHeader';
import Fortnite from './Fortnite/Fortnite';
import Warzone from './Warzone/Warzone';
import Destiny from './Destiny2/Destiny';
import { Image } from 'native-base';

const Drawer = createDrawerNavigator();

function HomeScreen() {
	return (
		<View style={{ flex: 1, justifyContent: 'center' }}>
			<Text style={styles.title}>GuardianDock</Text>
			<Text/>
			<Text style={{textAlign: 'left', marginLeft: 10}}>GuardianDock est une application conçue par des joueurs pour des joueurs.</Text>
			<Text style={{textAlign: 'left', marginLeft: 10}}>Sur cette application nous pouvons y voir nos statistiques, matchs concernant 3 jeux :</Text>
			<Text style={{textAlign: 'left', marginLeft: 10}}>{'\u2022'}Destiny 2</Text>
			<Text style={{textAlign: 'left', marginLeft: 10}}>{'\u2022'}Fortnite</Text>
			<Text style={{textAlign: 'left', marginLeft: 10}}>{'\u2022'}Call of Duty Modern Warfare (Warzone et Multijoueur){'\n'}{'\n'}</Text>
			<Text style={{textAlign: 'left', marginLeft: 10}}>De plus, pour certains jeux, nous pouvons également y retrouver les nouveautés.</Text>
		</View>
	);
}

function InventaireScreen() {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>L'inventaire Destiny 2 n'est pas encore là! Pensez à revenir plus tard!</Text>
		</View>
	);
}

const Stack = createStackNavigator();

/**
 * Fonction gérant les différents screen sur lesquels ont doit être envoyés
 * @returns JSX.Element
 */
function MainDrawerNavigation() {
	return (
		<Drawer.Navigator
			initialRouteName="Home"
			drawerContent={(props) => (
				<CustomDrawerContent drawerItems={drawerItemsMain} {...props} />
			)}>
			<Drawer.Screen name="Home" component={HomeScreen} />
			<Drawer.Screen name="Statistiques">
				{() => <Fortnite news={false} match={false} stat={true} />}
			</Drawer.Screen>
			<Drawer.Screen name="Match">
				{() => <Fortnite news={false} match={true} stat={false} />}
			</Drawer.Screen>
			<Drawer.Screen name="Nouveautés">
				{() => <Fortnite news={true} match={false} stat={false} />}
			</Drawer.Screen>
			<Drawer.Screen name="Inventaire" component={InventaireScreen}></Drawer.Screen>
			<Drawer.Screen name="Statistiques Destiny 2">
                {() => <Destiny news={false} inventory={false} stat={true} />}
            </Drawer.Screen>
			<Drawer.Screen name="Nouveautés Destiny 2">
                {() => <Destiny news={true} inventory={false} stat={false} />}
			</Drawer.Screen>
			<Drawer.Screen name="Statistiques Warzone">
				{() => <Warzone news={false} match={false} mode={false} stat={true}/>}
			</Drawer.Screen>
			<Drawer.Screen name="Match Warzone">
				{() => <Warzone news={false} match={true} mode={false} stat={false}/>}
			</Drawer.Screen>
			<Drawer.Screen name="Statistiques Multijoueur">
				{() => <Warzone news={false} match={false} mode={true} stat={true}/>}
			</Drawer.Screen>
			<Drawer.Screen name="Match Multijoueur">
				{() => <Warzone news={false} match={true} mode={true} stat={true}/>}
			</Drawer.Screen>
		</Drawer.Navigator>
	);
}

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator
				screenOptions={{
					headerMode: 'screen',
					headerTintColor: '#404554',
					headerTitleStyle: {
						fontWeight: 'bold',
					},
					header: (props) => {
						return <CustomHeader {...props} />;
					},
				}}>
				<Stack.Screen name="MainDrawer" component={MainDrawerNavigation} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

const styles = StyleSheet.create({
	title: {
		color: "white",
		fontSize: 42,
		fontWeight: "bold",
		textAlign: "center",
		backgroundColor: "#000000a0"
	}
});

export default App;
