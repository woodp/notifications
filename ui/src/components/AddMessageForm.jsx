import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"
import { TEDropdown, TEInput, TEModal, TEModalBody, TEModalContent, TEModalDialog, TEModalFooter, TEModalHeader, TERipple } from "tw-elements-react"
import { useNotificationsStore } from "../hooks/notifications/useNotificationsStore";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup"
import { toast } from "react-toastify";

const schema = yup
  .object({
    categoryId: yup.string().required(),
    text: yup.string().required('Message is required'),
  })
  .required()

const AddMessageForm = () => {
  const [categories, setCategories] = useState([]);
  // const [categoryId, setCategoryId] = useState(0);
  const [submitButtonText, setSubmitButtonText] = useState("Save Message")
  const [showModal, setShowModal] = useState(false)
  const [submitDisabled, setSubmitDisabled] = useState(false)
  const { createMessage, getCategories } = useNotificationsStore()
  const { register, handleSubmit, reset, formState: { errors } } = useForm({ resolver: yupResolver(schema) })
  

  useEffect(() => {
    getCategories()
    .then((categs) => {
      setCategories(categs)
    })
    .catch((error) => toast.error(error))
  }, [])

  // const handleSelect = (e) => {
  //   setCategoryId(e.target.value);
  // }

  const onMessageSubmit = async (data) => {
    setSubmitDisabled(true)
    setSubmitButtonText("Processing...")
    try {
      await createMessage(data.categoryId, data.text)
      reset()
      setShowModal(false)
      setSubmitDisabled(false)
      setSubmitButtonText("Save Message")
    } catch(e){
      toast.error(e.message)
      setSubmitDisabled(false)
      setSubmitButtonText("Save Message")
    }
  }

  return (
    <div className='p-8'>
      {/* <!-- Button trigger modal --> */}
      <TERipple rippleColor="white">
        <button
          type="button"
          className="inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
          onClick={() => setShowModal(true)}
        >
          Add Message
        </button>
      </TERipple>

      {/* <!-- Modal --> */}
      <TEModal show={showModal} setShow={setShowModal}>
        <TEModalDialog>
          <TEModalContent>
            <form onSubmit={handleSubmit(onMessageSubmit)}>
              <TEModalHeader>
                {/* <!--Modal title--> */}
                <h5 className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200">
                  Create a new message
                </h5>
                {/* <!--Close button--> */}
                <button
                  type="button"
                  className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </TEModalHeader>
              {/* <!--Modal body--> */}
              <TEModalBody>

                <div className="mb-3 w-96">
                  <label
                  htmlFor="categoryId"
                  className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                  >Category:</label>
                  <select 
                    className="bg-gray-100"
                    id="categoryId"
                    {...register("categoryId")}
                  >
                    { categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>) }
                  </select>
                  <div>{errors.categoryId?.message}</div>
                </div>
                <div className="mb-3 w-96">
                    <label
                      htmlFor="text"
                      className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                    >
                    Message:
                    </label>
                    <textarea
                      id="text"
                      className="bg-gray-100 relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                      {...register("text")}
                    ></textarea>
                    <div>{errors.text?.message}</div>
                </div>

              </TEModalBody>
              <TEModalFooter>
                <TERipple rippleColor="light">
                  <button
                    type="button"
                    className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                </TERipple>
                <TERipple rippleColor="light">
                  <button
                    disabled={submitDisabled}
                    type="submit"
                    className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  >
                    {submitButtonText}
                  </button>
                </TERipple>
              </TEModalFooter>
            </form>
          </TEModalContent>
        </TEModalDialog>
      </TEModal>

    </div>
  )
}

export default AddMessageForm