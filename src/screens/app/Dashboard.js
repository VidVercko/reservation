import React, { useEffect, useState } from 'react'
import { Text, View, Modal, StyleSheet, Pressable } from 'react-native'
import { Button } from 'react-native-elements'
import { useSelector, useDispatch } from "react-redux";
import {Title, DataTable, Paper} from 'react-native-paper';
import { getReservations } from '../../actions/client';

export default function({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);

    const dispatch = useDispatch();

    const isLoading = useSelector((state) => state.common.loading);
    const reservations = useSelector((state) => state.common.reservations ?? []);
  
    useEffect(() => {
      dispatch(getReservations());
    }, []);

    const res = [
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

    console.log(reservations);


    function showLocation(e) {
        console.log(e)
        setModalVisible(true)
    }

    const RenderDataTable = () => {
        return (
            <DataTable> 
                <DataTable.Header>
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Title>Location</DataTable.Title>
                    <DataTable.Title>Starts</DataTable.Title>
                    <DataTable.Title>Ends</DataTable.Title>
                    <DataTable.Title>Actions</DataTable.Title>
                </DataTable.Header>
                {
                reservations.map((data, index) =>(
                    <DataTable.Row>
                        <DataTable.Cell>{data.court.name}</DataTable.Cell>
                        <DataTable.Cell>{data.location.name}</DataTable.Cell>
                        <DataTable.Cell>{data.date}</DataTable.Cell>
                        <DataTable.Cell>{data.schedule.start_time}</DataTable.Cell>
                        <DataTable.Cell> 
                            <Button id={index} title={"edit"} onPress={(event) => showLocation(event)} />
                        </DataTable.Cell>
                    </DataTable.Row>
                ))}
            </DataTable>
        )
      }

    return (
        <View className="center" style={{ marginTop: 20 }}>
            <View className="main-container">
                <View className="page-header header-row">
                    <View className="page-header">
                        <Text>My reservations</Text>
                        <Modal
                            animationType="slide"
                            transparent={true}
                            visible={modalVisible}
                            onRequestClose={() => {
                            Alert.alert("Modal has been closed.");
                            setModalVisible(!modalVisible);
                            }}
                        >
                            <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <Text style={styles.modalText}>Hello World!</Text>
                                <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setModalVisible(!modalVisible)}
                                >
                                <Text style={styles.textStyle}>Hide Modal</Text>
                                </Pressable>
                            </View>
                            </View>
                        </Modal>
                    </View>
                    {RenderDataTable()}
                </View>
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
