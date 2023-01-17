import React, { useEffect, useState, useRef  } from 'react'
import { Text, View, Modal, StyleSheet, ImageBackground, ScrollView } from 'react-native'
import { Button, SearchBar } from 'react-native-elements'
import { useSelector, useDispatch } from "react-redux";
import { SelectList } from 'react-native-dropdown-select-list'
import { Title, DataTable, Paper} from 'react-native-paper';
import { getCourtTypes, getCourts, getCourtDetail, getLocationDetail } from '../../actions/common';
import { getManagementSchedule } from '../../actions/management';
import { useParams } from "react-router-dom";
import MakeReservationModal from '../../components/modals/MakeReservationModal';
import image from "../../assets/landing1.jpg"
import { colors } from '../../assets/style';
import {
  dateStr,
  cmpDates,
  formatFromTo,
  handleCourtTimelineTitle,
  handleWeekDay,
} from '../../actions/helper';


export default function({ navigation }) {
    const dispatch = useDispatch();

    const timeline = useSelector((state) => state.management.timeline);
    const courts = useSelector((state) => state.common.locationCourts ?? []);
    const courtTypes = useSelector((state) => state.common.courtTypes);
  
    const courtTypeRef = useRef(null);
    const searchRef = useRef(null);

    const [search, setSearch] = React.useState("");
    
    const [selectedType, setSelectedType] = React.useState("");
    const [modalVisible, setModalVisible] = useState(false);

    const { courtId, locationId } = useParams();

    const [scheduleDate, setScheduleDate] = useState(handleWeekDay());

    function fetchScheduleData(filters, id, courtId) {
      dispatch(
        getManagementSchedule({
          court: courtId,
          location: id,
          ...filters,
        })
      );
    }
  
    useEffect(() => {
      const dateFilter = dateStr(new Date("2023-01-17"));
      console.log(dateFilter)
      fetchScheduleData({date: dateFilter}, 0, courtId);
      dispatch(getCourtDetail(courtId));
    }, []);

    useEffect(() => {
        dispatch(getCourtTypes());
        dispatch(
          getCourts({
            search: searchRef?.current?.props?.value,
            courtType: courtTypeRef?.current,
          })
        );
    }, [courtTypeRef]);

    function showLocation(c) {
      const dateFilter = dateStr(scheduleDate);
      
      fetchScheduleData({date: dateFilter}, c.location.id, c.id);
      console.log(timeline);
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

    const numberOfItemsPerPageList = [2,3,4];

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

    function functionCombined() {
      courtTypeRef.current = selectedType
      filter();
    }  

    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
    const from = page * numberOfItemsPerPage;
    const to = Math.min((page + 1) * numberOfItemsPerPage, items.length);
  
    React.useEffect(() => {
       setPage(0);
    }, [numberOfItemsPerPage]);

    const RenderDataTable = () => {
        return (
            <View>
            <DataTable> 
                <DataTable.Header>
                    <DataTable.Title>Name</DataTable.Title>
                    <DataTable.Title>Location</DataTable.Title>
                    <DataTable.Title>More info</DataTable.Title>
                </DataTable.Header>
                {courts.slice(page * numberOfItemsPerPage, page * numberOfItemsPerPage + numberOfItemsPerPage).map((court, index) =>(
                    <DataTable.Row>
                        <DataTable.Cell>{court.name}</DataTable.Cell>
                        <DataTable.Cell>{court.location.name}</DataTable.Cell>

                        <DataTable.Cell> 
                            <Button buttonStyle={{
                                    backgroundColor: colors.dark,
                                    borderRadius: 10,
                                    height: 45
                                }}                            
                            id={index} title={"availablity"}  onPress={()=>showLocation(court)} />
                        </DataTable.Cell>
                    </DataTable.Row>
                ))}
                <DataTable.Pagination
                  page={page}
                  numberOfPages={Math.ceil(items.length / numberOfItemsPerPage)}
                  onPageChange={(page) => setPage(page)}
                  label={`${from + 1}-${to} of ${items.length}`}
                  showFastPaginationControls
                  numberOfItemsPerPageList={numberOfItemsPerPageList}
                  numberOfItemsPerPage={numberOfItemsPerPage}
                />
            </DataTable>
            </View>
        )
    }
    
    const updateSearch = (search) => {
        setSearch(search);
        filter();
    };

    return (
        <View>
          <ImageBackground source={image} style={ {width: "100%", height: "100%"}}>

            <Text>
                Available reservations
            </Text>
            <SearchBar
                platform='default'
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
              <MakeReservationModal visible={modalVisible} setVisible={setModalVisible} t = { timeline } ></MakeReservationModal>
            </View>
            </ImageBackground>
        </View>
    )
}
