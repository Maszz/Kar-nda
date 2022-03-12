import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';

const LANGUAGES = [
  {code: 'en', label: 'english'},
  {code: 'th', label: 'thai'},
];
const Selector = () => {
  const {t, i18n} = useTranslation();
  const selectedLanguageCode = i18n.language;

  const setLanguage = code => {
    return i18n.changeLanguage(code);
  };

  return (
    <View style={{backgroundColor: '#1F2937', height: '100%'}}>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.title}>{t('common:language')}</Text>
          <Ionicons color="white" size={28} name="ios-language-outline" />
        </View>
        {LANGUAGES.map(language => {
          const selectedLanguage = language.code === selectedLanguageCode;

          return (
            <Pressable
              key={language.code}
              style={styles.buttonContainer}
              disabled={selectedLanguage}
              onPress={() => setLanguage(language.code)}>
              <Text
                style={[selectedLanguage ? styles.selectedText : styles.text]}>
                {t(`common:${language.label}`)}
              </Text>
            </Pressable>
          );
        })}
      </View>
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
  title: {
    color: 'white',
    fontSize: 28,
    fontWeight: '600',
    marginLeft: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    marginTop: 15,
    marginLeft: 10,
  },
  text: {
    fontSize: 18,
    color: '#000',
    paddingVertical: 4,
  },
  selectedText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'tomato',
    paddingVertical: 4,
  },
});

export default Selector;
