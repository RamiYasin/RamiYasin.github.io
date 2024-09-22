import { View, StyleSheet, Text, Image, Pressable } from "react-native";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';

export default function Welcomepage() {
    const navigation = useNavigation();
    const onPress = () => { navigation.navigate('Chat'); }
    return (
        <View style={styles.maincontainer}>
            <View style={styles.titelcontainer}>
            <Text style={styles.titeltext}>Welcome to RamisGPT</Text>
            </View>
            <View style={styles.imagecontainer}>
                <Image source={require('../assets/ro.jpg')} style={styles.image}>

                </Image>
            </View>
            <View style={styles.buttoncontainer}>
                <Text style={styles.DescText}>Start using RamisGPT, it's free, Ask anything</Text>
                <Pressable style={styles.button} onPress={onPress}>
                     <Text style={styles.text}>Start</Text>
                </Pressable>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({

    maincontainer: {
        backgroundColor: '#F8F8FF',
        height: hp('100%'),
    },
    titelcontainer: {    
        alignItems: 'center',
        justifyContent: 'center',   
        
        marginBottom:20
    },
    titeltext: {
        marginTop: 30,
        fontSize: 30,
        fontWeight: 'bold',
        color: '#333333',
    },
    imagecontainer: {
        alignItems: 'center',
        justifyContent: 'center',   
        
    },
    image: {
        height: hp('45%'),
        resizeMode: 'contain',
    },
    buttoncontainer: {
        alignItems: 'center',
        justifyContent: 'center',   
        marginLeft:50,
        marginRight:50,
    },  
    DescText: { 
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333333',
        fontFamily: 'sans-serif',
        marginBottom: 20,
        marginTop: 20
    },  
    button: {
        marginTop: 20,
        borderRadius: 20,
        backgroundColor: '#00bfff',
        padding: 10,
        width: wp('30%'),

    },
    text: {
        fontWeight: 'bold',
        textAlign: 'center',
    },

})