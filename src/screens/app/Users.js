import React, { useEffect, useState, useRef  } from 'react'
import { Text, View, Modal, StyleSheet, Pressable, ScrollView } from 'react-native'
import { Button, SearchBar } from 'react-native-elements'
import { useSelector, useDispatch } from "react-redux";
import { SelectList } from 'react-native-dropdown-select-list'
import { Title, DataTable, Paper} from 'react-native-paper';
import moment from "moment";
import Timetable from "react-native-calendar-timetable";
import MyItemCard from '../../components/CardComponent';
import { getCourtTypes, getCourts, getCourtDetail, getLocationDetail } from '../../actions/common';
import { getManagementSchedule } from '../../actions/management';
import { useParams } from "react-router-dom";
import MakeReservationModal from '../../components/modals/MakeReservationModal';
import WeeklyCalendar from 'react-native-weekly-calendar';
import { Provider as PaperProvider } from 'react-native-paper';




export default function({ navigation }) {
    const dispatch = useDispatch();
    const [court, setCourt] = useState({});

  
    const isLoading = useSelector((state) => state.common.loading);
    const courts = useSelector((state) => state.common.locationCourts ?? []);
    const courtTypes = useSelector((state) => state.common.courtTypes);
  
    const courtTypeRef = useRef(null);
    const searchRef = useRef(null);

    const [search, setSearch] = React.useState("");
    
    const [selectedType, setSelectedType] = React.useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [date] = React.useState(new Date());

    const [from] = React.useState(moment().subtract(5, 'days').toDate());
    const [till] = React.useState(moment().add(3, 'days').toISOString());
    const range = {from, till};

    const { courtId, locationId } = useParams();

    const [scheduleDate, setScheduleDate] = useState(new Date());

    console.log(scheduleDate);

    const sampleEvents = [
      { 'start': '2023-01-02 08:00:00', 'duration': '08:00:00', 'note': 'PROSTO' },
      { 'start': '2023-01-02 16:00:00', 'duration': '02:00:00', 'note': 'ODBOJKA - FIRMA X' },
      { 'start': '2023-01-02 19:00:00', 'duration': '2:00:00', 'note': 'ODBOJKA - FIRMA Z' },
      { 'start': '2023-01-02 18:00:00', 'duration': '01:00:00', 'note': 'PROSTO' },        
      { 'start': '2023-01-02 21:00:00', 'duration': '01:00:00', 'note': 'PROSTO' },
  ]

    useEffect(() => {
        dispatch(getCourtTypes());
        dispatch(
          getCourts({
            search: searchRef?.current?.props?.value,
            courtType: courtTypeRef?.current,
          })
        );
    }, [courtTypeRef]);

    function showLocation(id) {
      console.log(id)
      setCourt(courts[id])
      setModalVisible(true)
    }

    let type = [];

    courtTypes.forEach(function (arrayItem) {
        type.push({
            key: arrayItem.id,
            value: arrayItem.name,
        });
    });

    function filter() {
        dispatch(
          getCourts({
            search: searchRef?.current?.props?.value,
            courtType: courtTypeRef?.current,
          })
        );
    }

    console.log(courts)

    const numberOfItemsPerPageList = [6,7,8,9,10];

    const items = [
      {
        key: 1,
        name: 'Page 1',
      },
      {
        key: 2,
        name: 'Page 2',
      },
      {
        key: 3,
        name: 'Page 3',
      },
    ];

    console.log(courtTypes)

    function functionCombined() {
      courtTypeRef.current = selectedType
      filter();
    }  
  

    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
    const fromm = page * numberOfItemsPerPage;
    const to = Math.min((page + 1) * numberOfItemsPerPage, items.length);
  
    React.useEffect(() => {
       setPage(0);
    }, [numberOfItemsPerPage]);


    const RenderDataTable = () => {
        return (
          <PaperProvider>
            <DataTable> 
                <DataTable.Header>
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Title>Location</DataTable.Title>
                    <DataTable.Title>More info</DataTable.Title>
                </DataTable.Header>
                {courts.slice(page * numberOfItemsPerPage, page * numberOfItemsPerPage + numberOfItemsPerPage).map((court, index) =>(
                    <DataTable.Row>
                        <DataTable.Cell>{court.name}</DataTable.Cell>
                        <DataTable.Cell> 
                            <Button id={index} title={"edit"}  onPress={()=>showLocation(index)} />
                        </DataTable.Cell>
                    </DataTable.Row>
                ))}
        <DataTable.Pagination
          page={page}
          numberOfPages={Math.ceil(items.length / numberOfItemsPerPage)}
          onPageChange={(page) => setPage(page)}
          label={`${fromm + 1}-${to} of ${items.length}`}
          showFastPaginationControls
          numberOfItemsPerPageList={numberOfItemsPerPageList}
          numberOfItemsPerPage={numberOfItemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          selectPageDropdownLabel={'Rows per page'}
        />
            </DataTable>
          </PaperProvider>
        )
    }
    
    const updateSearch = (search) => {
        setSearch(search);
        filter();
    };

    return (
        <View>
            <Text>
                Available reservations
            </Text>
            <SearchBar
                placeholder="Type Here..."
                onChangeText={updateSearch}
                value={search}
                ref={searchRef}
            />

            <SelectList 
                setSelected={(val) => setSelectedType(val)} 
                data={type} 
                onSelect={() => functionCombined()} 
                save="key"
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
