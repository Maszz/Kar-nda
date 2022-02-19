import React, { Component, useState, useEffect } from 'react';
import { Alert, StyleSheet, Text, View, TouchableOpacity, } from 'react-native';
import { Agenda, DateData, AgendaEntry, AgendaSchedule } from 'react-native-calendars';
import { Divider } from 'native-base';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../state/';



const AgendaComponents = () => {
    const [itemsCard, setItemCard] = useState({})
    const eventsState = useSelector(state => state.events);

    const dispatch = useDispatch();

    const { addEvent } = bindActionCreators(
        actionCreators.eventsActionCreator,
        dispatch,
    );
    const renderItem = (reservation, isFirst) => {
        const fontSize = isFirst ? 16 : 14;
        const color = isFirst ? 'black' : '#43515c';

        return (
            <TouchableOpacity
                style={[styles.item, { height: 70 }]}
                onPress={() => Alert.alert(reservation.name)}
            >
                <Text style={{ fontSize, color }}>{reservation.name}</Text>
            </TouchableOpacity>
        );
    }
    const loadItems = (day) => {
        const items = itemsCard || {};

        setTimeout(() => {
            for (let i = -20; i < 50; i++) {
                const time = day.timestamp + i * 24 * 60 * 60 * 1000;
                const strTime = timeToString(time);

                if (!items[strTime]) {
                    items[strTime] = [];
                }
            }

            const newItems = {};
            Object.keys(items).forEach(key => {
                newItems[key] = items[key];
            });
            // setItemCard(
            //     newItems
            // );
        }, 1000);
    }
    const renderEmptyDate = () => {
        return (
            <View style={styles.emptyDate}>
                <Divider />
            </View>
        );
    }

    const rowHasChanged = (r1, r2) => {
        return r1.name !== r2.name;
    }

    const timeToString = (time) => {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }

    useEffect(() => {
        // setItemCard({ '2022-02-15': [{ name: "wowza", height: 50 }, { name: "wowza", height: 50 }, { name: "wowza", height: 50 }], '2022-02-16': [{ name: "wowza", height: 100 }] })
        // setItemCard({
        //     [new Date(Date.now()).toISOString().split('T')[0]]: []
        // })
        const tempObj = {}
        for (const item of eventsState.events) {
            const day = item.start.split('T')[0]
            const name = item.title
            tempObj[day] = [{ name: name }]

        }
        console.log(tempObj)
        setItemCard(tempObj)
    }, [eventsState])

    return (
        <Agenda
            items={itemsCard}
            loadItemsForMonth={loadItems}
            selected={new Date(Date.now())}
            renderItem={renderItem}
            renderEmptyDate={renderEmptyDate}
            rowHasChanged={rowHasChanged}
            showClosingKnob={true}
            // renderDay={(day, item) => (<Text>{day ? day.day : 'item'}</Text>)}

            // markingType={'period'}
            // markedDates={{
            //    '2017-05-08': {textColor: '#43515c'},
            //    '2017-05-09': {textColor: '#43515c'},
            //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
            //    '2017-05-21': {startingDay: true, color: 'blue'},
            //    '2017-05-22': {endingDay: true, color: 'gray'},
            //    '2017-05-24': {startingDay: true, color: 'gray'},
            //    '2017-05-25': {color: 'gray'},
            //    '2017-05-26': {endingDay: true, color: 'gray'}}}
            // monthFormat={'yyyy'}
            // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
            // hideExtraDays={false}
            showOnlySelectedDayItems={true}
        />
    );
};



// export default class AgendaScreen extends Component {
//     state = {
//         items: { '2022-02-15': [{ name: "wowza", height: 50 }, { name: "wowza", height: 50 }, { name: "wowza", height: 50 }], '2022-02-16': [{ name: "wowza", height: 100 }] }
//     };


//     render() {
//         return (
//             <Agenda
//                 items={this.state.items}
//                 loadItemsForMonth={this.loadItems}
//                 selected={new Date(Date.now())}
//                 renderItem={this.renderItem}
//                 renderEmptyDate={this.renderEmptyDate}
//                 rowHasChanged={this.rowHasChanged}
//                 showClosingKnob={true}

//             // markingType={'period'}
//             // markedDates={{
//             //    '2017-05-08': {textColor: '#43515c'},
//             //    '2017-05-09': {textColor: '#43515c'},
//             //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
//             //    '2017-05-21': {startingDay: true, color: 'blue'},
//             //    '2017-05-22': {endingDay: true, color: 'gray'},
//             //    '2017-05-24': {startingDay: true, color: 'gray'},
//             //    '2017-05-25': {color: 'gray'},
//             //    '2017-05-26': {endingDay: true, color: 'gray'}}}
//             // monthFormat={'yyyy'}
//             // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
//             //renderDay={(day, item) => (<Text>{day ? day.day: 'item'}</Text>)}
//             // hideExtraDays={false}
//             // showOnlySelectedDayItems
//             />
//         );
//     }

//     loadItems = (day) => {
//         const items = this.state.items || {};

//         setTimeout(() => {
//             for (let i = -20; i < 85; i++) {
//                 const time = day.timestamp + i * 24 * 60 * 60 * 1000;
//                 const strTime = this.timeToString(time);

//                 if (!items[strTime]) {
//                     items[strTime] = [];

//                     // const numItems = Math.floor(Math.random() * 3 + 1);
//                     // for (let j = 0; j < numItems; j++) {
//                     //     items[strTime].push({
//                     //         name: 'Item for ' + strTime + ' #' + j,
//                     //         height: Math.max(50, Math.floor(Math.random() * 150)),
//                     //         day: strTime
//                     //     });
//                     // }
//                 }
//             }

//             const newItems = {};
//             Object.keys(items).forEach(key => {
//                 newItems[key] = items[key];
//             });
//             this.setState({
//                 items: newItems
//             });
//         }, 1000);
//     }

//     renderItem = (reservation, isFirst) => {
//         const fontSize = isFirst ? 16 : 14;
//         const color = isFirst ? 'black' : '#43515c';

//         return (
//             <TouchableOpacity
//                 style={[styles.item, { height: 70 }]}
//                 onPress={() => Alert.alert(reservation.name)}
//             >
//                 <Text style={{ fontSize, color }}>{reservation.name}</Text>
//             </TouchableOpacity>
//         );
//     }

//     renderEmptyDate = () => {
//         return (
//             <View style={styles.emptyDate}>
//                 <Divider />
//             </View>
//         );
//     }

//     rowHasChanged = (r1, r2) => {
//         return r1.name !== r2.name;
//     }

//     timeToString(time) {
//         const date = new Date(time);
//         return date.toISOString().split('T')[0];
//     }
// }

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 20,
        flex: 1,
        paddingTop: 30
    }
});


export default AgendaComponents