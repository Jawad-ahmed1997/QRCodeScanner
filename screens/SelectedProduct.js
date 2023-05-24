import React, { useState, useEffect } from "react";
import { View, Text, FlatList, StyleSheet,Image,ActivityIndicator } from "react-native";
import { getProductByBarcode, getProductById } from "../api";
import { Icon } from 'react-native-elements'



const SelectedProduct = ({ route, navigation }) => {
  const [product, setProduct] = useState({})
  const [isLoader,setIsloader]=useState(false);
  const { id, screen } = route.params;

  useEffect(() => {
    const fetchProductByBarcode = async (id) => {
      setIsloader(true);
      const { status, data } = await getProductByBarcode(id);
      if (status === 200) {
        setProduct(data);
        setIsloader(false)
      }
    };
    const fetchProductById = async (id) => {
      setIsloader(true);
      const { status, data } = await getProductById(id);
      if (status === 200) {
        setProduct(data);
        setIsloader(false)
      }
    };

    if (screen === "scan")
      fetchProductByBarcode(id)
    else if (screen === "search")
      fetchProductById(id)

  }, [id])


  useEffect(()=>{
console.log(product)
  },[product])

  

  return (
    <>
    {isLoader?<ActivityIndicator style={styles.ActivityIndicator} size="large" color="#00ff00" />:
    <View style={styles.container}>
      <View style={styles.logo}>
      <Image 
      style={styles.image}
        source={require('../assets/gracesuperMart.png')}
        />
      </View> 
      
      <View style={styles.containerChild}>
        <Text style={styles.Title}>Item Name</Text>
        <Text style={ styles.detail}>{product.item_name}</Text>
      </View>
      <View style={styles.containerChild}>
        <Text style={styles.Title}>Retail Price</Text>
      <Text style={ styles.detail}>PKR/- {product.trade_price}</Text>
      </View>
      <View style={styles.containerChild}>
        <Text style={styles.Title} >Sales Price</Text>
        <Text style={ styles.detail}>PKR/- {product.trade_price}</Text>
      </View>
      <View style={styles.containerChild}>
        <Text style={styles.Title} >Company Name</Text>
        <Text style={ styles.detail}>{product.cmp_name}</Text>
      </View>
      {/* <View style={styles.containerChild}>
        <Text style={styles.Title} >Sales Price</Text>
        <Text style={ styles.detail}>PKR/- {product.cmp_name}</Text>
      </View> */}
   
    </View>
    }
    </>
  );
};

const styles = StyleSheet.create({
  ActivityIndicator:{
    height:"100%",
    width:"100%",
    justifyContent:"center",
    display:"flex",
    alignItems:"center"
  },
  Title: {
    fontSize: 14,
    marginLeft:20,
    fontWeight:"bold",
    fontStyle:"italic"
  },
  // image:{
  //   height:100,
  //   width:100
  // },
  container: {
    position:'relative',
    flex:1,
    justifyContent:"center",
    alignItems:'flex-start',
    height:"100%",
    width:"100%",
    backgroundColor: '#fff',
    // marginTop:10
  },
  flatlist: {
    fontSize: 18,
    paddingTop: 10,
    paddingLeft: 10,
    backgroundColor: "#f5f5f5"
  },
  containerChild:{
    display:'flex',
    justifyContent:'center',
    alignItems:"flex-start",
    flexDirection:"column",
    marginLeft:20,
    height:"13%",
    width:"100%"
  },
  logo:{
    display:'flex',
    justifyContent:'flex-start',
    alignItems:"center", 
    // width:"100%",
    // height:"20%",
    position: 'absolute',
    top: 40,
    left: 0,
    right: 0,
    marginBottom:20
  },
  detail:{
    // backgroundColor:"#f5f5f5",
    borderWidth: 1,
    color:"#808080",
    borderColor:"#f5f5f5",
    fontSize:18,
    margin:10,
    padding:10,
    borderRadius:10,
    fontStyle:"italic"  
  },
  // detailView:{
  //   display:'flex',
  //   justifyContent:"center",
  //   alignItems:"flex-St",
  //   height:"80%"
  // }
});

export default SelectedProduct;
