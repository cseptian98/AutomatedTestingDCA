import React, {useState, useEffect} from 'react'
import {SafeAreaView, Alert, ScrollView} from 'react-native'
import styles from './TodoLists.styles'
import InputList from 'components/InputList'
import List from 'components/List'
import axiosConfig from 'api/BaseConfig'
import {useRoute} from '@react-navigation/native'

const TodoLists = ({navigation: {navigate}}) => {
  const route = useRoute()
  const [list, setList] = useState([])
  const [refetch, setRefetch] = useState(false)
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
    setRefetch(false)
  }, [refetch])

  const deleteList = item => {
    const onSuccess = () => {
      setRefetch(true)
      console.log('debug deleted')
    }

    const onFailure = error => {
      setRefetch(true)
      console.log('debug error delete', error)
    }

    axiosConfig
      .delete(`api/TodoLists/${item.id}`)
      .then(onSuccess)
      .catch(onFailure)
  }

  const createNewList = title => {
    const onSuccess = ({data}) => {
      setRefetch(true)
      console.log('debug success', data)
    }

    const onFailure = error => {
      setRefetch(true)
      console.log('debug error', error)
    }

    axiosConfig.post('api/TodoLists', {title}).then(onSuccess).catch(onFailure)
  }

  const moveToItems = item => {
    navigate('TodoItems', {
      ListId: item.id,
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <InputList createList={createNewList} />
      <ScrollView>
        {list.map(item => {
          return (
            <List
              key={item.id}
              title={item.title}
              onPress={() => moveToItems(item)}
              onDelete={() =>
                Alert.alert(
                  'Delete Item',
                  'Are you sure to delete this item?',
                  [
                    {
                      text: 'No',
                      onPress: () => console.log('Cancel'),
                    },
                    {
                      text: 'Yes',
                      onPress: () => deleteList(item),
                    },
                  ],
                )
              }
            />
          )
        })}
      </ScrollView>
    </SafeAreaView>
  )
}

export default TodoLists
