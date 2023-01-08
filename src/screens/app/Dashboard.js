import React, { useEffect, useState } from 'react'
import { Text, View, Modal, StyleSheet, Pressable } from 'react-native'
import { Button } from 'react-native-elements'
import { useSelector, useDispatch } from "react-redux";
import {Title, DataTable, Paper} from 'react-native-paper';
import { getReservations } from '../../actions/client';
import ReservationInfoModal from '../../components/modals/ReservationInfoModal';

export default function({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [reservation, setReservation] = useState({});

    const dispatch = useDispatch();
    const reservations = useSelector((state) => state.common.reservations ?? []);

    useEffect(() => {
      dispatch(getReservations());
    }, []);

    function showLocation(id) {
      console.log(id)
      setReservation(reservations[id])
      setModalVisible(true)
    }

    const RenderDataTable = () => {
        return (
            <DataTable> 
                <DataTable.Header>
                    <DataTable.Title>Location</DataTable.Title>
                    <DataTable.Title>Day</DataTable.Title>
                    <DataTable.Title>Starts</DataTable.Title>
                    <DataTable.Title>Actions</DataTable.Title>
                </DataTable.Header>
                {
                reservations.map((data, index) =>(
                    <DataTable.Row>
                        <DataTable.Cell>{data.court.name}</DataTable.Cell>
                        <DataTable.Cell>{data.schedule.day_formatted}</DataTable.Cell>
                        <DataTable.Cell>{data.schedule.start_time}</DataTable.Cell>
                        <DataTable.Cell> 
                            <Button id={index} title={"edit"} onPress={()=>showLocation(index)}  />
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
                        <ReservationInfoModal visible={modalVisible} setVisible={setModalVisible} reservation = { reservation } setReservation = { setReservation }/>
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
