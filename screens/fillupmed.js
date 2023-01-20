import React, { useState, useEffect } from 'react';
import {View, Button, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Modal} from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Dropdown } from 'react-native-element-dropdown';


const FillUpReqMed = ( {navigation} ) => {
    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [purpose, setPurpose] = useState('');
    const [date, setDate] = useState(new Date());

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setDate(currentDate);
      };
    
    const showMode = (currentMode) => {
        var date = new Date()
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            minimumDate: (date),
            maximumDate: (new Date(date.getFullYear(), date.getMonth(), date.getDate()+6)),
            is24Hour: true,
        }, 
    );
    };

    const showDatepicker = () => {
        showMode('date');

    };


    var v_id = global.id
    var v_fname = global.fname
    var v_lname = global.lname
    var v_ver = "Processing"
    var v_doc = "TBA"
    var dateissue = 'Processing'
    var diag = 'TBA'

    const ReqCert = async () => {
        try{
            const response = await fetch('http://10.0.2.2:8000/api/reqmed', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body: JSON.stringify({
                    fname: v_fname,
                    lname: v_lname,
                    date: dateissue,
                    verdict: v_ver,
                    purpose: purpose,
                    diagnosis: diag,
                    doctor: v_doc,
                    uid: v_id,
                })
            });
        const json = await response.json();
        setData(json.reqmed);
        } catch (error) {
        console.error(error);
        } finally {
        setLoading(false);
        }
    }

    const user_validation = () => {
        errors = [];
        if (purpose.length == 0){
            errors.push("Complete the Form")
        }
        if (errors.length == 0){
            ReqCert();
            Alert.alert('Request Successful!');
            navigation.navigate('RequestMedicalCertificate');
        }else{
            Alert.alert("Error!", errors.join('\n'))
        }
    }

    return(
        <View style = {{ flex: 1, justifyContent: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor:'#E8EBFF'}}>
            
            <Text style={styles.appt1}>Request Medical Certificate</Text>

            <Text style={styles.date}>{date.toLocaleDateString()}</Text>

            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [setPurpose(text)] }
            placeholder='Enter purpose'
            placeholderTextColor= 'gray'
            value={purpose}
            />

            <TouchableOpacity onPress={  user_validation } style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Request</Text>
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    appt1:{
        fontSize:35,
        fontFamily:'sans-serif-condensed',
        marginTop:-25,
        color:'black'

    },
    appButtonContainer: {
        elevation: 8,
        backgroundColor: "#011387",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop:35
      },
      appButtonText: {
        fontSize: 18,
        color: "white",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
      },
      appButtonContainer1: {
        elevation: 8,
        backgroundColor: "#011387",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        marginTop:50
      },
    input: {
        marginTop:10,
        paddingTop:5,
        borderWidth:1,
        borderRadius:10,
        marginBottom:10,
        width:290,
    },
    opt: {
        marginTop:10,
        paddingTop:12,
        paddingBottom:12,
        borderWidth:1,
        borderRadius:10,
        marginBottom:10,
        width:290,
    },
    date:{
        fontSize:25,
        fontFamily:'sans-serif-condensed',
        marginTop:15,
        color:'black'

    },
})

export default FillUpReqMed;