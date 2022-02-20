import React, { useState, useEffect } from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Calendar } from 'react-native-big-calendar';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
} from '@react-navigation/drawer';
import dayjs from 'dayjs';
import Icon from 'react-native-vector-icons/dist/Ionicons';
import CalendarStrip from 'react-native-calendar-strip';
import moment from 'moment';
import { ZStack, Box, VStack, Divider, Text, Container } from 'native-base';
import { ScrollView } from 'react-native-gesture-handler';
import ActionButton from 'react-native-action-button';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state/index';

const BriefLayout = props => {


    const [eventCard, setEventCard] = useState([])
    const eventsState = useSelector(state => state.events);


    useEffect(() => {
        const tempArr = []

        for (const event of eventsState.events) {
            const currentDate = new Date(Date.now()).toISOString().split('T')[0]
            if (currentDate == event.start) {
                const tempObj = {}
                tempObj["title"] = event.title
                tempObj["startTime"] = event.start.split('T')[0]
                tempObj["endTime"] = event.end.split('T')[0]
                tempArr.push(tempObj)
            }

        }

        setEventCard(tempArr)
    }, [eventsState])
    return (
        <View style={{ backgroundColor: "#1F2937", flex: 1 }}>
            <CalendarStrip
                scrollable
                selectedDate={new Date(Date.now())}
                calendarAnimation={{ type: 'sequence', duration: 30 }}
                style={{ height: 50, paddingHorizontal: 5, marginTop: 25 }}

                daySelectionAnimation={{
                    type: 'border',
                    duration: 200,
                    borderWidth: 1,
                    borderHighlightColor: 'white',
                }}
                calendarColor={styles.bgcolor.backgroundColor}
                dayContainerStyle={{ backgroundColor: "white", width: 34, height: 50, borderRadius: 10 }}

                onDateSelected={e => {
                    let tempArr = []
                    for (const event of eventsState.events) {
                        console.log(event)
                        if (e.toISOString().split("T")[0] == event.start.split('T')[0]) {
                            tempArr.push(event)
                        }
                    }
                    setEventCard(tempArr)
                    console.log(tempArr)
                }}
                highlightDateNameStyle={{ color: 'white' }}
                highlightDateNumberStyle={{ color: 'white' }}
                highlightDateContainerStyle={{ backgroundColor: '#7CC2FF' }}
                dateNumberStyle={{ color: 'black' }}
                dateNameStyle={{ color: 'gray' }}
                calendarHeaderStyle={{ color: 'white', display: 'none' }}
                iconContainer={{ flex: 0.1, display: 'none' }}
            />


            <VStack style={{ padding: 25 }}>
                <Text style={{ color: 'white' }}>Events</Text>
                <Box style={{ backgroundColor: 'white' }} width={Dimensions.get('window').width - 50} height={0.5} />
                <ScrollView height={166} style={{ marginTop: 20 }} showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                    {eventCard.map((item, i) => {
                        return (
                            <TouchableOpacity keyExtractor={(item, index) => item.title}>
                                <Box width={Dimensions.get('window').width - 50} height={75} border="1" borderRadius="2xl" style={{ backgroundColor: '#7CC2FF', marginBottom: 15 }}>
                                    <VStack style={{ padding: 10 }}>
                                        <Text style={{ fontWeight: 'bold', color: "white", fontSize: 18 }}>
                                            {item.title}
                                        </Text>
                                        <Text style={{ color: 'white', fontSize: 13 }}>
                                            {item.description}
                                        </Text>
                                    </VStack>
                                </Box>
                            </TouchableOpacity>

                        )
                    })}

                </ScrollView>
                <Text style={{ color: 'white', marginTop: 10 }}>List To do</Text>
                <Box style={{ backgroundColor: 'white', marginBottom: 20 }} width={Dimensions.get('window').width - 50} height={0.5} />
                <TouchableOpacity>
                    <Box width={Dimensions.get('window').width - 50} height={75} border="1" borderRadius="2xl" style={{ backgroundColor: '#7CC2FF', marginBottom: 10 }}>
                    </Box>
                </TouchableOpacity>
                <VStack>

                    <Text style={{ color: 'white' }}>Dairy</Text>
                    <Box style={{ backgroundColor: 'white', marginBottom: 20 }} width={Dimensions.get('window').width - 50} height={0.5} />


                    <TouchableOpacity>
                        <Box width={Dimensions.get('window').width - 50} height={75} border="1" borderRadius="2xl" style={{ backgroundColor: '#7CC2FF', marginBottom: 20 }}>
                        </Box>
                    </TouchableOpacity>


                </VStack>



            </VStack>
            <ActionButton buttonColor="rgba(231,76,60,1)" style={{ marginBottom: 10 }}>
                <ActionButton.Item
                    buttonColor="#9b59b6"
                    title="New Task"
                    onPress={() => console.log('notes tapped!')}>
                    <Icon name="md-create" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item
                    buttonColor="#3498db"
                    title="Notifications"
                    onPress={() => { }}>
                    <Icon name="md-notifications-off" style={styles.actionButtonIcon} />
                </ActionButton.Item>
                <ActionButton.Item
                    buttonColor="#1abc9c"
                    title="All Tasks"
                    onPress={() => { }}>
                    <Icon name="md-done-all" style={styles.actionButtonIcon} />
                </ActionButton.Item>
            </ActionButton>
        </View >
    );
};

const styles = StyleSheet.create({
    bgcolor: {
        backgroundColor: "#1F2937"
    }
})

export default BriefLayout