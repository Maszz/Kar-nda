import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  View,
  Text,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  ThemeProvider,
  Button,
  Input,
  Image,
  ListItem,
  Badge,
} from 'react-native-elements';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../database/DB';
import {connect} from 'react-redux';

const MainScreen = props => {
  const [User, setUser] = useState([]);

  const onGetUser = async () => {
    const collectionRef = collection(db, 'somedata-Collection');
    const userQuerySnapshot = await getDocs(collectionRef);
    const userArr = [];

    userQuerySnapshot.forEach(doc => {
      const {name, email} = doc.data();
      userArr.push({
        key: doc.id,
        name,
        email,
      });
    });
    setUser(userArr);
  };
  useEffect(() => {
    onGetUser();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <ScrollView style={styles.container}>
        <Text
          style={{marginLeft: 'auto', marginRight: 'auto', marginBottom: 20}}>
          Data In Database
        </Text>
        {User.map((item, i) => {
          return (
            <ListItem key={i} bottomDivider containerStyle={{marginBottom: 10}}>
              <Badge Value={i + 1} />
              <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
                <ListItem.Subtitle>{item.email}</ListItem.Subtitle>
                <ListItem.Subtitle>{item.key}</ListItem.Subtitle>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          );
        })}
      </ScrollView>
    </ThemeProvider>
  );
};

const theme = {
  Button: {
    raised: true,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  preloader: {
    prosition: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = state => {
  const {user} = state;
  return {user};
};

export default connect(mapStateToProps)(MainScreen);
