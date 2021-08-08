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
import {
  TEST_ID_IMAGE_TODOLIST,
  TEST_ID_TEXT_INPUT_LIST,
  TEST_ID_BUTTON_SUBMIT_LIST,
  TEST_ID_TODOLIST,
} from 'constants'
import {testProps} from 'utils/testProps.helper'

const TodoLists = ({route, navigation}) => {
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
      }

      const value = await axiosConfig.get(url).then(onSuccess)
      return value
    }
    getTodoLists()
    setRefetch(false)
  }, [refetch])

  const deleteList = item => {
    const onSuccess = () => {
      setRefetch(true)
    }

    const onFailure = () => {
      setRefetch(true)
    }

    axiosConfig.delete(`${url}/${item.id}`).then(onSuccess).catch(onFailure)
  }

  const submit = () => {
    if (button === 'add') {
      createNewList(title)
    } else if (button === 'edit') {
      updateList(selectedList)
    }
  }

  const createNewList = title => {
    const onSuccess = () => {
      setTitle('')
      setRefetch(true)
    }

    const onFailure = () => {
      setRefetch(true)
    }

    axiosConfig.post(url, {title}).then(onSuccess).catch(onFailure)
  }

  const updateList = selectedList => {
    const onSuccess = () => {
      setTitle('')
      setRefetch(true)
      setButton('add')
    }

    const onFailure = () => {
      setRefetch(true)
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
    setButton('edit')
  }

  const moveToItems = item => {
    navigation.navigate('TodoItems', {
      ListId: item.id,
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <View>
          <Image
            source={require('assets/images/list.png')}
            style={styles.image}
            {...testProps(TEST_ID_IMAGE_TODOLIST)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            onChangeText={value => setTitle(value)}
            placeholder="Add Todo List..."
            placeholderTextColor="#FFF"
            style={styles.textInput}
            value={title}
            {...testProps(TEST_ID_TEXT_INPUT_LIST)}
          />
          <TouchableOpacity
            onPress={submit}
            style={styles.button}
            {...testProps(TEST_ID_BUTTON_SUBMIT_LIST)}>
            <Icon name={button} size={30} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView accessible={false}>
        {list.map(item => {
          return (
            <List
              key={item.id}
              title={item.title}
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
              {...testProps(TEST_ID_TODOLIST)}
            />
          )
        })}
      </ScrollView>
    </SafeAreaView>
  )
}

export default TodoLists
