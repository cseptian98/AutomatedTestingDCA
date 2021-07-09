import React, {useState, useCallback, useEffect} from 'react'
import {SafeAreaView, FlatList, Alert} from 'react-native'
import styles from './TodoItems.styles'
import Item from 'components/Item'
import InputItem from 'components/InputItem'
import axiosConfig from 'api/BaseConfig'
import {useFocusEffect} from '@react-navigation/native'

const TodoItems = ({route}) => {
  const {ListId} = route.params
  const [item, setItem] = useState([])

  // useFocusEffect(
  //   useCallback(() => {
  //     getTodoItems()
  //   }, []),
  // )
  useEffect(() => {
    getTodoItems()
  }, [])

  const getTodoItems = () => {
    const onSuccess = ({data}) => {
      setItem(data.items)
    }

    const onFailure = error => {
      console.log('debug error', error)
    }

    axiosConfig
      .get('api/TodoItems', {params: {ListId}})
      .then(onSuccess)
      .catch(onFailure)
  }

  const deleteItems = item => {
    console.log(item.id)

    const onSuccess = () => {
      console.log('debug deleted')
      getTodoItems()
    }

    const onFailure = error => {
      console.log('debug error delete', error)
    }

    axiosConfig
      .delete(`api/TodoItems/${item.id}`)
      .then(onSuccess)
      .catch(onFailure)
  }

  const renderItem = ({item}) => (
    <Item
      title={item.title}
      onDelete={() =>
        Alert.alert('Delete Item', 'Are you sure to delete this item?', [
          {
            text: 'No',
            onPress: () => console.log('Cancel'),
          },
          {
            text: 'Yes',
            onPress: () => deleteItems(item),
          },
        ])
      }
    />
  )

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={item}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <InputItem listId={ListId} />
    </SafeAreaView>
  )
}

export default TodoItems
