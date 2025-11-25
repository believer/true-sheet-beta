import { TrueSheet } from "@lodev09/react-native-true-sheet";
import {
	createStaticNavigation,
	type StaticParamList,
	useNavigation,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { Button, Text, useWindowDimensions, View } from "react-native";

function ModalScreen() {
	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text>Modal Screen</Text>
			<TrueSheet detents={[0.6]} initialDetentIndex={0}>
				<Text>Inside sheet</Text>
			</TrueSheet>
		</View>
	);
}

function ModalScreenWithDetentUpdate() {
	const [detents, setDetents] = React.useState([0.6]);
	const { height } = useWindowDimensions();

	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text>Modal Screen</Text>
			<TrueSheet detents={detents} initialDetentIndex={0}>
				<View
					onLayout={(event) => {
						const viewHeight = event.nativeEvent.layout.height;

						setDetents([(viewHeight + 40) / height]);
					}}
				>
					<Text>Inside sheet</Text>
				</View>
			</TrueSheet>
		</View>
	);
}

function HomeScreen() {
	const navigation = useNavigation();

	return (
		<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
			<Text>Home Screen</Text>
			<Button title="Modal" onPress={() => navigation.navigate("Modal")} />
			<Button
				title="Modal with detent update"
				onPress={() => navigation.navigate("ModalWithDetents")}
			/>
		</View>
	);
}

const RootStack = createNativeStackNavigator({
	screens: {
		Home: HomeScreen,
		Modal: ModalScreen,
		ModalWithDetents: ModalScreenWithDetentUpdate,
	},
});

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootStackParamList {}
	}
}

const Navigation = createStaticNavigation(RootStack);

export default function App() {
	return <Navigation />;
}
