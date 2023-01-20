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
        <View style = {{ padding: 30 }}>
          <Text style={styles.headerText}>Medical Certificate</Text>
          <Text style={{ marginLeft: 10, color: 'black' }}>Date: </Text> 
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
            <Text>Test</Text>
            <Text style={{ marginTop: -20, marginLeft: 122,width: 125, backgroundColor: '#f1f1ee' }}></Text>
            {isLoading ? <ActivityIndicator/> : (
            <FlatList
                data={data}
                keyExtractor={({ id }, index) => id}
                renderItem={({ item }) => (
                    <View>
                        <Text style = {{ color: 'black' }}>
                          Name: {item.fname}, {item.lname} {'\n'} 
                          Purpose: {item.purpose} {'\n'} 
                          Decision: {item.verdict} {'\n'} 
                          Diagnosis: {item.diagnosis} {'\n'} 
                          Doctor: {item.doctor} {'\n'} 
                          Date Issued: {item.date}
                        </Text>
                    </View>
                )}
            />
            )}
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
