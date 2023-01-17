import React, { useEffect, useState } from 'react'
import { Text, View, Modal, StyleSheet, ImageBackground } from 'react-native'
import { Button } from 'react-native-elements'
import { useSelector, useDispatch } from "react-redux";
import {Title, DataTable, Paper} from 'react-native-paper';
import { getReservations } from '../../actions/client';
import ReservationInfoModal from '../../components/modals/ReservationInfoModal';
import image from "../../assets/landing1.jpg"
import { colors } from '../../assets/style';

export default function({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [reservation, setReservation] = useState({});

    const dispatch = useDispatch();
    const reservations = useSelector((state) => state.common.reservations ?? []);

    useEffect(() => {
      dispatch(getReservations());
    }, []);

    React.useEffect(() => {
      const unsubscribe = navigation.addListener('focus', () => {
        dispatch(getReservations());
      });
        return unsubscribe;
    }, [navigation]);

    function showLocation(id) {
      console.log(id)
      setReservation(reservations[id])
      setModalVisible(true)
    }

    const RenderDataTable = () => {
        return (
            <DataTable key="datatable"> 
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
                            <Button buttonStyle={{
                                    backgroundColor: colors.dark,
                                    borderRadius: 10,
                                    height: 45
                                }} 
                                key={data.id} id={index} title={"edit"} onPress={()=>showLocation(index)}  />
                        </DataTable.Cell>
                    </DataTable.Row>
                ))}
            </DataTable>
        )
      }

    return (
      <ImageBackground source={image} style={ {width: "100%", height: "100%"}}>
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
      </ImageBackground>
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
