import React, { useState, useEffect } from 'react'
import { View, Dimensions, StyleSheet, Modal } from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { getReservations } from '../../actions/client';
import { Card, Actions, Text, DataTable} from 'react-native-paper';
import { cancelReservation } from '../../actions/client';
import WeeklyCalendar from 'react-native-weekly-calendar';


const windowWidth = Dimensions.get('window').width;

export default function ({ visible, setVisible, court, setCourt}) {
    const dispatch = useDispatch();

    if(Object.keys(court).length === 0 && court.constructor === Object) { 
        return null;
    }

    const sampleEvents = [
        { 'start': '2023-01-02 08:00:00', 'duration': '08:00:00', 'note': 'PROSTO' },
        { 'start': '2023-01-02 16:00:00', 'duration': '02:00:00', 'note': 'ODBOJKA - FIRMA X' },
        { 'start': '2023-01-02 19:00:00', 'duration': '2:00:00', 'note': 'ODBOJKA - FIRMA Z' },
        { 'start': '2023-01-02 18:00:00', 'duration': '01:00:00', 'note': 'PROSTO' },        
        { 'start': '2023-01-02 21:00:00', 'duration': '01:00:00', 'note': 'PROSTO' },
    ]

    console.log(court);

    return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={() => {
                    setVisible(!visible);
                }}>
    
                <View>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <WeeklyCalendar events={sampleEvents} style={{ height: 400 }} />
                            <Button
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => setVisible(!visible)} title={"close"} >
                                close
                            </Button>
                        </View>
                    </View>
                </View>
            </Modal>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    overview: {
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
