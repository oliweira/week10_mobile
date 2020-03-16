import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';

function Main({ navigation }) {
    const [currentRegion, setCurrentRegion] = useState(null);

    useEffect(() => {
        async function loadInitialPosition() {
            const { granted } = await requestPermissionsAsync();

            if (granted) {
                const { coords } = await getCurrentPositionAsync({
                    enabledHighAccuracy: true,
                });

                const { latitude, longitude } = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04,

                })
            }
        }
        
        loadInitialPosition();
    }, []);

    if (!currentRegion) {
        return null;
    }

    return(
        <MapView initialRegion={currentRegion} style={styles.map}>
            <Marker coordinate={{ latitude: -15.8291501, longitude: -47.9811394}}>
                <Image style={styles.avatar} source={{uri: 'https://avatars2.githubusercontent.com/u/1918147?s=400&u=3fce39c0f932ae979e2280940ff50dc811c7ff5c&v=4' }} />
                <Callout onPress={() => {
                    navigation.navigate('Profile', { github_username: 'oliweira' });
                }}>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>Rafael Leite</Text>
                        <Text style={styles.devBio}>Minha BIO</Text>
                        <Text style={styles.devTechs}>PHP, JS, REACTJS</Text>
                    </View>
                </Callout>
            </Marker>
        </MapView>
    )
}

const styles = StyleSheet.create({
    map: {
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF',
    },
    callout: {
        width: 260,
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    devBio: {
        color: '#666',
        marginTop: 5,
    },
    devTechs: {
        marginTop:5
    },
})

export default Main;