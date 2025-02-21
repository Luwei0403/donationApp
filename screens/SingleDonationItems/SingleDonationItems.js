import React from 'react';
import {useSelector} from 'react-redux';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Image,
  View,
  Text,
} from 'react-native';
import Badge from '../../components/Badge/Badge';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import BackButton from '../../components/BackButton/BackButton';
import {getFontFamily} from '../../assets/fonts/fonts';
import {scale} from 'react-native-size-matters';

const SingleDonationItem = ({navigation, route}) => {
  const donationItemInformation = useSelector(
    state => state.donations.selectedDonationInformation,
  );

  const categoryInformation = route.params.categoryInformation;

  return (
    <SafeAreaView style={styles.backgroundWhite}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <BackButton onPress={() => navigation.goBack()} />
        <Image
          source={{uri: donationItemInformation.image}}
          style={styles.image}
        />
        <View style={styles.badge}>
          <Badge title={categoryInformation.name} />
        </View>
        <Header type={1} title={donationItemInformation.name} />
        <Text style={styles.description}>
          {donationItemInformation.description}
        </Text>
        <Text style={styles.price}>
          {donationItemInformation.price
            ? `$${parseFloat(donationItemInformation.price).toFixed(2)}`
            : 'Price not available'}
        </Text>
      </ScrollView>
      <View style={styles.button}>
        <Button
          title={'Donate'}
          onPress={() => navigation.navigate('Payment')}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundWhite: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  container: {
    marginHorizontal: scale(20),
    marginTop: scale(7),
  },
  image: {
    marginTop: scale(12),
    marginBottom: scale(24),
    width: '100%',
    height: scale(240),
    borderRadius: scale(5),
  },
  badge: {
    marginBottom: scale(16),
  },
  description: {
    marginTop: scale(7),
    marginHorizontal: scale(7),
    fontFamily: getFontFamily('Inter', '400'),
    fontSize: scale(14),
    marginBottom: scale(10),
  },
  button: {
    marginHorizontal: scale(35),
    marginBottom: scale(40),
  },
  price: {
    marginTop: scale(10),
    marginHorizontal: scale(7),
    fontFamily: getFontFamily('Inter', '700'),
    fontSize: scale(16),
    color: '#156CF7',
    marginBottom: scale(10),
  },
});

export default SingleDonationItem;
