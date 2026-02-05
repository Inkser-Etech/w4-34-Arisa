import { View, Text,TextInput,TouchableOpacity,StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect} from "react";

export default function Home(){
    const[text, setText] = useState("")
    const[ fruit,setFruit] = useState("")

    useEffect(()=>{
        loadFruit()
},[])

async function saveFruit(){
    await AsyncStorage.setItem("fruit", text)
    setFruit(text)
    setText("")
}


async function removeFruit(){
    await AsyncStorage.removeItem("fruit")
    setFruit("")
    setText("")
}


async function  loadFruit(){
    const data = await AsyncStorage.getItem("fruit")
    if(data != ""){
        setFruit(data!.toString())
    }

}
    return (
         <View style={myStyles.container}>
        
        
        <Text style={{ fontSize: 20,fontWeight:"700",color:"black"  }}>🍎Fruit : {fruit}</Text>
        

        <TextInput 
        style={myStyles.input}
         value={text} 
         onChangeText={setText}
         placeholder="พิมพ์ชื่อผลไม้..."
        placeholderTextColor="#888"/>

        <TouchableOpacity onPress={saveFruit}>
            <Text style={{ fontSize: 17,fontWeight:"600",color:"green" }}>บันทึก</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={removeFruit}>
            <Text style={{ fontSize: 17,fontWeight:"700",color:"red"  }}>ลบ</Text>
        </TouchableOpacity>
</View>
       
    )
}

const myStyles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        backgroundColor:"#FFF485"
 
    },
    input:{
        borderWidth:3,
        width:"80%",
        borderColor:"#FF9D4A",
        borderRadius:8,
       backgroundColor: "#FFD485",
    },

})