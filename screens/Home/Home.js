import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  FlatList,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import {useSelector, useDispatch} from 'react-redux';
import Header from '../../components/Header/Header';
import Tab from '../../components/Tab/Tab';
import {updateSelectedCategoryId} from '../../redux/reducers/Categories';
import SingleDonationItem from '../../components/SingleDonationItem/SingleDonationItem';
import {updateSelectedDonationId} from '../../redux/reducers/Donations';
import {Routes} from '../../navigation/Routes';
import {resetToInitialState} from '../../redux/reducers/User';
import {logOut} from '../../api/user';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowRightFromBracket} from '@fortawesome/free-solid-svg-icons';
import Search from '../../components/Search/Search';

const Home = ({navigation}) => {
 
  const user = useSelector(state => state.user);
  const donations = useSelector(state => state.donations);
  const categories = useSelector(state => state.categories); 
  const dispatch = useDispatch();


  const [donationItems, setDonationItems] = useState([]); 
  const [categoryPage, setCategoryPage] = useState(1); 
  const [categoryList, setCategoryList] = useState([]); 
  const [isLoadingCategories, setIsLoadingCategories] = useState(false); 
  const categoryPageSize = 4; 

 
  useEffect(() => {
    const items = donations.items.filter(value =>
      value.categoryIds.includes(categories.selectedCategoryId),
    );
    setDonationItems(items);
  }, [categories.selectedCategoryId]); 

  
  useEffect(() => {
    setIsLoadingCategories(true); 
    setCategoryList(
      pagination(categories.categories, categoryPage, categoryPageSize), 
    );
    setCategoryPage(prev => prev + 1);
    setIsLoadingCategories(false); 
  }, []);


  const handleSearchSelect = item => {
    dispatch(updateSelectedDonationId(item.donationItemId)); 
    navigation.navigate(Routes.SingleDonationItem, {
      categoryInformation: categories.categories.find(
        cat => cat.categoryId === categories.selectedCategoryId,
      ),
    }); 
  };


  const pagination = (items, pageNumber, pageSize) => {
    const startIndex = (pageNumber - 1) * pageSize; 
    const endIndex = startIndex + pageSize;
    if (startIndex >= items.length) {
      return [];
    }
    return items.slice(startIndex, endIndex);
  };

  return (
    <SafeAreaView style={styles.backgroundWhite}>
      <ScrollView showsVerticalScrollIndicator={false}>
      
        <View style={styles.header}>
          <View>
            <Text style={styles.headerIntroText}>Welcome</Text>
            <View style={styles.username}>
              <Header title={user.displayName + '.👋'} /> 
            </View>
          </View>
          <View style={styles.pressablecontainer}>
         
            <Pressable
              onPress={async () => {
                dispatch(resetToInitialState()); 
                await logOut(); 
              }}>
              <FontAwesomeIcon
                icon={faArrowRightFromBracket}
                size={20}
                color={'#156CF7'}
              />
            </Pressable>
            <Pressable
              onPress={async () => {
                dispatch(resetToInitialState());
                await logOut();
              }}>
              <Header type={4} title={'Logout'} color={'#156CF7'} />
            </Pressable>
          </View>
        </View>

      
        <Pressable style={styles.highlightedImageConatiner}>
          <View style={styles.search}>
          
            <Search
              items={donations.items} 
              onSearchSelect={handleSearchSelect}
              placeholder="Search for donation items" 
            />
          </View>
          <Image
            style={styles.highlightedImage}
            source={require('../../assets/images/charity.png')}
            resizeMode={'contain'}
          />
        </Pressable>

      
        <View style={styles.categoryHeader}>
          <Header title={'Select Category'} type={2} />
        </View>

        <View style={styles.categories}>
          <FlatList
            onEndReachedThreshold={0.5} 
            onEndReached={() => {
              if (isLoadingCategories) {
                return; 
              }
              setIsLoadingCategories(true);
              let newData = pagination(
                categories.categories,
                categoryPage,
                categoryPageSize,
              ); 
              if (newData.length > 0) {
                setCategoryList(prevState => [...prevState, ...newData]); 
                setCategoryPage(prevState => prevState + 1); 
              }
              setIsLoadingCategories(false); 
            }}
            horizontal={true} 
            showsHorizontalScrollIndicator={false}
            data={categoryList} 
            renderItem={({item}) => (
              <View style={styles.categoryItem} key={item.categoryId}>
                <Tab
                  tabId={item.categoryId} 
                  onPress={value => dispatch(updateSelectedCategoryId(value))} 
                  title={item.name} 
                  isInactive={item.categoryId !== categories.selectedCategoryId}
                />
              </View>
            )}
          />
        </View>


        {donationItems.length > 0 && (
          <View style={styles.donationItemsContainer}>
            {donationItems.map(value => {
              const categoryInformation = categories.categories.find(
                val => val.categoryId === categories.selectedCategoryId,
              ); 
              return (
                <View key={value.donationItemId} style={styles.donationitem}>
                  <SingleDonationItem
                    onPress={selectedDonationId => {
                      dispatch(updateSelectedDonationId(selectedDonationId)); 
                      navigation.navigate(Routes.SingleDonationItem, {
                        categoryInformation,
                      }); 
                    }}
                    donationItemId={value.donationItemId} 
                    uri={value.image} 
                    donationTitle={value.name} 
                    badgeTitle={categoryInformation.name}
                    price={parseFloat(value.price)}
                  />
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundWhite: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  header: {
    marginTop: scale(40),
    marginHorizontal: scale(24),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerIntroText: {
    fontFamily: 'Inter',
    fontSize: scale(20),
    lineHeight: scale(19),
    fontWeight: '500',
    color: '#636776',
  },
  username: {
    marginTop: scale(5),
    marginBottom: scale(5),
  },
  highlightedImage: {
    width: '100%',
    height: scale(200),
  },
  highlightedImageConatiner: {
    marginHorizontal: scale(24),
  },
  categories: {
    marginLeft: scale(24),
  },
  categoryItem: {
    marginRight: scale(10),
  },
  categoryHeader: {
    marginHorizontal: scale(24),
    marginBottom: scale(12),
  },
  donationItemsContainer: {
    marginTop: scale(20),
    marginHorizontal: scale(24),
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  donationitem: {
    maxWidth: '49%',
  },
  pressablecontainer: {
    alignItems: 'center',
  },
  search: {
    marginTop: scale(15),
  },
});

export default Home;
