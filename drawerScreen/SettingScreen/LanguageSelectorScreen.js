import React from 'react';
import {
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import {LocaleConfig} from 'react-native-calendars';
import moment from 'moment';
import {Box, View, Text, HStack, VStack, Spacer} from 'native-base';
import Icon from 'react-native-vector-icons/Ionicons';
import {Styles} from '../../styles';
const LANGUAGES = [
  {code: 'en', label: 'english'},
  {code: 'th', label: 'thai'},
];

const ListItem = () => {
  return (
    <Box
      style={{marginTop: 3, marginBottom: 3}}
      w={
        Dimensions.get('window').width -
        (10 / 100) * Dimensions.get('window').width
      }
      py={2}
      px={3}
      bgColor={'rgba(147, 147, 147, 0.3)'}
      rounded="lg">
      <HStack space={4} justifyContent="space-between">
        <Icon name="language-sharp" size={30} color="#ecfeff" />
        <VStack justifyContent="center">
          <Text color="#e5e5e5" bold>
            Languages
          </Text>
        </VStack>
        <Spacer />
        <Icon name="chevron-forward-outline" size={30} color="#525252" />
      </HStack>
    </Box>
  );
};

const Selector = () => {
  const {t, i18n} = useTranslation();
  const selectedLanguageCode = i18n.language;

  const setLanguage = code => {
    return i18n.changeLanguage(code);
  };

  return (
    <View
      style={{
        backgroundColor: '#1F2937',
        height: '100%',
        paddingHorizontal: 15,
      }}>
      <HStack
        justifyContent="space-between"
        style={{marginTop: 25}}
        w={
          Dimensions.get('window').width -
          (8 / 100) * Dimensions.get('window').width
        }>
        <Text
          style={{
            color: Styles.globalStyles.textPrimaryColor,
            // fontSize: 25,
            fontWeight: 'bold',
            letterSpacing: 1,
          }}>
          {t('common:language')}
        </Text>
        <Ionicons
          color={Styles.globalStyles.primaryColor}
          size={28}
          name="ios-language-outline"
        />
      </HStack>
      <Box style={{alignItems: 'center'}}>
        {LANGUAGES.map(language => {
          const selectedLanguage = language.code === selectedLanguageCode;

          return (
            <Pressable
              key={language.code}
              style={{}}
              disabled={selectedLanguage}
              onPress={async () => {
                setLanguage(language.code);

                if (language.code == 'th') {
                  LocaleConfig.defaultLocale = 'th';
                  moment.locale('th');
                } else {
                  LocaleConfig.defaultLocale = '';
                  moment.locale('en');
                }
              }}>
              <Box
                style={{marginTop: 3, marginBottom: 3}}
                w={
                  Dimensions.get('window').width -
                  (8 / 100) * Dimensions.get('window').width
                }
                py={2}
                px={3}
                bgColor={'rgba(147, 147, 147, 0.3)'}
                rounded="lg">
                <HStack space={4} justifyContent="space-between">
                  <Box />
                  <VStack justifyContent="center">
                    <Text
                      style={[
                        selectedLanguage ? styles.selectedText : styles.text,
                      ]}>
                      {t(`common:${language.label}`)}
                    </Text>
                  </VStack>
                  <Spacer />
                </HStack>
              </Box>
            </Pressable>
          );
        })}
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  buttonContainer: {
    marginTop: 15,
    marginLeft: 10,
  },
  text: {
    fontSize: 18,
    color: Styles.globalStyles.textPrimaryColor,
    paddingVertical: 4,
    letterSpacing: 1,
  },
  selectedText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#4AA9FF',
    paddingVertical: 4,
    letterSpacing: 1,
  },
});

export default Selector;
