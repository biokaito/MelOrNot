
import React from "react";
import {
  StyleSheet,
  Text,
  ImageBackground,
  View,
  ActivityIndicator,
} from "react-native";

export default function Output(props) {
  const { status, image, predictions, error } = props;
  let output;

  if (!error) {
    if (status === "modelReady" && !image)
      output = <Text style={styles.placeholder}>&uarr;</Text>;
    else if (status === "finished") {
      output = (
        <ImageBackground
          source={image}
          blurRadius={20}
          style={styles.predictedImage}
          imageStyle={styles.predictedImageExtras}
        >
          <View
            style={{
              backgroundColor: "rgba(0,0,0,0.5)",
              width: "100%",
              height: "100%",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 20,
            }}
          >
            <Text style={styles.predictedNumberHeader}>
              Probability of melanoma:{" "}
            </Text>
            <Text style={styles.predictedNumber}>
              {Math.round(predictions.dataSync()[0] * 100)}
              {/* chuyển đổi tensor thành mảng và truy cập vào xác suất của đối tượng thứ [0](melanoma)*/}
              <Text style={styles.predictedNumberPercentage}> %</Text>
              {Math.round(predictions.dataSync()[1] * 100)}
              {/* chuyển đổi tensor thành mảng và truy cập vào xác suất của đối tượng thứ [0](melanoma)*/}
              <Text style={styles.predictedNumberPercentage}> %</Text>
              {Math.round(predictions.dataSync()[2] * 100)}
              {/* chuyển đổi tensor thành mảng và truy cập vào xác suất của đối tượng thứ [0](melanoma)*/}
              <Text style={styles.predictedNumberPercentage}> %</Text>
              {Math.round(predictions.dataSync()[3] * 100)}
              {/* chuyển đổi tensor thành mảng và truy cập vào xác suất của đối tượng thứ [0](melanoma)*/}
              <Text style={styles.predictedNumberPercentage}> %</Text>
              {Math.round(predictions.dataSync()[4] * 100)}
              {/* chuyển đổi tensor thành mảng và truy cập vào xác suất của đối tượng thứ [0](melanoma)*/}
              <Text style={styles.predictedNumberPercentage}> %</Text>
              {Math.round(predictions.dataSync()[5] * 100)}
              {/* chuyển đổi tensor thành mảng và truy cập vào xác suất của đối tượng thứ [0](melanoma)*/}
              <Text style={styles.predictedNumberPercentage}> %</Text>
              {Math.round(predictions.dataSync()[6] * 100)}
              {/* chuyển đổi tensor thành mảng và truy cập vào xác suất của đối tượng thứ [0](melanoma)*/}
              <Text style={styles.predictedNumberPercentage}> %</Text>
            </Text>
          </View>
        </ImageBackground>
      );
    } else output = <ActivityIndicator size="large" animating={true} />;
  } else output = <Text>Please try again</Text>;

  return output;
}

const styles = StyleSheet.create({
  predictedImage: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  placeholder: { 
    fontSize: 50 
  },
  predictedImageExtras: { 
    borderRadius: 20 
  },
  predictedNumberHeader: { 
    marginTop: 20,
    fontSize: 20, 
    color: "white" ,
    fontStyle: 'italic'
  },
  predictedNumberPercentage: { 
    fontSize: 34, 
    color: "white",
    fontStyle: 'italic'
  },
  predictedNumber: {
    fontSize: 74,
    fontWeight: "bold",
    color: "#cd0a0a",
    shadowOpacity: 0.75,
    shadowRadius: 5,
    shadowColor: "black",
    shadowOffset: { 
      height: 10, 
      width: 10 
    },
  },
});
