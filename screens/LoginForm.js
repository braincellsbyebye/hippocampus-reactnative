import React, {useState} from 'react';
import {View, TouchableOpacity, Text, TextInput, StyleSheet} from 'react-native';

const LoginFormScreen = ( {navigation} ) => {
  const [email, setEmail] = useState();
  const [pw, setPw] = useState();

  const myfun = async () => {
    await fetch('http://10.0.2.2:8000/api/jwtlogin', {
      method:'POST',
      headers:{
        'Accept':'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'email':email, 'password':pw})
    }).then(res => res.json())
    .then(resData =>{
      if ("error" in resData) {
        alert('Login Credentials do not match')
        console.log(resData)
      } else {
        global.id = resData.user.id
        global.username = resData.user.name
        global.email = resData.user.email
        global.fname = resData.user.fname
        global.lname = resData.user.lname
        global.token = resData.authorisation.token
        setEmail('');
        setPw('');
        navigation.navigate('Index')
      }
    })
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

    return(
      <View style={styles.container}>
        <View style={styles.ovalShape}></View>
       
     <View>
       <Text style={styles.headerText}>'Hippo-Campus'</Text> 
     </View>

     <View>
     <Text style={styles.subheaderText}>MSEUF’s first beta web based and mobile 
       application clinic management system </Text> 
     </View>

     <View>
       <View>
         <Text style={styles.title}>LOGIN</Text> 
       </View>
     </View>

     <View>
     <TextInput
         placeholder = "Email"
         style={styles.input}
         value={email}
         onChangeText={(text) => [checkemail(text), setEmail(text)]}
         >
       </TextInput>
       {
            chkemail ? (
                <Text style={{ color: 'red' }}>Invalid Email Format</Text>
                ) : (
                <Text></Text>
            )
            }
       <TextInput
         placeholder = "Password"
         style={styles.input1}
         value={pw}
         onChangeText={(value) => setPw(value)}
         secureTextEntry>
       </TextInput>
       <TouchableOpacity onPress={() => navigation.navigate('Signup')}><Text>Not registered? Sign up <Text style={{ color: 'blue' }}>here</Text></Text></TouchableOpacity>
     </View>

     <TouchableOpacity 
         style={styles.button}
         title='Sign Up'
         onPress={myfun}
         >
       <Text style={styles.text}>LOGIN</Text>
       </TouchableOpacity>
    </View>
    );
};
const styles = StyleSheet.create({
  ovalShape:{
    marginTop:-200,
    width:250,
    height:120,
    borderRadius:90,
    transform: [{scale:2}],
    backgroundColor:"#6C85BD",
    opacity:0.3,
   },
   
  here:{
    marginTop: 30,
   }, 
    container:{
     flex: 1,
     justifyContent:"center",
     alignItems:"center",
     marginTop: 90,
    }, 
    headerText:{
      fontSize:32,
      textAlign:"center",
      fontWeight:"bold",
      marginTop:-100,
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
    title:{
     fontSize:50,
     marginTop:140,
     color:"black",
     fontFamily:"sans-serif-condensed",
    },
    
   input:{
     marginTop:40,
     paddingTop:5,
     borderWidth:1,
     borderRadius:10,
     marginBottom:10,
     width:290,
   },
   input1:{
     marginTop:10,
     paddingTop:5,
     borderWidth:1,
     borderRadius:10,
     marginBottom:10,
     width:290,
   },
  
   input2:{
     marginTop:10,
     paddingTop:5,
     borderWidth:1,
     borderRadius:10,
     marginBottom:10,
     width:290,
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

export default LoginFormScreen;