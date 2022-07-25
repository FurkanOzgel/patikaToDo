import React from "react";
import {SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity} from "react-native";
import Add from "./components/add/add";
import { useState } from "react";




function App() {

  const [toDoList, setToDoList] = useState([]);
  const [reset,setreset] = useState(false);

  const activeToDoList = toDoList.filter(item => !item.complated);

  const renderTask = ({item}) => {
    let temporaryList = toDoList;
  
    return(
      <TouchableOpacity  style={item.complated==true?styles.complated_task_btn:styles.task_btn} onPress={
        () => {
          {item.complated == false? item.complated=true : item.complated=false}
          {reset==true? setreset(false) : setreset(true)}
          temporaryList[item.id] = item;
          setToDoList(temporaryList);
        }
        
      }
      onLongPress={() => {
          let index = temporaryList.indexOf(item);
          temporaryList.splice(index,1);
          {reset==true? setreset(false) : setreset(true)}
          setToDoList(temporaryList);
          console.log(toDoList);
      }}
      >
        <Text style={item.complated==true?styles.complated_task_text:styles.task_text}>{item.task}</Text>
      </TouchableOpacity>
      
    );
  }

  return(
    <SafeAreaView style={styles.container}>
      <FlatList
      data={toDoList}
      renderItem={renderTask}
        ListHeaderComponent={
          <View style={styles.top_container}>
            <Text style={styles.title}>Yapılacaklar</Text>
            <Text style={styles.count}>{activeToDoList.length}</Text>
          </View>
        }
        />
      <Add setToDoList={setToDoList} toDoList={toDoList} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#102027"
  },
  title:{
    color:"#FFA500",
    fontSize:30,
    fontWeight:"bold"
  },
  top_container:{
    flexDirection:"row",
    padding:20,
    justifyContent:"space-between"
  },
  count:{
    color:"#FFA500",
    fontSize:30,
    fontWeight:"bold",
  },
  task_text:{
    fontSize:20,
    color:"white",
    margin:10,
  },
  task_btn:{
    backgroundColor:"#7DA453",
    margin:10,
    borderRadius:10,
    marginTop:-4
  },
  complated_task_text:{
    fontSize:20,
    color:"#797B7B",
    margin:10,
    textDecorationLine: 'line-through'
  },
  complated_task_btn:{
    backgroundColor:"#37474F",
    margin:10,
    borderRadius:10,
    marginTop:-4
  }
})

export default App;