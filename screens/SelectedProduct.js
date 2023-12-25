import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
  Alert,
  Touchable,
  TouchableOpacity,
} from "react-native";
import { getProductByBarcode } from "../api";

const SelectedProduct = ({ navigation,route }) => {
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
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                gap: 50,
                marginTop: 100,
              }}
            >
              <Image
                style={styles.image}
                source={require("../assets/gracesupermart.png")}
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
                      : require("../assets/gracesupermart.png")
                  }
                  resizeMode="contain"
                />
              </View>
              <View style={styles.headingContainer}>
                <Text style={styles.productName}>{product?.itemName}</Text>
                <Text style={styles.categoryName}>{product?.category}</Text>
                <Text style={styles.categoryName}>{product?.company}</Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: product?.isStockAvailable ? "lightgreen" : "red",
                    fontWeight: "bold",
                  }}
                >
                  {product?.IsStockAvailable ? "In Stock." : "Out Of Stock."}
                </Text>

                <Text
                  style={[
                    styles.productName,
                    {
                      fontSize: 24,
                      marginTop: 20,
                      color: "#900",
                      fontWeight: "900",
                    },
                  ]}
                >
                  Sale Price: Rs.{product?.salePrice}
                </Text>
              </View>
              <View style={styles.infoContainer}>
                <View
                  style={{
                    flexWrap: "wrap",
                    gap: 20,
                    alignItems: "center",
                  }}
                >
                  <View style={styles.detailRow}>
                    <Text style={styles.detailTitle}>Discount:</Text>
                    <Text
                      style={[styles.detail, { color: "black", fontSize: 22 }]}
                    >
                      Rs.{product?.discount}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailTitle}>Retail Price:</Text>
                    <Text
                      style={[styles.detail, { color: "black", fontSize: 22 }]}
                    >
                      Rs.{product?.retailPrice}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <Text style={styles.detailTitle}>Packing:</Text>
                    <Text style={styles.detail}>{product?.packing}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("Home")
                  }}
                  style={{
                    backgroundColor: "#000eff",
                    paddingVertical: 10,
                    borderRadius: 10,
                    marginTop: 30,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      textAlign: "center",
                      fontSize: 22,
                    }}
                  >
                    Back
                  </Text>
                </TouchableOpacity>
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
    width: 100,
    height: 100,
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
