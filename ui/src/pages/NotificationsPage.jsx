import NotificationRow from '../components/NotificationRow'
import { Menu } from '../components/Menu'
import AddMessageForm from '../components/AddMessageForm'

export const NotificationsPage = () => {
  return (
    <>
      <Menu />
      <table className='table-auto stripped'>
        <thead>
          <tr>
            <th className='px-4'>User</th>
            <th className='px-4'>Message</th>
            <th className='px-4'>Category</th>
            <th className='px-4'>Type</th>
            <th className='px-4'>Date</th>
          </tr>
        </thead>
        <tbody>
          <NotificationRow />
        </tbody>
      </table>
      <AddMessageForm />
    </>
  )
}
