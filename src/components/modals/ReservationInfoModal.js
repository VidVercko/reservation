import React, { useState, useEffect } from 'react'
import { View, Dimensions, StyleSheet } from 'react-native';
import { colors } from '../../assets/style';
import { Overlay, Button } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { getReservations } from '../../actions/client';
import { Card, Actions, Text, DataTable} from 'react-native-paper';
import { cancelReservation } from '../../actions/client';
import { dateStr } from '../../actions/helper';
import { useNavigate, useParams } from "react-router-dom";


const windowWidth = Dimensions.get('window').width;

export default function ({ visible, setVisible, reservation, setReservation}) {
    const dispatch = useDispatch();
    const { courtId, locationId } = useParams();

    const reservations = useSelector((state) => state.common.reservations ?? []);

    if(Object.keys(reservation).length === 0 && reservation.constructor === Object) { 
        return null;
    }

    function cancelRes() {
        dispatch(cancelReservation(reservation.id))
        dispatch(getReservations());
        setVisible(false)
      }

    return (
        <Overlay 
            overlayStyle={{
                width: windowWidth * .9,
            }}
            
            isVisible={visible}
            onBackdropPress={() => setVisible(false)}>
                <View>
                    <Card>
                        <Card.Title title= {reservation.court.name} subtitle= {reservation.location.name}/>
                        <Card.Content>
                            <Text variant="bodymedium"> { reservation.schedule.day_formatted }</Text>
                            <Text variant="bodymedium"> { reservation.date }</Text>
                            <Text variant="bodyMedium"> { reservation.schedule.start_time }</Text>
                            <Text variant="bodyMedium"> { reservation.schedule.end_time }</Text>

                        </Card.Content>
                        <Card.Actions>
                            <Button
                              buttonStyle={{
                                backgroundColor: colors.dark,
                                borderRadius: 10,
                                height: 45
                              }}
                              onPress={() => setVisible(!visible)} title={"close"} >
                              close
                            </Button>
                            <Button
                              buttonStyle={{
                                backgroundColor: colors.dark,
                                borderRadius: 10,
                                height: 45
                              }}                             
                              onPress={() => cancelRes()} title={"Cancel"} >
                              Cancel
                            </Button>
                        </Card.Actions>
                    </Card>
                </View>
        </Overlay>
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
