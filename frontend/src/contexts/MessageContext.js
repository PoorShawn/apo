import { message } from 'antd'
import React, { createContext, useContext } from 'react'

const MessageContext = createContext({})

export const useMessageContext = () => useContext(MessageContext)

export const MessageProvider = ({ children }) => {
  const [messageApi, contextHolder] = message.useMessage()
  return (
    <>
      {contextHolder}
      <MessageContext.Provider value={messageApi}>{children}</MessageContext.Provider>
    </>
  )
}
