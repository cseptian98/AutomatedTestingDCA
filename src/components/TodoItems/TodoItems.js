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
import {StackActions} from '@react-navigation/native'
import {
  TEST_ID_IMAGE_TODOITEM,
  TEST_ID_TEXT_INPUT_ITEM,
  TEST_ID_BUTTON_SUBMIT_ITEM,
  TEST_ID_TODOITEM,
} from 'constants'
import { testProps } from 'utils/testProps.helper'

const TodoItems = ({route, navigation}) => {
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
      }

      const onFailure = () => {
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
    } else if (button === 'edit') {
      updateItem(selectedItem)
    }
  }

  const deleteItems = data => {
    const onSuccess = () => {
      setRefetch(true)
    }

    const onFailure = () => {
      setRefetch(true)
    }

    axiosConfig.delete(`${url}/${data.id}`).then(onSuccess).catch(onFailure)
  }

  const createNewItem = ({ListId, title}) => {
    const onSuccess = () => {
      setTitle('')
      setRefetch(true)
    }

    const onFailure = () => {
      setRefetch(true)
    }

    axiosConfig
      .post(`${url}`, {listId: ListId, title})
      .then(onSuccess)
      .catch(onFailure)
  }

  const updateItem = selectedItem => {
    const onSuccess = () => {
      setTitle('')
      setRefetch(true)
      setButton('add')
    }

    const onFailure = () => {
      setRefetch(true)
    }

    axiosConfig
      .put(`${url}/${selectedItem.id}`, {
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
    setButton('edit')
  }

  const formUpdate = items => {
    const movePage = StackActions.push('FormUpdateItem', {
      item: items,
      url: 'api/TodoItems/UpdateItemDetails',
    })
    navigation.dispatch(movePage)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemContainer}>
        <View>
          <Image
            source={require('assets/images/item.png')}
            style={styles.image}
            {...testProps(TEST_ID_IMAGE_TODOITEM)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            onChangeText={value => setTitle(value)}
            placeholder="Add Todo Item..."
            placeholderTextColor="#FFF"
            style={styles.textInput}
            value={title}
            {...testProps(TEST_ID_TEXT_INPUT_ITEM)}
          />
          <TouchableOpacity
            onPress={submit}
            style={styles.button}
            {...testProps(TEST_ID_BUTTON_SUBMIT_ITEM)}>
            <Icon name={button} size={30} color="#FFF" />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView accessible={false}>
        {item.map(data => {
          return (
            <Item
              key={data.id}
              title={data.title}
              onUpdateItem={() => formUpdate(data)}
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
              {...testProps(TEST_ID_TODOITEM)}
            />
          )
        })}
      </ScrollView>
    </SafeAreaView>
  )
}

export default TodoItems
