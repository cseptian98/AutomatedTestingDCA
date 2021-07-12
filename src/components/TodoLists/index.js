import React, {useState, useEffect} from 'react'
import {SafeAreaView, Alert, View} from 'react-native'
import styles from './TodoLists.styles'
import InputList from 'components/InputList'
import List from 'components/List'
import axiosConfig from 'api/BaseConfig'
import {useRoute} from '@react-navigation/native'

const TodoLists = ({navigation: {navigate}}) => {
  const route = useRoute()
  const [list, setList] = useState([])
  const {url} = route.params

  useEffect(() => {
    async function getTodoLists() {
      const onSuccess = ({data}) => {
        console.log('debug success', data)
        setList(data.lists)
      }

      const onFailure = error => {
        console.log('debug error', error)
      }

      const value = await axiosConfig.get(url).then(onSuccess).catch(onFailure)
      return value
    }
    getTodoLists()
  }, [list])

  const deleteList = item => {
    const onSuccess = () => {
      console.log('debug deleted')
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
    navigate('TodoItems', {
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
