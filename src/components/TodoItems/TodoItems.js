import React, {useState, useEffect} from 'react'
import {
  SafeAreaView,
  View,
  Image,
  Alert,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import styles from './TodoItems.styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Item from 'components/TodoItems/Item'
import axiosConfig from 'api/BaseConfig'
import {useRoute} from '@react-navigation/native'
import {
  TEST_ID_IMAGE_TODOITEM,
  TEST_ID_TEXT_INPUT_ITEM,
  TEST_ID_BUTTON_SUBMIT_ITEM,
  TEST_ID_TODOITEM,
} from 'constants'

const TodoItems = () => {
  const route = useRoute()
  const {ListId, url} = route.params
  const [item, setItem] = useState([])
  const [title, setTitle] = useState('')
  const [button, setButton] = useState('add')
  const [selectedItem, setSelectedItem] = useState({})
  const [refetch, setRefetch] = useState(false)

  useEffect(() => {
    async function getTodoItems() {
      const onSuccess = ({data}) => {
        setButton('add')
        setTitle('')
        setItem(data.items)
        console.log('debug success', data)
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
  }, [refetch, ListId])

  const submit = () => {
    if (button === 'add') {
      createNewItem({ListId, title})
    } else if (button === 'update') {
      updateItem(selectedItem)
    }
  }

  const deleteItems = data => {
    const onSuccess = () => {
      setRefetch(true)
      console.log('debug deleted')
    }

    const onFailure = error => {
      setRefetch(true)
      console.log('debug error delete', error)
    }

    axiosConfig
      .delete(`api/TodoItems/${data.id}`)
      .then(onSuccess)
      .catch(onFailure)
  }

  const createNewItem = ({ListId, title}) => {
    const onSuccess = ({data}) => {
      setTitle('')
      setRefetch(true)
      console.log('debug success', data)
    }

    const onFailure = error => {
      setRefetch(true)
      console.log('debug error', error)
    }

    axiosConfig
      .post('api/TodoItems', {listId: ListId, title})
      .then(onSuccess)
      .catch(onFailure)
  }

  const updateItem = selectedItem => {
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
      .put(`api/TodoItems/${selectedItem.id}`, {
        id: selectedItem.id,
        title: title,
        done: true,
      })
      .then(onSuccess)
      .catch(onFailure)
  }

  const selectItem = item => {
    setSelectedItem(item)
    setTitle(item.title)
    setButton('update')
    console.log(item)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemContainer}>
        <View>
          <Image
            style={styles.image}
            source={require('assets/images/item.png')}
            testID={TEST_ID_IMAGE_TODOITEM}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            style={styles.textInput}
            placeholder="Add Todo Item..."
            placeholderTextColor="#FFF"
            value={title}
            testID={TEST_ID_TEXT_INPUT_ITEM}
            onChangeText={value => setTitle(value)}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={submit}
            testID={TEST_ID_BUTTON_SUBMIT_ITEM}>
            <Icon name={button} size={30} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView>
        {item.map(data => {
          return (
            <Item
              key={data.id}
              title={data.title}
              testID={TEST_ID_TODOITEM}
              onUpdate={() => selectItem(data)}
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
                      onPress: () => deleteItems(data),
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

export default TodoItems
