import { useDispatch, useSelector } from "react-redux"
import notificationsAPI from "../../apis/notifications-api"
import { setNotifications } from "../../store/slices/notificationsSlice"
import { setCategories } from '../../store/slices/categoriesSlice'
import { resetErrors, setError } from '../../store/slices/errorsSlice'

export const useNotificationsStore = () => {
  const { notifications } = useSelector(state => state.notifications)
  const { categories } = useSelector(state => state.categories);

  const dispatch = useDispatch()

  const getNotifications = async () => {
    try {
      const { data } = await notificationsAPI.get('/notifications')
      dispatch(setNotifications(data))
      return data
    } catch (error) {
      const message = "Error trying to get notifications";
      console.log(message);
      setError(message);
      setTimeout(() => resetErrors(), 2000);
      return []
    }
  }

  const getCategories = async () => {
    try {
      const { data } = await notificationsAPI.get('/categories')
      dispatch(setCategories(data))
      return data
    } catch (error) {
      const message = "Error trying to get notifications";
      console.log(message);
      setError(message);
      setTimeout(() => resetErrors(), 2000);
      return []
    }
  }

  const createMessage = async (categoryId, text) => {
    try {
      await notificationsAPI.post('/messages', { categoryId, text })
      getNotifications()
    } catch (error) {
      const message = "Error when adding a message";
      console.log(message);
      setError(message);
      setTimeout(() => resetErrors(), 2000);
    }
  }
  return {
    notifications,
    categories,
    getCategories,
    getNotifications,
    createMessage,
  }

}
