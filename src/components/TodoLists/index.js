import React, {useState, useCallback} from 'react'
import {SafeAreaView, Alert} from 'react-native'
import styles from './TodoLists.styles'
import InputList from 'components/InputList'
import List from 'components/List'
import axiosConfig from 'api/BaseConfig'
import {useFocusEffect} from '@react-navigation/native'

const TodoLists = ({navigation}) => {
  const [list, setList] = useState([])

  useFocusEffect(
    useCallback(() => {
      getTodoLists()
    }, []),
  )

  const getTodoLists = () => {
    const onSuccess = ({data}) => {
      console.log('debug success', data)
      setList(data.lists)
    }

    const onFailure = error => {
      console.log('debug error', error)
    }

    axiosConfig.get('api/TodoLists').then(onSuccess).catch(onFailure)
  }

  const deleteList = item => {
    console.log(item.id)

    const onSuccess = () => {
      console.log('debug deleted')
      getTodoLists()
    }

    const onFailure = error => {
      console.log('debug error delete', error)
    }

    axiosConfig
      .delete(`api/TodoLists/${item.id}`)
      .then(onSuccess)
      .catch(onFailure)
  }

  const moveToItems = item => {
    navigation.navigate('TodoItems', {
      ListId: item.id,
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <InputList />
      {list.map(item => {
        return (
          <List
            key={item.id}
            title={item.title}
            onPress={() => moveToItems(item)}
            onDelete={() =>
              Alert.alert('Delete Item', 'Are you sure to delete this item?', [
                {
                  text: 'No',
                  onPress: () => console.log('Cancel'),
                },
                {
                  text: 'Yes',
                  onPress: () => deleteList(item),
                },
              ])
            }
          />
        )
      })}
    </SafeAreaView>
  )
}

export default TodoLists
