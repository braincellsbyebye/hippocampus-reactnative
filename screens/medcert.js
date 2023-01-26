import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image, Text, TextInput,TouchableOpacity, ActivityIndicator, FlatList} from 'react-native';

const MedCert = ( {navigation} ) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  let parameter = global.id
  let token = global.token

  const getMed = async () => {
      try {
      const response = await fetch(`http://10.0.2.2:8000/api/find-medcert/${parameter}`,{
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        },
    });
      const json = await response.json();
      setData(json.medrec);
      } catch (error) {
      console.error(error);
      } finally {
      setLoading(false);
      }
  }

  useEffect(() => {
      getMed();
  }, []);

    return(
        <View style = {{ marginTop: 70,padding: 30 }}>
          <Text style={styles.headerText}>Medical Certificate</Text>
          <Text style={{ marginTop:10, marginLeft: 10, color: 'black' }}>Date: </Text> 
          {isLoading ? <ActivityIndicator/> : (
            <FlatList
                style = {{ marginTop: -19, marginLeft: 50 }}
                data={data}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                    <View>
                        <Text style = {{ color: 'black' }}>{item.created_at}</Text>
                    </View>
                )}
            />
            )}
            <Text style={{ marginTop: -20, marginLeft: 122,width: 125, backgroundColor: '#f1f1ee' }}></Text>
            <Text style={{ color: 'black', margin: 10 }}>The following details stated below has been verified by the indicated residential doctor</Text>
            {isLoading ? <ActivityIndicator/> : (
            <FlatList
                data={data}
                style={{ alignSelf: 'center' }}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                    <View>
                        <Text style = {{ color: 'black' }}>
                          Name: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.fname}, {item.lname} {'\n'} 
                          Purpose: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.purpose} {'\n'} 
                          Decision: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item.verdict} {'\n'} 
                          Diagnosis: &nbsp;&nbsp;&nbsp;&nbsp;{item.diagnosis} {'\n'} 
                          Date Issued: &nbsp;{item.date}
                        </Text>
                    </View>
                )}
            />
            )}
            {isLoading ? <ActivityIndicator/> : (
            <FlatList
                data={data}
                style={{ marginTop: 20, marginLeft: 200 }}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                    <View>
                        <Text style = {{ color: 'black' }}>
                          {item.doctor}
                        </Text>
                    </View>
                )}
            />
            )}
            <View style={{ marginLeft: 200, marginTop: -10,  }}>
                <Text style={{ marginLeft: -10, color: 'black' }}>_____________________</Text>
                <Text style={{ color: 'black' }}>Residential Doctor</Text>
            </View>
        </View>
    );
}
export default MedCert;
const styles = StyleSheet.create({
       headerText:{
         fontSize:32,
         textAlign:"center",
         fontWeight:"bold",
         marginTop:50,
         fontFamily:"monospace",
         color:"black"
      },
      letter:{
        marginTop:15,
        fontWeight:'bold',
        fontSize:20,
        color:'black',
        marginLeft:10,
      },
  })
