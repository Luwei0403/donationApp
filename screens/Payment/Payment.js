import Header from '../../components/Header/Header';
import {useSelector} from 'react-redux';
import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Alert,
  ActivityIndicator,
  Image,
  Pressable,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/native';
import CardForm from '../CardForm/CardForm';
import {Routes} from '../../navigation/Routes';
import BackButton from '../../components/BackButton/BackButton';

const Payment = () => {
  const donationItemInformation = useSelector(
    state => state.donations.selectedDonationInformation,
  );
  const navigation = useNavigation();
  const [cardDetails, setCardDetails] = useState(null); 
  const [loading, setLoading] = useState(false); 
  const [isCardConfirmed, setIsCardConfirmed] = useState(false);

  const handleCardSubmit = details => {
    setCardDetails(details); // Save credit card form input data
    setIsCardConfirmed(true); 
  };

  const handleDonation = () => {
    if (isCardConfirmed && cardDetails) {
      setLoading(true);
      setTimeout(() => {
        Alert.alert(
          'Payment successful!',
          `You have successfully donated ${donationItemInformation.name},the amount is $${donationItemInformation.price}`,
          [
            {
              text: 'Return to homepage',
              onPress: () => navigation.navigate(Routes.Home), 
            },
          ],
        );
        setLoading(false);
        setCardDetails(null); 
        setIsCardConfirmed(false);
      }, 2000); 
    } else {
      Alert.alert(
        'Payment failed',
        'Please enter valid credit card information!',
      );
    }
  };

  if (!donationItemInformation) {
    return (
      <SafeAreaView style={styles.backgroundWhite}>
        <Header title={'Making Donation'} />
        <Text style={styles.donationAmountInfo}>
          No donation information selected.
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.backgroundWhite}>
      <View style={styles.back}>
        <BackButton onPress={() => navigation.goBack()} />
      </View>
      {loading && (
        <View style={styles.loadingOverlay}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <View contentContainerStyle={styles.paymentcontainer}>
        <View style={styles.donate}>
          <View style={styles.makeingdonate}>
            <Header title={'Making Donation'} type={1} />
          </View>
          <Text style={styles.donationAmountInfo}>
            You are about to donate ${donationItemInformation.price} for{' '}
            {donationItemInformation.name}.
          </Text>

          <View style={styles.comfirm}>
            <CardForm onSubmit={handleCardSubmit} />
          </View>
        </View>
        <View style={styles.button}>
          <Pressable
            onPress={isCardConfirmed ? handleDonation : null} 
            style={[
              styles.donateButton,
              !isCardConfirmed && styles.disabledButton, 
            ]}>
            <Text
              style={[
                styles.textconfirm,
                !isCardConfirmed && styles.distextconfirm,
              ]}>
              Donate
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundWhite: {backgroundColor: '#FFFFFF', flex: 1},
  paymentcontainer: {
    marginHorizontal: scale(16),
    paddingVertical: scale(10),
  },
  donationAmountInfo: {
    marginLeft: scale(15),
    fontSize: scale(15),
  },
  button: {
    marginHorizontal: scale(62),
    marginBottom: scale(70),
  },
  loadingOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  donate: {
    marginTop: scale(60),
    marginHorizontal: scale(13),
  },
  comfirm: {
    marginTop: scale(8),
  },
  makeingdonate: {
    marginLeft: scale(15),
    marginBottom: scale(12),
    marginTop: scale(10),
  },
  back: {
    position: 'absolute',
    marginTop: scale(15),
    marginLeft: scale(10),
  },
  donateButton: {
    width: '100%', 
    height: scale(55), 
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2979F2', 
    borderRadius: scale(35),
    alignSelf: 'center',
    marginTop: scale(5),
  },
  disabledButton: {
    backgroundColor: '#ccc',
    opacity: 0.6, 
  },
  textconfirm: {
    color: 'white',
    fontSize: scale(14),
  },
  distextconfirm: {
    color: 'black',
    fontSize: scale(14),
  },
});

export default Payment;
