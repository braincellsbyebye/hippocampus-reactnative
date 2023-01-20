import React, { useState, useEffect } from 'react';
import {View, Button, Text, TextInput, StyleSheet, Alert, TouchableOpacity, Modal} from 'react-native';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { MDPicker } from './components/MD';
import { Dropdown } from 'react-native-element-dropdown';


const AptView = ( {navigation} ) => {
    const [name, setName] = useState('');
    const [purpose, setPurpose] = useState('');

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const [isModalVisible, setisModalVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const [date, setDate] = useState(new Date());

    //timepicker
    const [focus, setfocus] = useState(false);
    const [value, setValue] = useState(null);
    const [newtime, setNewTime] = useState([]);

    const gettime = async () => {
        try {
        const response = await fetch(`http://10.0.2.2:8000/api/allapt`,{
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
            },
        });
        const json = await response.json();
        const selectTime = json.apt.map((apt) => ({
            label: apt.apttime,
            value: apt.apttime,
        }));
        const selectDate = json.apt.map((appointment) => (
            appointment.aptdate
        ));
        const data = [
          {label: '9:00AM-10:00AM', value: '9:00AM-10:00AM'},
          {label: '10:00AM-11:00AM', value: '10:00AM-11:00AM'},
          {label: '11:00AM-12:00PM', value: '11:00AM-12:00PM'},
          {label: '1:00PM-2:00PM', value: '1:00PM-2:00PM'},
          {label: '2:00PM-3:00PM', value: '2:00PM-3:00PM'},
          {label: '3:00PM-4:00PM', value: '3:00PM-4:00PM'},
          {label: '4:00PM-5:00PM', value: '4:00PM-5:00PM'},
        ];

        console.log(selectDate)

        // if the selected date exists in the API, this will remove the time that already exists in the API
        if (selectDate.includes(date.toLocaleDateString()) == true)
        { 
            filteredArray = data.filter(array => !selectTime.find(label => (label.label === array.label && array.value === label.value) ))
            setNewTime(filteredArray);
        } 
        // if not, return all time in data
        if (selectDate.includes(date.toLocaleDateString()) == false)
        {
            setNewTime(data);
        }
        } catch (error) {
        console.error(error);
        } finally {
        setLoading(false);
        }
    }


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


    var x = global.id
    var y = global.fname
    var z = global.lname
    var v_ver = "Processing"
    var ct = "Dental"

    const getApt = async () => {
        try {
        const response = await fetch('http://10.0.2.2:8000/api/appointment',{
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + token
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

    useEffect(() => {
        getApt();
        gettime();
    }, []);

    const AddMeds = async () => {
        try{
            const res = await fetch('http://10.0.2.2:8000/api/medapp', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                },
                body: JSON.stringify({
                    fname: y,
                    lname: z,
                    aptcategory: ct,
                    aptdate: date.toLocaleDateString(),
                    apttime: value,
                    aptpurpose: purpose,
                    user_id: x,
                })
            });
            if ((res).status === 200) {
                setPurpose('');
            }
        const json = await res.json();
        console.log(json)
        setData(json.meds);
        } catch (error) {
        console.error(error);
        } finally {
        setLoading(false);
        }
    }

    const AddApt = async () => {
        try{
            const response = await fetch('http://10.0.2.2:8000/api/addapt', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + token
                },
                body: JSON.stringify({
                    fname: y,
                    lname: z,
                    aptcategory: ct,
                    aptdate: date.toLocaleDateString(),
                    apttime: value,
                    aptpurpose: purpose,
                    aptverify: v_ver,
                    user_id: x,
                })
            });
            if ((response).status === 200) {
                setPurpose('');
            }
        const json = await response.json();
        setData(json.appointment);
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
            AddApt();
            AddMeds();
            Alert.alert('Appointment Set!');
            navigation.navigate('Appointment');
        }else{
            Alert.alert("Error!", errors.join('\n'))
        }
    }

    return(
        <View style = {{ flex: 1, justifyContent: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor:'#E8EBFF'}}>
            
            <Text style={styles.appt1}>{ct} Appointment</Text>

            <TouchableOpacity onPress={showDatepicker} style={styles.appButtonContainer1}>
                <Text style={styles.appButtonText}>Select Date</Text>
            </TouchableOpacity>

            <Text style={styles.date}>{date.toLocaleDateString()}</Text>

            <Dropdown
                style={[styles.input, focus]}
                iconStyle={styles.iconStyle}
                data={newtime}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!focus ? 'Select Time' : '...'}
                searchPlaceholder="Search..."
                value={value}
                onFocus={() => [setfocus(true), gettime()]}
                onBlur={() => setfocus(false)}
                onChange={item => {
                setValue(item.value);
                setfocus(false);
                }}
            />


            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [setPurpose(text)] }
            placeholder='Enter purpose'
            placeholderTextColor= 'gray'
            value={purpose}
            />

            <TouchableOpacity onPress={  user_validation } style={styles.appButtonContainer}>
                <Text style={styles.appButtonText}>Set Appointment</Text>
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

export default AptView;