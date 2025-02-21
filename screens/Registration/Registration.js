import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  Text,
  ImageBackground,
} from 'react-native';
import Input from '../../components/Input/Input';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import BackButton from '../../components/BackButton/BackButton';
import {scale} from 'react-native-size-matters';
import {createUser} from '../../api/user';

const Registration = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require('../../assets/images/login.png')}
      resizeMode="cover">
      <SafeAreaView style={styles.backgroundWhite}>
        <View style={styles.backButton}>
          <BackButton onPress={() => navigation.goBack()} />
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <View style={styles.marginBottom24}>
            <Header type={1} title={'Member Registration'} />
          </View>
          <View style={styles.marginBottom24}>
            <Input
              label={'First & Last Name'}
              placeholder={'Enter your full name...'}
              onChangeText={value => setFullName(value)}
            />
          </View>
          <View style={styles.marginBottom24}>
            <Input
              keyboardType={'email-address'}
              label={'Email'}
              placeholder={'Enter your email...'}
              onChangeText={value => setEmail(value)}
            />
          </View>
          <View style={styles.marginBottom24}>
            <Input
              secureTextEntry={true}
              label={'Password'}
              placeholder={'******'}
              onChangeText={value => setPassword(value)}
            />
          </View>
          {error.length > 0 && <Text style={styles.error}>{error}</Text>}
          {success.length > 0 && <Text style={styles.success}>{success}</Text>}
          <View style={styles.marginBottom24}>
            <Button
              isDisabled={
                fullName.length <= 2 || email.length <= 5 || password.length < 8
              }
              title={'Registration'}
              onPress={async () => {
                let user = await createUser(fullName, email, password);
                if (user.error) {
                  setError(user.error);
                } else {
                  setError('');
                  setSuccess('You have successfully registered');
                  setTimeout(() => navigation.goBack(), 3000);
                }
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundWhite: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  container: {
    marginHorizontal: scale(24),
    flex: 1,
    justifyContent: 'center',
  },
  backButton: {
    marginLeft: scale(14),
    marginTop: scale(7),
  },
  marginBottom24: {
    marginBottom: scale(24),
  },
  error: {
    fontFamily: 'Inter',
    fontSize: scale(16),
    color: '#FF0000',
    marginBottom: scale(24),
  },
  success: {
    fontFamily: 'Inter',
    fontSize: scale(16),
    color: '#28a745',
    marginBottom: scale(24),
  },
  backgroundImage: {
    backgroundColor: 'rgba(255, 255, 255,0.05', 
    flex: 1,
  },
});
export default Registration;
