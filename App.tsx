/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  TouchableOpacity,
  View,
  GestureResponderEvent,
} from 'react-native';
import { Formik } from 'formik';
import BouncyCheckbox from "react-native-bouncy-checkbox";

// FORM VALIDATION
import * as Yup from 'yup';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

export default function App(): React.JSX.Element {

  const [password, setPassword] = useState('');
  const [isPasswordGenarated, setIsPasswordGenarated] = useState(false);
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);

  const genaratePasswordString = (passwordLength: number) => {
    let charecterlist = '';
    const uppercaseChar = 'ABCDEFGHIJLMOPQRSTUVWXYZ';
    const lowercaseChar = 'abcdefghijlmnopqrstuvwxyz';
    const digitChar = '1234567890';
    const specialChar = '!@#$%^&*()_+';

    if(upperCase){
      charecterlist += uppercaseChar;
    }

    if(lowerCase){
      charecterlist += lowercaseChar;
    }

    if(numbers) {
      charecterlist += digitChar;
    }

    if(symbols){
      charecterlist += specialChar;
    }

    const passwordResult = createPassword(charecterlist, passwordLength)
    setPassword(passwordResult);
    setIsPasswordGenarated(true);
  }

  const createPassword =  (charecters: string, passwordLength: number  ) => {
    let result = '';
    for(let i = 0; i < passwordLength; i++) {
      const charecterIndex = Math.round(Math.random() * charecters.length);
      result += charecters.charAt(charecterIndex);
    }
    return result;
  }

  const resetPassword = () => {
    setPassword('');
    setIsPasswordGenarated(false);
    setLowerCase(true);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  }

  const passwordSchema = Yup.object().shape({
    passwordLength: Yup.number()
    .min(4, 'Minimum 4 charecters of number')
    .max(16, 'Max length is 16')
    .required('Password is required')
  })
  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Genarator</Text>
          <Formik
       initialValues={{ passwordLength: '' }}
       validationSchema={passwordSchema}
       onSubmit={values => {
        // console.log(values)
        genaratePasswordString(+values.passwordLength)
       }}
     >
       {({
         values,
         errors,
         touched,
         isValid,
         handleChange,
        //  handleBlur,
         handleSubmit,
         isSubmitting,
         handleReset
         /* and other goodies */
       }) => (
      
        <>
        <View style={styles.inputWrapper}>
          <View style={styles.inputColumn}>
            <Text style={styles.heading}>Password Length</Text>
            { touched.passwordLength && errors.passwordLength && (
              <Text style={styles.errorText}>
                { errors.passwordLength }
              </Text>
            ) }
          </View>
          <TextInput 
            style={styles.inputStyle}
            value={values.passwordLength}
            onChangeText={handleChange('passwordLength')}
            placeholder='ex: 8'
            keyboardType='numeric'
            />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include Lowercase</Text>
          <BouncyCheckbox
          isChecked={lowerCase}
          onPress={() => setLowerCase(!lowerCase)}
          fillColor='#2ecc71'
           />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include UpperCase</Text>
            <BouncyCheckbox
            isChecked={upperCase}
            onPress={() => setUpperCase(!upperCase)}
            fillColor='#2ecc71'
            />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include Numbers</Text>
          <BouncyCheckbox
              isChecked={numbers}
              onPress={() => setNumbers(!numbers)}
              fillColor='#2ecc71'
              />
        </View>
        <View style={styles.inputWrapper}>
          <Text style={styles.heading}>Include symbols</Text>
          <BouncyCheckbox
              isChecked={symbols}
              onPress={() => setSymbols(!symbols)}
              fillColor='#2ecc71'
              />
        </View>
        <View style={styles.formActions}>
          <TouchableOpacity 
          disabled={!isValid}
          style={styles.primaryBtn}
          // onPress={handleSubmit as unknown as (e: GestureResponderEvent) => void}
          onPress={() => handleSubmit()}
          >
            <Text>Genarate Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryBtn}
          onPress={() => {
            resetPassword()
          }}
          >
            <Text>Reset</Text>
          </TouchableOpacity>
        </View>
        </>
    
        //  <form onSubmit={handleSubmit}>
        //    <input
        //      type="text"
        //      name="password"
        //      onChange={handleChange}
        //      onBlur={handleBlur}
        //      value={values.email}
        //    />
        //    {errors.email && touched.email && errors.email}
        //    <input
        //      type="password"
        //      name="password"
        //      onChange={handleChange}
        //      onBlur={handleBlur}
        //      value={values.password}
        //    />
        //    {errors.password && touched.password && errors.password}
        //    <button type="submit" disabled={isSubmitting}>
        //      Submit
        //    </button>
        //  </form>
       )}
     </Formik>
        </View>
        {isPasswordGenarated ? (
          <View style={[styles.card, styles.cardElevated]}>
            <Text style={styles.subTitle}>Result:</Text>
            <Text style={styles.description}>Long press to copy</Text>
            <Text selectable style={styles.generatedPassword}>{password}</Text>
          </View>
        ) : null }
      </SafeAreaView>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 15,
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#16213e',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
  },
  card: {
    padding: 12,
    borderRadius: 6,
    marginHorizontal: 12,
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color:'#000'
  },
});
