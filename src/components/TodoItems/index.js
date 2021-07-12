import React, {useState, useEffect} from 'react'
import {SafeAreaView, FlatList, Alert} from 'react-native'
import styles from './TodoItems.styles'
import Item from 'components/Item'
import InputItem from 'components/InputItem'
import axiosConfig from 'api/BaseConfig'
import {useRoute} from '@react-navigation/native'

const TodoItems = () => {
  const route = useRoute()
  const {ListId, url} = route.params
  const [item, setItem] = useState([])

  useEffect(() => {
    async function getTodoItems() {
      const onSuccess = ({data}) => {
        console.log('debug success', data)
        setItem(data.items)
      }

      const onFailure = error => {
        console.log('debug error', error)
      }

      const value = await axiosConfig
        .get(url, {params: {ListId}})
        .then(onSuccess)
        .catch(onFailure)
      return value
    }
    getTodoItems()
  }, [item])

  const deleteItems = item => {
    const onSuccess = () => {
      console.log('debug deleted')
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
