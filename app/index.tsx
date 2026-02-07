import { View, Text,TextInput,TouchableOpacity,StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useState, useEffect} from "react";

export default function Home(){
    const[text, setText] = useState("")
    const[ fruit,setFruit] = useState("")
//โหลดผลไม้เมื่อเปิดแอป ถ้าไม่มี useEffect จะไม่โหลดผลไม้อันเก่าที่เราพิมพ์ไว้
    useEffect(()=>{
        loadFruit()
},[])
// [] คือการบอกให้ useEffect ทำงานแค่ครั้งเดียวตอนเปิดแอป 

async function saveFruit(){
    await AsyncStorage.setItem("fruit", text)
    setFruit(text)
    setText("")
    //บันทึกชื่อผลไม้ลงใน AsyncStorage และอัปเดตสถานะผลไม้และรีเซ็ตข้อความให้เป็นค่าว่าง
}

async function removeFruit(){
    await AsyncStorage.removeItem("fruit")
    //ลบข้อมูลผลไม้จาก AsyncStorage
    setFruit("")
    setText("")
    //รีเซ็ตสถานะผลไม้และข้อความให้เป็นค่าว่าง
}

//โหลดผลไม้จาก AsyncStorage
async function  loadFruit(){
    const data = await AsyncStorage.getItem("fruit")
    //ถ้ามีข้อมูลผลไม้ ให้แสดงผลไม้นั้น
    if(data != ""){
        setFruit(data!.toString())
        //ถ้าไม่มีข้อมูลผลไม้ ให้รีเซ็ตสถานะผลไม้ให้เป็นค่าว่าง
    }

}
    return (
         <View style={myStyles.container}>
        
        
        <Text style={{ fontSize: 20,fontWeight:"700",color:"black"  }}>🍎Fruit : {fruit}</Text>

        {/*ช่องกรอกชื่อผลไม้*/}
        <TextInput
        style={myStyles.input}
         value={text}
         //onChangeText={Text คือฟังก์ชันที่ใช้เปลี่ยนแปลงค่า text} 
         onChangeText={setText}
         placeholder="พิมพ์ชื่อผลไม้..."
        placeholderTextColor="#888"/>

        {/*ปุ่มบันทึกผลไม้*/}
        <TouchableOpacity onPress={saveFruit}>
            <Text style={{ fontSize: 17,fontWeight:"600",color:"green" }}>บันทึก</Text>
        </TouchableOpacity>

        {/*ปุ่มลบผลไม้*/}
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