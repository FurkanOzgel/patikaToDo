import React from "react";
import {View, TouchableOpacity, TextInput, Text, Keyboard} from "react-native";
import styles from "./add.style";
import { useState, useEffect } from "react";

const Add = ({setToDoList, toDoList}) => {
    
    const [task, setTask] = useState("");
    const [onfocus, setonfocus] = useState(false);
    const [keyboardactive, setkeyboardactive] = useState(false);

    useEffect(() => {
        if(task !== ""){
            setonfocus(true);
        }else{
            setonfocus(false);
        }
    }, [task]);

    useEffect(() => {
        if(keyboardactive){
            null
        }else{
            setTask("");
        }
    }, [keyboardactive]);

    function pressSaveBtn(){
        Keyboard.dismiss();
        setToDoList([...toDoList,{complated: false,id: Date.now(), task: task}]);
        setTask("");

    };

    return(
        
        <View style={styles.save_container}>
            <TextInput
                style={styles.save_text_input} 
                placeholder="Yapılacak..." 
                placeholderTextColor={"#808080"}
                value={task}
                onChangeText={text => setTask(text)}
                onFocus={() => setkeyboardactive(true)}
                onBlur={() => setkeyboardactive(false)}
                />
            <TouchableOpacity 
                style={onfocus==true?styles.save_btn:{
                    backgroundColor:"#808080",
                    borderRadius:15,
                    padding:10,
                    alignItems:"center",
                    marginTop:10
                }}
                disabled={onfocus==false}
                onPress={pressSaveBtn}>
                <Text style={{color:"white", fontSize:20, fontWeight:"bold"}}>Kaydet</Text>
            </TouchableOpacity>
        </View>
            
    );
};

export default Add;
