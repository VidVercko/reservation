import React, { useEffect, useState } from 'react'
import { Text, View, Modal, StyleSheet, Pressable, ScrollView } from 'react-native'
import { Button } from 'react-native-elements'
import { useSelector, useDispatch } from "react-redux";
import { SelectList } from 'react-native-dropdown-select-list'
import { Title, DataTable, Paper } from 'react-native-paper';
import moment from "moment";
import Timetable from "react-native-calendar-timetable";
import MyItemCard from '../../components/CardComponent';
import WeeklyCalendar from 'react-native-weekly-calendar';

export default function({ navigation }) {

    const [selectedType, setSelectedType] = React.useState("");
    const [selectedLocation, setSelectedLocation] = React.useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [date] = React.useState(new Date());

    const [from] = React.useState(moment().subtract(5, 'days').toDate());
    const [till] = React.useState(moment().add(3, 'days').toISOString());
    const range = {from, till};

    const sampleEvents = [
        { 'start': '2023-01-02 08:00:00', 'duration': '08:00:00', 'note': 'PROSTO' },
        { 'start': '2023-01-02 16:00:00', 'duration': '02:00:00', 'note': 'ODBOJKA - FIRMA X' },
        { 'start': '2023-01-02 19:00:00', 'duration': '2:00:00', 'note': 'ODBOJKA - FIRMA Z' },
        { 'start': '2023-01-02 18:00:00', 'duration': '01:00:00', 'note': 'PROSTO' },        
        { 'start': '2023-01-02 21:00:00', 'duration': '01:00:00', 'note': 'PROSTO' },
      ]

    const reservations = [
        {
          location: 'Ljubljana',
          type: 'Basketball',
          time_start: '14:00',
          time_end: '15:00' 
        },
        {
            location: 'Rožna',
            type: 'Football',
            time_start: '9:00',
            time_end: '10:00' 
        },
        {
            location: 'Kranj',
            type: 'Golf',
            time_start: '17:00',
            time_end: '18:00' 
        },
        {
            location: 'Mehika',
            type: 'Escape',
            time_start: '20:00',
            time_end: '22:00' 
        },
      ];

    const type = [
          {key:'1', value:'Football'},
          {key:'2', value:'Basketball'},
          {key:'3', value:'Gym'},
          {key:'4', value:'Volleyball'},
          {key:'5', value:'Tennis'},
          {key:'6', value:'Golf'},
          {key:'7', value:'Handball'},
    ]

      const locations = [
        {key:'1', value:'Ljubljana'},
        {key:'2', value:'Maribor'},
        {key:'3', value:'Kranj'},
        {key:'4', value:'Velenje'},
        {key:'5', value:'Slovenj Gradec'},
        {key:'6', value:'Ravne'},
    ]

    function showLocation(e) {
        console.log(e)
        setModalVisible(true)
    }

    const RenderDataTable = () => {
        let filtered = reservations;
        if(selectedLocation.length != "") { 
            filtered = reservations.filter(function(item){
                return item.location == selectedLocation;
            }).map(function({location, type}){
                return {location, type};
            });
        }

        if(selectedType.length != "") { 
            filtered = reservations.filter(function(item){
                return item.location == selectedType;
            }).map(function({location, type}){
                return {location, type};
            });
        }

        console.log(filtered);

        return (
            <DataTable> 
                <DataTable.Header>
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Title>Location</DataTable.Title>
                    <DataTable.Title>More info</DataTable.Title>
                </DataTable.Header>
                {
                filtered.map((data, index) =>(
                    <DataTable.Row>
                        <DataTable.Cell>{data.type}</DataTable.Cell>
                        <DataTable.Cell>{data.location}</DataTable.Cell>
                        <DataTable.Cell> 
                            <Button id={index} title={"edit"} onPress={(event) => showLocation(event)} />
                        </DataTable.Cell>
                    </DataTable.Row>
                ))}
            </DataTable>
        )
      }


    return (
        <View>
            <Text>
                Available reservations
            </Text>
            <SelectList 
                setSelected={(val) => setSelectedType(val)} 
                data={type} 
                save="value"
            />

            <SelectList 
                setSelected={(val) => setSelectedLocation(val)} 
                data={locations} 
                save="value"
            />

            <View>
                {RenderDataTable()}
            </View>

            <View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setModalVisible(!modalVisible);
                }}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <WeeklyCalendar events={sampleEvents} style={{ height: 400 }} />
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)} >
                                <Text style={styles.textStyle}>Hide Modal</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>         
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });
