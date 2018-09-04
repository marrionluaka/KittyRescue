import * as React from "react";
import {
    View,
    Text,
    StyleSheet
} from "react-native";

const Zen = () => {
    return (
      <View style={{ 
        flex: 1, 
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text style={{
          fontFamily: "riffic",
          fontSize: 30,
          color: "#fff",
          padding: 20,
          paddingTop: 30,
          paddingBottom: 30,
          borderRadius: 50,
          borderWidth: 1,
          borderColor: "#fff"
        }}>ZEN</Text>
      </View>
    );
};

export default Zen;