import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList ,ActivityIndicator} from 'react-native';
import { getProductsByName } from '../api';
import { SearchBar } from 'react-native-elements';
// import {ActivityIndicator, StyleSheet, View} from 'react-native';

function MySearchBar({ navigation }) {
  const [resultList, setResultList] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [isLoader, setIsLoader] = useState(false);
  const [empty,setEmpty] = useState(false)

  const handleSearch = (text) => {
    setSearchText(text);
    if (text.length >= 3) {
      fetchProduct(text);

    } else {
      setResultList([]);
      
    }
  };

  const fetchProduct = async (keyword) => {
    setIsLoader(true);
    const { status, data } = await getProductsByName(keyword);
    if (status === 200) {
     setResultList(data);
     if (data.length===0){
      setEmpty(true)
     }
     else{
      setEmpty(false)
     }
    }
    setIsLoader(false);
  };
 

  return (
    <View style={styles.container}>
      <SearchBar
        style={styles.searchBar}
        placeholder="Search By minimum 3 Words"
        onChangeText={handleSearch}
        value={searchText}
      />
      <View>
        {isLoader ? <ActivityIndicator style={styles.ActivityIndicator} size="large" color="#0000ff" /> : (
          <>
          {
            empty?<View style={styles.notFound}><Text >Product Not Found</Text></View>:(
              <FlatList
              style={styles.flatlist}
              data={resultList}
              keyExtractor={(item) => item.Item_id.toString()}
              renderItem={({ item }) => (
                <Text
                  onPress={() =>
                    navigation.navigate('SelectedProduct', {
                      id: item.Item_id,
                      screen: 'search',
                    })
                  }
                  style={styles.flatlist}
                >
                  {item.item_name}
                </Text>
              )}
            />
            )
          }
         
          </>

        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ActivityIndicator:{
    height:"100%",
    width:"100%",
    justifyContent:"center",
    display:"flex",
    alignItems:"center"
  },
  notFound:{
    height:"100%",
    width:"100%",
    justifyContent:"center",
    display:"flex",
    alignItems:"center"
  },
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
  },
  searchBar: {
    padding: 10,
  },
  flatlist: {
    fontSize: 14,
    paddingVertical: 10,
    paddingRight: 10,
    margin: 2,
    paddingHorizontal: 10,
    borderColor: '#f5f5f5',
    borderBottomWidth: 2,
  },
});

export default MySearchBar;
