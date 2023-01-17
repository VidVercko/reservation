import React, { useState, useEffect } from 'react'
import { colors } from '../../assets/style';
import { View, Dimensions, StyleSheet, Modal } from 'react-native';
import { Overlay, Button } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { getReservations, makeReservation } from '../../actions/client';
import { Card, Actions, Text, DataTable} from 'react-native-paper';
import {
        cmpDates,
        formatFromTo,
        handleCourtTimelineTitle,
        handleWeekDay,
        dateStr,
      } from '../../actions/helper';

const windowWidth = Dimensions.get('window').width;

export default function ({ visible, setVisible, t }) {
    const dispatch = useDispatch();
    const [scheduleDate, setScheduleDate] = useState(handleWeekDay());


    if(Object.keys(t).length === 0 && t.constructor === Object) { 
        return null;
    }

    function handlePreviousWeek() {
      const newDate = getDateWithOffset(scheduleDate, -7);
      setScheduleDate(newDate);
      fetchScheduleData({ date: dateStr(newDate) });
    }
  
    function handleNextWeek() {
      const newDate = getDateWithOffset(scheduleDate, 7);
      setScheduleDate(newDate);
      fetchScheduleData({ date: dateStr(newDate) });
    }
  
    function handleDateOffset(dayOffset, time) {
      const today = new Date();
      const thisMonday = getNearestPastMonday(today);
      let eventDate = getDateWithOffset(thisMonday, parseInt(dayOffset) - 1);
      if (today.getDay() === 0) {
        eventDate = getDateWithOffset(eventDate, -7);
      }
      const dateWithTime = addTimeToDate(eventDate, time);
      return dateWithTime;
    }

    function vmesna(ind) {
      dispatch(
        makeReservation(
          {
            schedule: t[ind].id,
            date: t[ind].start_datetime.split('T')[0],
          },
        ))
    }

    const RenderDataTable = () => {
      return (
          <DataTable> 
              <DataTable.Header>
                  <DataTable.Title>TERM</DataTable.Title>
              </DataTable.Header>
              {
              t.map((data, index) =>(
                  <DataTable.Row>
                      <DataTable.Cell>
                          <Button
                              buttonStyle={{
                              backgroundColor: colors.dark,
                              borderRadius: 10,
                              height: 45,
                              width: '100%'
                            }} 
                            titleStyle={{
                              color: "white",
                              fontSize: 16,
                            }}
                            id={index} title={data.title + " " + data.start_datetime.split('T')[0]} onPress={()=>vmesna(index)}  />
                      </DataTable.Cell>
                  </DataTable.Row>
              ))}
          </DataTable>
      )
    }

    return (
      <Overlay 
            overlayStyle={{
                width: windowWidth * .9,
            }}
            
            isVisible={visible}
            onBackdropPress={() => setVisible(false)}>
                <View>
                  { RenderDataTable() }
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
