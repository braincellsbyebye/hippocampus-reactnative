import React, { useState, useEffect } from 'react';
import {View, Button, Text, TextInput, StyleSheet, Alert,TouchableOpacity} from 'react-native';

const Signup = ( {navigation} ) => {
    const [name, setUsername] = useState('');
    const [fname, setFname] = useState('');
    const [lname, setLname] = useState('');
    const [email, setEmail] = useState('');
    const [pw, setPw] = useState('');

    const [isLoading, setLoading] = useState(true);
    const [data, setData] = useState([]);

    const [checkValidPW, setCheckValidPw] = useState(false);
    const [checkValidUN, setCheckValidUN] = useState(false);

    const AddUser = async () => {
        try{
            const response = await fetch('http://10.0.2.2:8000/api/jwtregister', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    fname: fname,
                    lname: lname,
                    email: email,
                    password: pw,
                })
            });
            if ((response).status === 201) {
                setUsername('');
                setFname('');
                setLname('');
                setEmail('');
                setPw('');
            }
        const json = await response.json();
        setData(json.useracc);
        } catch (error) {
        console.error(error);
        } finally {
        setLoading(false);
        }
    }

    const [chkemail, setchkemail] = useState(false);
    const checkemail = text => {
          let regex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
  
          if(regex.test(text)){
              setchkemail(false);
          } else {
              setchkemail(true);
          }
      }

      const checkPW = text => {
        if (text.length < 8){
            setCheckValidPw(true);
        }else{
            setCheckValidPw(false);
        }
    }

    const checkUN = text => {
        if (text.length < 4){
            setCheckValidUN(true);
        }else{
            setCheckValidUN(false);
        }
    }

      const user_validation = () => {
        errors = [];

        let regex2 = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
        if(regex2.test(email) == false){
            errors.push("Invalid Email format")
        }
        if (name.length < 4){
            errors.push("Username should have at least 4 characters")
        }
        if (pw.length < 8){
            errors.push("Password should have at least 8 characters")
        }
        if (errors.length == 0){
            AddUser();
            Alert.alert('User Created!');
            navigation.navigate('LoginForm');
        }else{
            Alert.alert("Error!", errors.join('\n'))
        }
    }

    return(
        <View style = {{ flex: 1, justifyContent: 'center', justifyContent: 'center', alignItems: 'center'}}>
            <View style={styles.ovalShape}></View>
            <View>
                <Text style={styles.headerText}>'Hippo-Campus'</Text> 
            </View>

            <View>
                <Text style={styles.subheaderText}>MSEUF’s first beta web based and mobile 
                application clinic management system </Text> 
            </View>

                
            <View>
                <Text style={styles.titlesign}>SIGNUP</Text> 
            </View>

            <TextInput 
            style = { styles.input1 }
            onChangeText = { (text) => [ checkUN(text), setUsername(text)] }
            placeholder='Enter Username'
            placeholderTextColor= 'gray'
            maxLength={15} 
            />
            {
            checkValidUN ? (
                <Text style={{ color: 'red' }}>Invalid Username Format</Text>
                ) : (
                <Text></Text>
            )
            }
            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [setFname(text)] }
            placeholder='Enter First Name'
            placeholderTextColor= 'gray'
            maxLength={30} 
            />
            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [setLname(text)] }
            placeholder='Enter Last Name'
            placeholderTextColor= 'gray'
            maxLength={30} 
            />
            <TextInput 
            style = { styles.input }
            onChangeText = { (text) => [checkemail(text), setEmail(text)] }
            placeholder='Enter Email'
            placeholderTextColor= 'gray'
            />
            {
            chkemail ? (
                <Text style={{ color: 'red' }}>Invalid Email Format</Text>
                ) : (
                <Text></Text>
            )
            }
            <TextInput 
            style = { styles.input2 }
            onChangeText = { (text) => [checkPW(text), setPw(text)] }
            placeholder='Enter Password'
            placeholderTextColor= 'gray'
            secureTextEntry
            />
            {
            checkValidPW ? (
                <Text style={{ color: 'red' }}>Invalid Password Format</Text>
                ) : (
                <Text></Text>
            )
            }

        <TouchableOpacity 
         style={styles.button}
         title='Sign Up'
         onPress={user_validation}
            >
        <Text style={styles.text}>Signup</Text>
        </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    ovalShape:{
        marginTop:-10,
        width:250,
        height:120,
        borderRadius:90,
        transform: [{scale:2}],
        backgroundColor:"#6C85BD",
        opacity:0.3,
       },

       titlesign:{
        fontSize:50,
        marginTop:90,
        color:"black",
        fontFamily:"sans-serif-condensed",
       },

    input: {
        marginTop:10,
        paddingTop:5,
        borderWidth:1,
        borderRadius:10,
        marginBottom:10,
        width:290,
    },
    input1: {
        marginTop:15,
        paddingTop:5,
        borderWidth:1,
        borderRadius:10,
        marginBottom:10,
        width:290,
    },
    input2: {
        marginTop:-10,
        paddingTop:5,
        borderWidth:1,
        borderRadius:10,
        marginBottom:10,
        width:290,
    },

    headerText:{
        fontSize:32,
        textAlign:"center",
        fontWeight:"bold",
        marginTop:-80,
        fontFamily:"sans-serif-light",
        color:"black"
    
      },
      subheaderText:{
       fontSize:13,
       textAlign:"center",
       marginTop:-30,
       color:"black",
       fontWeight:"bold",
       fontFamily:"sans-serif-thin",
       justifyContent:"center",
     
     },

     text: {
        fontSize: 30,
        color: "white",
        alignSelf: "center",
        paddingLeft:5,
        fontFamily:"sans-serif-condensed"
      },
      button:{
       backgroundColor:'#011387',
       height:40,
       width:205,
       borderRadius:10,
       marginTop:15,
       marginLeft:5,
     },

})

export default Signup;