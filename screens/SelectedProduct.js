import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert,
} from "react-native";
import { getProductByBarcode } from "../api";

const SelectedProduct = ({ route }) => {
  const [product, setProduct] = useState(null);
  const [isLoader, setIsLoader] = useState(false);
  const { id } = route.params;

  useEffect(() => {
    const fetchProductByBarcode = async (id) => {
      setIsLoader(true);
      try {
        const { status, data } = await getProductByBarcode(id);
        if (status === 200) {
          setProduct(data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoader(false);
      }
    };
    fetchProductByBarcode(id);
  }, [id]);

  return (
    <>
      {isLoader ? (
        <ActivityIndicator
          style={styles.activityIndicator}
          size="large"
          color="red"
        />
      ) : (
        <ScrollView style={styles.container}>
          {!product ? (
            <View style={{justifyContent:'center',alignItems:'center',gap:50,marginTop:100}}>
              <Image
                style={styles.image}
                source={require("../assets/gracesuperMart.png")}
                resizeMode="contain"
              />
              <Text
                style={{
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: 20,
                }}
              >
                No product found!
              </Text>
            </View>
          ) : (
            <>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.image}
                  source={
                    product?.imagePath
                      ? { uri: product?.imagePath }
                      : require("../assets/gracesuperMart.png")
                  }
                  resizeMode="contain"
                />
              </View>
              <View style={styles.headingContainer}>
                <Text style={styles.productName}>{product?.itemName}</Text>
                <Text style={styles.categoryName}>{product?.category}</Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: product?.isStockAvailable ? "lightgreen" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {product?.IsStockAvailable ? "In Stock." : "Out Of Stock."}
                </Text>
              </View>
              <View style={styles.infoContainer}>
                <View
                  style={{
                    flexDirection: "row",
                    flexWrap: "wrap",
                    gap: 20,
                    alignItems: "center",
                  }}
                >
                  <View style={styles.detailRow}>
                    <Text style={styles.detailTitle}>Item ID:</Text>
                    <Text style={styles.detail}>{product?.itemID}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailTitle}>Company:</Text>
                    <Text style={styles.detail}>{product?.company}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailTitle}>Retail Price:</Text>
                    <Text style={styles.detail}>Rs.{product?.retailPrice}</Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailTitle}>Sales Price:</Text>
                    <Text style={styles.detail}> Rs.{product?.salePrice}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailTitle}>Discount:</Text>
                    <Text style={styles.detail}>{product?.discount}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailTitle}>Packing:</Text>
                    <Text style={styles.detail}>{product?.packing}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailTitle}>Barcode:</Text>
                    <Text style={styles.detail}>{product?.barcode}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.detailTitle}>Client ID:</Text>
                    <Text style={styles.detail}>{product?.clientID}</Text>
                  </View>
                </View>
              </View>
            </>
          )}
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "contain",
    borderRadius: 10,
  },

  headingContainer: {},
  infoContainer: {
    backgroundColor: "white",
    paddingTop: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#333",
  },
  detailRow: {
    marginBottom: 5,
  },
  detailTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 10,
    width: 130,
    color: "#555",
  },
  detail: {
    fontSize: 16,
    color: "#687076",
  },
  productName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  categoryName: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#687076",
  },
});

export default SelectedProduct;
