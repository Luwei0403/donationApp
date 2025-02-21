import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  Pressable,
} from 'react-native';
import moment from 'moment';
import {scale} from 'react-native-size-matters';

const CardForm = (props) => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardHolder, setCardHolder] = useState('');


  const handleCardNumberChange = text => {
    const numericText = text.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    const formattedText = numericText
      .replace(/\s?/g, '') // Remove all spaces
      .replace(/(\d{4})/g, '$1 ') // Add a space every 4 digits
      .trim(); // Remove extra spaces at the end
    setCardNumber(formattedText);
  };


  const handleExpiryDateChange = text => {
    if (text.length === 2 && expiryDate.length === 1) {
      
      setExpiryDate(text + '/');
    } else if (text.length === 2 && text.includes('/')) {
      // When deleting "/", avoid inserting it again
      setExpiryDate(text.replace('/', ''));
    } else {
      //normal update
      setExpiryDate(text);
    }
  };

  // Verify validity date
  const validateForm = () => {
    const cleanedCardNumber = cardNumber.replace(/\s/g, ''); // delete space
    const [month, year] = expiryDate.split('/').map(num => parseInt(num, 10));

    if (cleanedCardNumber.length !== 16) {
      Alert.alert('Invalid Card Number', 'Card number must be 16 digits.');
      return false;
    }

    if (!month || month < 1 || month > 12) {
      Alert.alert('Invalid Expiry Date', 'Month must be between 01 and 12.');
      return false;
    }

    const currentYear = parseInt(moment().format('YY'), 10); // Get the last two digits of the current year
    if (!year || year < currentYear) {
      Alert.alert('Invalid Expiry Date', 'Year must be current year or later.');
      return false;
    }

    const isFutureExpiry = moment(expiryDate, 'MM/YY', true).isAfter(moment());
    if (!isFutureExpiry) {
      Alert.alert('Invalid Expiry Date', 'Expiry date must be in the future.');
      return false;
    }

    if (cvv.length !== 3) {
      Alert.alert('Invalid CVV', 'CVV must be 3 digits.');
      return false;
    }

    if (cardHolder.trim().length === 0) {
      Alert.alert(
        'Invalid Cardholder Name',
        'Cardholder name cannot be empty.',
      );
      return false;
    }

    return true;
  };

 
  // Submit Verification
  const handleSubmit = function() {
    if (validateForm()) {
      Alert.alert(
        'Verification successful!',
        'Credit card information verified successfully!',
      );

      
      props.onSubmit({  //details
        cardNumber: cardNumber.replace(/\s/g, ''), 
        expiryDate: expiryDate,
        cvv: cvv,
        cardHolder: cardHolder,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Credit card number:</Text>
      <TextInput
        style={styles.input}
        placeholder="For example: XXXX XXXX XXXX XXXX"
        value={cardNumber}
        maxLength={19} // 16 digits + 3 spaces
        onChangeText={handleCardNumberChange}
        keyboardType="numeric" // Numeric Keypad
      />

      <Text style={styles.label}>Validity period (MM/YY):</Text>
      <TextInput
        style={styles.input}
        placeholder="MM/YY"
        keyboardType="numeric"
        value={expiryDate}
        maxLength={5}
        onChangeText={handleExpiryDateChange}
      />

      <Text style={styles.label}>Security code (CVV):</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={cvv}
        maxLength={3}
        onChangeText={setCvv}
        placeholder="XXX"
      />

      <Text style={styles.label}>Cardholder name:</Text>
      <TextInput
        style={styles.input}
        value={cardHolder}
        onChangeText={setCardHolder}
        placeholder="Full name"
      />

      <View style={styles.submitcontainer}>
        <Pressable onPress={handleSubmit} style={styles.buttonCommon}>
          <Text style={styles.textconfirm}>
            Confirm credit card information
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {padding: 20},
  label: {fontSize: 16, marginTop: 10},
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
  },
  textconfirm: {
    color: '#FFFFFF',
    fontSize: scale(14),
  },
  submit: {
    marginTop: scale(15),
    backgroundColor: '#3c3c3c',
    padding: scale(10),
    borderRadius: 20,
    paddingHorizontal: scale(5),
    width: '85%',
    alignItems: 'center',
  },
  submitcontainer: {
    alignItems: 'center',
  },
  buttonCommon: {
    width: '80%', 
    height: scale(58), 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3c3c3c',
    borderRadius: scale(35),
    alignSelf: 'center', 
    marginTop: scale(25),
  },
});

export default CardForm;
