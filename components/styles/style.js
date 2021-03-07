import {StyleSheet, Dimensions} from 'react-native';
const {width : WIDTH} = Dimensions.get('window')

export default StyleSheet.create({
    container:{
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
    },
    greeting:{
      fontSize: 20,
      fontWeight: "bold",
      color: "#FFF",
      textAlign: "center"
    },
    errorMessage:{
      height: 72,
      alignItems: "center",
      justifyContent: "center",
      marginHorizontal: 30
    },
    error:{
      color: "#00d589",
      fontSize: 13,
      fontWeight: "600",
      textAlign: "center"
    },
    signupForm:{
      bottom: 100,
      marginHorizontal: 30
    },
    registerText:{
      alignSelf: "center", 
      bottom: 32
    },
    loginForm:{
      bottom: 200,
      marginHorizontal: 30
    },
    loginText:{
      alignSelf: "center", 
      bottom: 40
    },
    inputTitle:{
      color:"#FFF",
      fontSize: 11,
      fontWeight:"bold",
      textTransform: "uppercase"
    },
    input:{
      borderBottomColor: "#FFF",
      borderBottomWidth: StyleSheet.hairlineWidth,
      height: 40,
      width: WIDTH - 55,
      paddingLeft: 35,
      fontSize: 15,
      color: "#FFF"
    },
    inputIcon:{
      position: 'absolute',
      top: 15
    },
    button:{
      marginHorizontal: 30,
      bottom: 75,
      backgroundColor: "#00d589",
      borderRadius: 15,
      height: 52,
      alignItems: "center",
      justifyContent: "center"
    },
    avatarPlaceholder:{
      width:100,
      height:100,
      backgroundColor: "#E1E2E6",
      borderRadius: 50,
      marginTop: 10,
      justifyContent: "center",
      alignItems: "center"
    },
    avatar:{
      position: "absolute",
      width: 100,
      height: 100,
      borderRadius: 50
    },
  });