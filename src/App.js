/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { drawerItemsMain } from './drawerItemsMain';
import CustomDrawerContent from './CustomDrawerContent.js';
import CustomHeader from './CustomHeader';
import Fortnite from './Fortnite/Fortnite';
import Warzone from './Warzone/Warzone';

const Drawer = createDrawerNavigator();

function HomeScreen() {
	return (
		<View style={{ flex: 1, justifyContent: 'center' }}>
			<Text style={styles.title}>GuardianDock</Text>
			<Text/>
			<Text>GuardianDock est une application conçue par des joueurs pour des joueurs.</Text>
			<Text>Sur cette application nous pouvons y voir nos statistiques, matchs concernant 3 jeux : {"\n"}
			- Fortnite{"\n"}
			- Destiny 2{"\n"}
			- Call Of Duty Modern Warfare (Warzone + Multijoueur)</Text>
			<Text>De plus, pour certains jeux, nous pouvons également y retrouver les nouveautés.</Text>
		</View>
	);
}

function InventaireScreen() {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Welcome to our beautiful application named GuardianDock!</Text>
		</View>
	);
}

function StatistiqueD2Screen() {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Welcome to our beautiful application named GuardianDock!</Text>
		</View>
	);
}

function NouveautésD2Screen() {
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<Text>Welcome to our beautiful application named GuardianDock!</Text>
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
			<Drawer.Screen name="Statistiques Destiny2" component={StatistiqueD2Screen}></Drawer.Screen>
			<Drawer.Screen name="Nouveautés Destiny2" component={NouveautésD2Screen}></Drawer.Screen>
			<Drawer.Screen name="Statistiques Warzone">
				{() => <Warzone news={false} match={false} mode={false} stat={true}/>}
			</Drawer.Screen>
			<Drawer.Screen name="Match Warzone">
				{() => <Warzone news={false} match={true} mode={false} stat={false}/>}
			</Drawer.Screen>
			<Drawer.Screen name="Statistiques Multiplayer">
				{() => <Warzone news={false} match={false} mode={true} stat={true}/>}
			</Drawer.Screen>
			<Drawer.Screen name="Match Multiplayer">
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
		fontSize: 30,
		fontWeight: "bold"
	}
});

export default App;
