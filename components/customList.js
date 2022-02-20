import React from 'react';
import { StyleSheet, ScrollView, Dimensions } from 'react-native';
import {
  VStack,
  HStack,
  Box,
  Text,
  Heading,
  FlatList,
  Avatar,
  Spacer,
  Pressable,
  Center,
  Divider,
} from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import ListComp from './listComponent';
import Icon from 'react-native-vector-icons/Ionicons';
const ListBox = props => {
  return (
    <Center style={{ marginTop: 20 }}>
      <Box
        w={
          Dimensions.get('window').width -
          (10 / 100) * Dimensions.get('window').width
        }
        minHeight={100}
        bgColor="#404040"
        rounded="lg"
        padding={2}>
        <VStack>
          {/* <TouchableOpacity
            onPress={() => {
              props.onPress.navigate('Language');
            }}>
            <ListItem settingName="Language setting" icon={props.icon} />
          </TouchableOpacity>
          <Line />
          <TouchableOpacity>
            <ListItem settingName="Other setting" icon={props.icon} />
          </TouchableOpacity>
          <Line />
          <TouchableOpacity>
            <ListItem settingName="ActionSheet setting" icon={props.icon} />
          </TouchableOpacity> */}
          <ListFormat items={props.items} navigation={props.onPress} />
        </VStack>
      </Box>
    </Center>
  );
};
const ListFormat = props => {
  return (
    <Box>
      {props.items.map((item, index) => {
        if (props.items.length - 1 > index) {
          return (
            <Box >
              <TouchableOpacity
                onPress={() => props.navigation.navigate(item.place)}>
                <ListItem
                  settingName={item.listName}
                  key={index}
                  icon={item.icon}
                  keyExtractor={(item, index) => item.listName}

                />
              </TouchableOpacity>

              <Line />
            </Box>
          );
        } else {
          return (
            <Box >
              <TouchableOpacity
                onPress={() => props.navigation.navigate(item.place)}>
                <ListItem
                  settingName={item.listName}
                  key={index}
                  icon={item.icon}
                  keyExtractor={(item, index) => item.listName}
                />
              </TouchableOpacity>
            </Box>
          );
        }
      })}
    </Box>
  );
};
const Line = () => {
  const windowWidth = Dimensions.get('window').width;

  return (
    <Box
      style={{ marginLeft: 50 }}
      w={(90 / 100) * windowWidth - (25 / 100) * windowWidth}
      h={0.35}
      backgroundColor="#a3a3a3"
    />
  );
};
const ListItem = props => {
  return (
    <Box style={{ marginTop: 3, marginBottom: 3 }}>
      <HStack space={4} justifyContent="space-between">
        {props.icon}
        <VStack justifyContent="center">
          <Text
            _dark={{
              color: 'warmGray.50',
            }}
            color="#e5e5e5"
            bold>
            {props.settingName}
          </Text>
        </VStack>
        <Spacer />

        <Icon name="chevron-forward-outline" size={30} color="#525252" />
      </HStack>
    </Box>
  );
};
export { ListBox, Line, ListItem };
