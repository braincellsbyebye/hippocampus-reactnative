import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity, ActivityIndicator, FlatList, ScrollView} from 'react-native';

const IndexScreen = ( {navigation} ) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    let parameter = global.id
    let x = global.token

    const getApt = async () => {
        try {
        const response = await fetch(`http://10.0.2.2:8000/api/apt/${parameter}`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + x
            },
        });
        const json = await response.json();
        setData(json.appointment);
        } catch (error) {
        console.error(error);
        } finally {
        setLoading(false);
        }
    }

    const refresh =  () => {
        setLoading(true);
        getApt();
      }

    useEffect(() => {
        getApt();
    }, []);
    return(
        <View style={{ flex:1, }}>
            <View style = {{ backgroundColor: "#011387",flex: 0.5}}>
                <Text style = {{ fontSize: 18, color: 'white', marginTop: 10, marginLeft: 10}}>WELCOME!</Text>
                <Image style={styles.gt2} source = { require('../images/userpic.png')}/>
                <Text style = {styles.gt3}>{global.username}</Text>
                <Text style = {styles.gt4}>{global.email}</Text>
                <Image style={styles.gt5} source = { require('../images/logo2.png')}/>
            </View>
            <View style = {{ backgroundColor: "white",flex: 1, borderRadius:20, marginTop: -95, alignItems:'center'}}>
                <View style={{ marginLeft: 15, marginTop: 15,}}>
                    <Text style={styles.an}>Approved Appointments</Text>
                    {isLoading ? <ActivityIndicator/> : (
                    <FlatList
                        style = {{ marginTop: -50 }}
                        data={data}
                        keyExtractor={({ id }, index) => id}
                        renderItem={({ item }) => (
                            <ScrollView>
                                <TouchableOpacity onPress={() => {navigation.navigate('Details', {item:item})}}>
                                    <View style={styles.cont}>
                                        <Text style = {styles.txt}>{item.aptcategory}</Text>
                                        <Text style={{ marginTop: -10 }}>________________________</Text>
                                        <Text style = {styles.txt1}>{item.aptdate}</Text>
                                        <Text style = {styles.txt1}>{item.apttime}</Text>
                                    </View>
                                </TouchableOpacity>
                            </ScrollView>
                        )}
                    />
                    )}
                </View>
                <View style={{ marginTop: -60, marginRight: 450 }}>
                    <TouchableOpacity style={styles.ref} onPress={refresh} >
                        <Text style={{ textAlign: 'center', color: 'white', fontWeight: 'bold' }}>Refresh</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    txt: {
        color: 'black',
        textAlign:'center',
        fontSize: 16,
        fontWeight:'bold'
    },
    ref: {
        backgroundColor: '#011387',
        textAlign:'center',
        fontSize: 15,
        padding: 10,
        width: 100,
        borderRadius: 20,
        marginLeft: 240,
        marginTop: -10,
    },
    txt1: {
        color: 'black',
        textAlign:'center',
        fontSize: 15,
        fontFamily:'sans-serif-condensed'
    },
    cont: {
        backgroundColor: '#E8EBFF',
        width: 160,
        borderRadius: 10,
        height: 75,
        marginTop: 10,
        alignSelf:'center'
    },
    cont1: {
        backgroundColor: '#DBE0FC',
        width: 160,
        borderRadius: 10,
        height: 70,
        marginTop: 10,
        marginLeft:200
    },
    an: {
        marginTop:30,
        marginBottom: 55,
        fontWeight:'bold',
        color: 'black',
        fontSize:25,
    },
    sp: {
        marginLeft:250,
        marginTop:-73,
        fontWeight: 'bold',
        color: 'black'
    },
    editprof: {
      backgroundColor: 'white',
      padding:5,
      borderRadius: 20,
      width: 150,
      alignItems: 'center',
      marginTop:15,
    },
    gt: {
        width:10,
        height:10,
        marginLeft: 110,
        marginTop: -12,
      },
    gt2: {
        width:50,
        height:50,
        borderRadius: 50,
        marginTop: 15,
        marginLeft: 10,
    },
    gt5: {
        width:100,
        height:100,
        borderRadius: 50,
        marginTop: -60,
        marginLeft: 270,
        },
    gt3: {
        color: 'white',
        marginLeft: 75,
        marginTop: -45,
        fontSize: 15,
        },
    gt4: {
        color: 'white',
        marginLeft: 75,
        fontSize:11,
        },
    gt1: {
        width:10,
        height:10,
        marginLeft: 290,
        marginTop: -12,
      },
  })
export default IndexScreen;