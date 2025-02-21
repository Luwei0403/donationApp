import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Pressable,
  View,
  Text,
  ImageBackground,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import Input from '../../components/Input/Input';
import Header from '../../components/Header/Header';
import Button from '../../components/Button/Button';
import {Routes} from '../../navigation/Routes';
import {loginUser} from '../../api/user';
import {useDispatch, useSelector} from 'react-redux';
import {logIn} from '../../redux/reducers/User';

const Login = ({navigation}) => {
  const user = useSelector(state => state.user); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (user.isLoggedIn) {
      navigation.navigate(Routes.Home);
    }
  }, [user.isLoggedIn]);

  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={require('../../assets/images/login.png')}
      resizeMode="cover">
      <SafeAreaView style={styles.backgroundWhite}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}>
          <View style={styles.marginBottom24}>
            <Header type={2} title={'Welcome to the charity app! 😃'} />
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
          <View style={styles.marginBottom24}>
            <Button
              onPress={async () => {
                let user = await loginUser(email, password);
                if (!user.status) {
                  setError(user.error);
                } else {
                  setError('');
                  dispatch(logIn(user.data));
                }
              }}
              title={'Login'}
              isDisabled={email.length < 5 || password.length < 8}
            />
          </View>
          <Pressable
            style={styles.registrationButton}
            onPress={() => navigation.navigate(Routes.Registration)}>
            <Header
              color={'#156CF7'}
              type={3}
              title={"Don't have an account?"}
            />
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
  },
  backgroundWhite: {
    backgroundColor: 'rgba(255, 255, 255,0.05', 
    flex: 1,
  },
  marginBottom24: {
    marginBottom: scale(24),
  },
  container: {
    marginHorizontal: scale(24),
    flex: 1,
    justifyContent: 'center',
  },
  registrationButton: {
    alignItems: 'center',
  },
  error: {
    fontFamily: 'Inter',
    fontSize: scale(16),
    color: '#FF0000',
    marginBottom: scale(24),
  },
});

export default Login;
