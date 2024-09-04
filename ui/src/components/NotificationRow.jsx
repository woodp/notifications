import { useEffect } from "react"
import { useNotificationsStore } from "../hooks/notifications/useNotificationsStore"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { setNotifications } from "../store/slices/notificationsSlice"
import { format } from "date-fns";

const NotificationRow = () => {
  const { getNotifications } = useNotificationsStore()
  const { notifications } = useSelector(state => state.notifications)
  const dispatch = useDispatch()

  const showFirstChars = (message) => {
    if(message.length > 90)
      return message.slice(0, 90) + '...'
    return message;
  }

  useEffect(() => {
    getNotifications()
    .then((notifs) => {
      dispatch(setNotifications(notifs))
    })
    .catch((error) => toast.error(error))
  }, [])

  return (
    <>
      {notifications.map((notif) => (
        <tr key={notif.id} className='even:bg-neutral-100'>
          <td className='px-4'>{notif.userName}</td>
          <td className='px-4'>{showFirstChars(notif.message)}</td>
          <td className='px-4'>{notif.category.name}</td>
          <td className='px-4'>{notif.type}</td>
          <td className='px-4'>{format(notif.createdAt,'yyyy/MM/dd kk:mm:ss')}</td>
        </tr>
        ))}
    </>
  );
};

export default NotificationRow;
