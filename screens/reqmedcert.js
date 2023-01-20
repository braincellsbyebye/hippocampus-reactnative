import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';

const ReqMed = ( {navigation} ) => {
    
    return(
        <View style = {{ flex: 1, justifyContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
            <Image source = { require('../images/medcertificate.png')}/>
            <Text style = {{ fontSize: 20, color: 'black'}}>Request Your Medical Certificate</Text>
            <Text>Strictly one certificate at a time</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Fillup')} style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Request</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('MedCert')} style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Get Certificate</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    appButtonText: {
      fontSize: 25,
      color: "white",
      alignSelf: "center",
      fontFamily:"sans-serif-condensed"
    },
    appButtonContainer: {
        backgroundColor:'#4350A8',
        height:40,
        width:205,
        borderRadius:10,
        marginTop:20,
    },
  })
export default ReqMed;