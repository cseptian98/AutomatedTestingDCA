import React, {useState, useEffect} from 'react'
import {
  SafeAreaView,
  Alert,
  ScrollView,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import styles from './TodoLists.styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import List from 'components/List'
import axiosConfig from 'api/BaseConfig'
import {useRoute} from '@react-navigation/native'

const TodoLists = ({navigation: {navigate}}) => {
  const route = useRoute()
  const [list, setList] = useState([])
  const [title, setTitle] = useState('')
  const [refetch, setRefetch] = useState(false)
  const [button, setButton] = useState('add')
  const [selectedList, setSelectedList] = useState({})
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

  const submit = () => {
    if (button === 'add') {
      createNewList(title)
    } else if (button === 'update') {
      updateList(selectedList)
    }
  }

  const createNewList = title => {
    const onSuccess = ({data}) => {
      setTitle('')
      setRefetch(true)
      console.log('debug success', data)
    }

    const onFailure = error => {
      setRefetch(true)
      console.log('debug error', error)
    }

    axiosConfig.post('api/TodoLists', {title}).then(onSuccess).catch(onFailure)
  }

  const updateList = selectedList => {
    const onSuccess = ({data}) => {
      setTitle('')
      setRefetch(true)
      setButton('add')
      console.log('debug success', data)
    }

    const onFailure = error => {
      setRefetch(true)
      console.log('debug error', error)
    }

    axiosConfig
      .put(`api/TodoLists/${selectedList.id}`, {
        id: selectedList.id,
        title: title,
      })
      .then(onSuccess)
      .catch(onFailure)
  }

  const selectItem = item => {
    console.log(item)
    setSelectedList(item)
    setTitle(item.title)
    setButton('update')
  }

  const moveToItems = item => {
    navigate('TodoItems', {
      ListId: item.id,
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <View>
          <Image
            style={styles.image}
            source={require('assets/images/list.png')}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Add Todo List..."
            placeholderTextColor="#FFF"
            value={title}
            onChangeText={value => setTitle(value)}
            testID="txtInputList"
          />
          <TouchableOpacity
            style={styles.button}
            testID="actTodoList"
            onPress={submit}>
            <Icon name={button} size={30} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        {list.map(item => {
          return (
            <List
              key={item.id}
              title={item.title}
              testID="todoList"
              onPress={() => moveToItems(item)}
              onUpdate={() => selectItem(item)}
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
