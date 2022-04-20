import React, {useState, useEffect, useCallback, useReducer} from 'react';
import {Alert} from 'react-native';
import {
  ZStack,
  Box,
  VStack,
  Divider,
  Text,
  Container,
  Checkbox,
  HStack,
  useToast,
  Center,
  Heading,
  Input,
  IconButton,
} from 'native-base';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {Styles} from '../styles';
import {useFocusEffect, useIsFocused} from '@react-navigation/native';
import {useSelector, connect} from 'react-redux';
import {actionCreators} from '../state/';

const Todolist = ({
  setTodoListState,
  selectedDate,
  todoListItems,
  selectedDateState,
  setTodoLength,
}) => {
  const [list, setList] = React.useState([]);
  const [inputValue, setInputValue] = React.useState('');
  const toast = useToast();

  const addItem = todoTitle => {
    if (todoTitle === '') {
      toast.show({
        todoTitle: 'Please Enter Text',
        status: 'warning',
      });
      return;
    }

    // setList(prevList => {
    //   return [
    //     ...prevList,
    //     {
    //       todoTitle: todoTitle,
    //       ischecked: false,
    //     },
    //   ];
    // });
    const temp = [
      ...list,
      {
        todoTitle: todoTitle,
        ischecked: false,
      },
    ];
    // console.log({
    //   date: selectedDateState.format().split('T')[0],
    //   todoItem: temp,
    // });
    setTodoListState({
      date: selectedDateState.format().split('T')[0],
      todoItem: temp,
    });
  };

  const handleDelete = index => {
    // setList(prevList => {
    //   const temp = prevList.filter((_, itemI) => itemI !== index);
    //   return temp;
    // });
    const temp2 = list.filter((_, itemI) => itemI !== index);
    console.log(temp2);

    setTodoListState({
      date: selectedDateState.format().split('T')[0],
      todoItem: temp2,
    });
  };

  const handleStatusChange = index => {
    const newList2 = [...list];

    // setList(prevList => {
    //   const newList = [...prevList];
    //   newList[index].ischecked = !newList[index].ischecked;
    //   return newList;
    // });
    console.log('NewList:', newList2);

    newList2[index].ischecked = !newList2[index].ischecked;
    console.log('NewList:', newList2);
    setTodoListState({
      date: selectedDateState.format().split('T')[0],
      todoItem: newList2,
    });
  };
  const todoListItemsStateCallback = useCallback(() => {
    const currentDate = selectedDateState.format().split('T')[0];

    const todolistDays = Object.keys(todoListItems.todoItem);
    console.log(todolistDays);
    setList([]);
    var memorizedKey = '';
    for (const key of todolistDays) {
      if (key == currentDate) {
        setList(todoListItems.todoItem[key]);
        memorizedKey = key;
        console.log('incase');
        break;
      }
    }
    var todoUncheckedCount = 0;
    const temp = todoListItems.todoItem[memorizedKey];
    if (temp) {
      for (const item of temp) {
        if (item.ischecked) {
          todoUncheckedCount++;
        }
      }
      console.log(temp.length - todoUncheckedCount);
      setTodoLength(temp.length - todoUncheckedCount);
    } else {
      setTodoLength(0);
    }
  }, [selectedDateState, todoListItems]);
  useEffect(() => {
    todoListItemsStateCallback();
  }, [todoListItemsStateCallback]);

  return (
    <Center w="100%">
      <Box w="100%" px={5}>
        {/* <Heading mb="2" size="md">
          Wednesday
        </Heading> */}
        <VStack space={4}>
          {/* <HStack space={2}>
            <Input
              flex={1}
              onChangeText={v => setInputValue(v)}
              value={inputValue}
              color={'#ffff'}
              placeholder="Add Task"
            />
            <IconButton
              borderRadius="sm"
              variant="solid"
              icon={<EntypoIcon name="plus" size={12} color="#ffff" />}
              onPress={() => {
                addItem(inputValue);
                setInputValue('');
              }}
            />
          </HStack> */}
          <VStack space={2}>
            {list.map((item, itemI) => (
              <HStack
                w="100%"
                justifyContent="space-between"
                alignItems="center"
                key={item.todoTitle + itemI.toString()}>
                <Checkbox
                  isChecked={item.ischecked}
                  onChange={() => handleStatusChange(itemI)}
                  value={item.todoTitle}>
                  <Text></Text>
                </Checkbox>
                <Text
                  width="100%"
                  flexShrink={1}
                  textAlign="left"
                  mx="2"
                  strikeThrough={item.ischecked}
                  style={{color: item.ischecked ? 'gray' : 'white'}}
                  onPress={() => handleStatusChange(itemI)}>
                  {item.todoTitle}
                </Text>
                <IconButton
                  size="sm"
                  color={'white'}
                  icon={<EntypoIcon name="minus" size={12} color="#fff" />}
                  onPress={() => {
                    Alert.alert('Delete', 'Did you want to delete this item?', [
                      {
                        text: 'Cancel',
                        onPress: () => {
                          console.log('cancel');
                        },
                        style: 'cancel',
                      },
                      {
                        text: 'Yes',
                        onPress: () => {
                          console.log('Cancel Pressed');
                          handleDelete(itemI);
                        },
                        style: 'default',
                      },
                    ]);

                    // handleDelete(itemI);
                  }}
                />
              </HStack>
            ))}
          </VStack>
        </VStack>
      </Box>
    </Center>
  );
};
const mapStateToProps = function (state) {
  return {
    selectedDateState: state.selectedDate.selectedDateState,

    todoListItems: state.todoList,
  };
};
const mapDispatchToProps = {
  setTodoListState: actionCreators.todoListActionCreator.setTodoList,
  setTodoLength: actionCreators.todoListActionCreator.setTodoLength,
};
export default connect(mapStateToProps, mapDispatchToProps)(Todolist);
// export default Todolist;
