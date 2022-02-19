import React, { useState } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
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

const BriefLayout = props => {


    return (
        <View style={{ backgroundColor: "#1F2937", flex: 1 }}>
            <CalendarStrip
                scrollable
                selectedDate={new Date(Date.now())}
                calendarAnimation={{ type: 'sequence', duration: 30 }}
                style={{ height: 70, paddingHorizontal: 5, marginTop: 10 }}

                daySelectionAnimation={{
                    type: 'border',
                    duration: 200,
                    borderWidth: 1,
                    borderHighlightColor: 'white',
                }}
                calendarColor={styles.bgcolor.backgroundColor}
                dayContainerStyle={{ backgroundColor: "white", width: 34, height: 50, borderRadius: 10 }}

                onDateSelected={e => {
                    console.log(e);
                }}
                highlightDateNameStyle={{ color: 'white' }}
                highlightDateNumberStyle={{ color: 'white' }}
                highlightDateContainerStyle={{ backgroundColor: '#7CC2FF' }}
                dateNumberStyle={{ color: 'black' }}
                dateNameStyle={{ color: 'gray' }}
                calendarHeaderStyle={{ color: 'white', display: 'none' }}
                iconContainer={{ flex: 0.1, display: 'none' }}
            />


            <VStack style={{ padding: 25, marginTop: 10 }}>
                <Text style={{ color: 'white' }}>Events</Text>
                <Box style={{ backgroundColor: 'white' }} width={Dimensions.get('window').width - 50} height={0.5} />
                <ScrollView height={166} style={{ marginTop: 20 }} showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}>
                    <Box width={Dimensions.get('window').width - 50} height={75} border="1" borderRadius="2xl" style={{ backgroundColor: '#7CC2FF', marginBottom: 20 }}>

                    </Box>
                    <Box width={Dimensions.get('window').width - 50} height={75} border="1" borderRadius="2xl" style={{ backgroundColor: '#7CC2FF', marginBottom: 20 }}>


                    </Box>

                </ScrollView>
                <Text style={{ color: 'white', marginVertical: 20 }}>List to do</Text>
                <Box width={Dimensions.get('window').width - 50} height={75} border="1" borderRadius="2xl" style={{ backgroundColor: 'white', marginBottom: 20 }}>


                </Box>


                <Text style={{ color: 'white' }}>Dairy</Text>

                <VStack>
                    <Box style={{ backgroundColor: 'white', marginBottom: 20 }} width={Dimensions.get('window').width - 50} height={0.5} />
                    <Box width={Dimensions.get('window').width - 50} height={75} border="1" borderRadius="2xl" style={{ backgroundColor: 'white', marginBottom: 20 }}>


                    </Box>
                </VStack>



            </VStack>
            <ActionButton buttonColor="rgba(231,76,60,1)">
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