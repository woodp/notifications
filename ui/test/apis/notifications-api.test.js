/* eslint-disable no-undef */
import notificationsAPI from "../../src/apis/notifications-api"

describe('API test', () => {
    test("should have the base URL set",()=>{
        expect(notificationsAPI.defaults.baseURL).toBe(process.env.VITE_API_URL)
    })
 })