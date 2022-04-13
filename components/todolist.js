import React, {useState, useEffect} from 'react';

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
const Example = ({list, setList, setTodoListState, selectedDate}) => {
  //   const [list, setList] = React.useState(instState);
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

    setList(prevList => {
      return [
        ...prevList,
        {
          todoTitle: todoTitle,
          ischecked: false,
        },
      ];
    });
    const temp = [
      ...list,
      {
        todoTitle: todoTitle,
        ischecked: false,
      },
    ];
    console.log({
      date: selectedDate.format().split('T')[0],
      todoItem: temp,
    });
    setTodoListState({
      date: selectedDate.format().split('T')[0],
      todoItem: temp,
    });
  };

  const handleDelete = index => {
    setList(prevList => {
      const temp = prevList.filter((_, itemI) => itemI !== index);
      return temp;
    });
    const temp2 = list.filter((_, itemI) => itemI !== index);
    console.log(temp2);

    setTodoListState({
      date: selectedDate.format().split('T')[0],
      todoItem: temp2,
    });
  };

  const handleStatusChange = index => {
    setList(prevList => {
      const newList = [...prevList];
      newList[index].ischecked = !newList[index].ischecked;
      return newList;
    });
  };

  return (
    <Center w="100%">
      <Box maxW="300" w="100%">
        {/* <Heading mb="2" size="md">
          Wednesday
        </Heading> */}
        <VStack space={4}>
          <HStack space={2}>
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
              icon={<FeatherIcon name="plus" size={12} color="#cdcdcd" />}
              onPress={() => {
                addItem(inputValue);
                setInputValue('');
              }}
            />
          </HStack>
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
                  onPress={() => handleDelete(itemI)}
                />
              </HStack>
            ))}
          </VStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default Example;
