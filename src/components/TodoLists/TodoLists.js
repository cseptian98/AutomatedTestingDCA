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
import List from 'components/TodoLists/List'
import axiosConfig from 'api/BaseConfig'
import { useNavigation, useRoute } from '@react-navigation/native'
import {
  TEST_ID_IMAGE_TODOLIST,
  TEST_ID_TEXT_INPUT_LIST,
  TEST_ID_BUTTON_SUBMIT_LIST,
  TEST_ID_TODOLIST,
} from 'constants'

const TodoLists = () => {
  const {navigate} = useNavigation()
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
        setButton('add')
        setTitle('')
        setList(data.lists)
        console.log('debug success', data)
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
      .delete(`${url}/${item.id}`)
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

    axiosConfig.post(url, {title}).then(onSuccess).catch(onFailure)
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
      .put(`${url}/${selectedList.id}`, {
        id: selectedList.id,
        title: title,
      })
      .then(onSuccess)
      .catch(onFailure)
  }

  const selectItem = item => {
    setSelectedList(item)
    setTitle(item.title)
    setButton('update')
    console.log(item)
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
            testID={TEST_ID_IMAGE_TODOLIST}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Add Todo List..."
            placeholderTextColor="#FFF"
            value={title}
            onChangeText={value => setTitle(value)}
            testID={TEST_ID_TEXT_INPUT_LIST}
          />
          <TouchableOpacity
            style={styles.button}
            testID={TEST_ID_BUTTON_SUBMIT_LIST}
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
              testID={TEST_ID_TODOLIST}
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
