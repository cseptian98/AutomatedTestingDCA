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
  const [refetch, setRefetch] = useState(false)

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
    setRefetch(false)
  }, [item])

  const deleteItems = item => {
    const onSuccess = () => {
      setRefetch(true)
      console.log('debug deleted')
    }

    const onFailure = error => {
      setRefetch(true)
      console.log('debug error delete', error)
    }

    axiosConfig
      .delete(`api/TodoItems/${item.id}`)
      .then(onSuccess)
      .catch(onFailure)
  }

  const createNewItem = ({listId, title}) => {
    const onSuccess = ({data}) => {
      setRefetch(true)
      console.log('debug success', data)
    }

    const onFailure = error => {
      setRefetch(true)
      console.log('debug error', error)
    }

    axiosConfig
      .post('api/TodoItems', {listId, title})
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
      <InputItem createItem={createNewItem} listId={ListId} />
      <FlatList
        data={item}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  )
}

export default TodoItems
