import React, {useRef, useState} from 'react';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  StyleSheet,
  TextInput,
  Pressable,
  FlatList,
  Text,
  View,
} from 'react-native';
import {scale} from 'react-native-size-matters';
import PropTypes from 'prop-types';

const Search = ({items, onSearchSelect, placeholder}) => {
  const [search, setSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const textInputRef = useRef(null);

  const handleFocus = () => {
    textInputRef.current.focus();
  };

  const handleSearch = value => {
    setSearch(value);

    if (value.trim() === '') {
      setFilteredItems([]);
    } else {
      const matchedItems = items.filter(item =>
        item.name.toLowerCase().includes(value.toLowerCase()),
      );
      setFilteredItems(matchedItems);
    }
  };

  const handleSelect = item => {
    setSearch(''); // 清空搜索框
    setFilteredItems([]); // 清空結果
    onSearchSelect(item); // 回傳選中的 item
  };

  return (
    <View>
      <Pressable style={styles.searchInputContainer} onPress={handleFocus}>
        <FontAwesomeIcon icon={faSearch} color={'#25C0FF'} size={scale(22)} />
        <TextInput
          placeholder={placeholder}
          ref={textInputRef}
          style={styles.searchInput}
          value={search}
          onChangeText={handleSearch}
        />
      </Pressable>

      {filteredItems.length > 0 && (
        <FlatList
          data={filteredItems}
          keyExtractor={item => item.donationItemId.toString()}
          style={styles.resultList}
          renderItem={({item}) => (
            <Pressable
              style={styles.resultItem}
              onPress={() => handleSelect(item)}>
              <Text style={styles.resultText}>{item.name}</Text>
            </Pressable>
          )}
        />
      )}
    </View>
  );
};

Search.propTypes = {
  items: PropTypes.array.isRequired,
  onSearchSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};

Search.defaultProps = {
  placeholder: 'search',
};

const styles = StyleSheet.create({
  searchInput: {
    flex: 1,
    marginLeft: scale(6),
    height: '100%',
    fontFamily: 'Inter',
    fontSize: scale(14),
    lineHeight: scale(14),
    color: '#686C7A',
  },
  searchInputContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: scale(16),
    backgroundColor: '#F3F5F9',
    height: scale(50),
    borderRadius: scale(15),
  },
  resultList: {
    backgroundColor: '#FFF',
    borderRadius: scale(10),
    marginTop: scale(5),
    padding: scale(5),
  },
  resultItem: {
    paddingVertical: scale(10),
    paddingHorizontal: scale(15),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#DDD',
  },
  resultText: {
    fontSize: scale(14),
    color: '#333',
  },
});

export default Search;
