import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

export default function TimeSinceRefresh() {
  const { refreshTimestamp } = useSelector((state) => state.timeRange)
  const [timeDiff, setTimeDiff] = useState('')
  const [intervalTime, setIntervalTime] = useState(1000)

  const calculateTimeDifference = useCallback(() => {
    const now = Date.now()
    const diffInSeconds = Math.floor((now * 1000 - refreshTimestamp) / 1000000) // 微秒转秒，refreshTime 是微秒

    const days = Math.floor(diffInSeconds / (3600 * 24))
    const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600)
    const minutes = Math.floor((diffInSeconds % 3600) / 60)
    const seconds = diffInSeconds % 60

    let timeString = ' '
    if (days > 0) {
      timeString += `${days} 天 `
    } else if (hours > 0) {
      timeString += `${hours} 小时 `
    } else if (minutes > 0) {
      timeString += `${minutes} 分钟 `
    } else {
      timeString += `${seconds} 秒`
    }

    // 动态调整时间更新的频率
    if (days > 0) {
      setIntervalTime(86400000) // 当超过1小时，更新频率调整为1天
    } else if (hours > 0) {
      setIntervalTime(3600000) // 当超过1小时，更新频率调整为1小时
    } else if (minutes > 0) {
      setIntervalTime(60000) // 当超过1分钟，更新频率为1分钟
    } else {
      setIntervalTime(1000) // 默认每秒更新一次
    }

    setTimeDiff(timeString)
  }, [refreshTimestamp])

  useEffect(() => {
    calculateTimeDifference() // 初始计算
    const intervalId = setInterval(calculateTimeDifference, intervalTime)

    return () => clearInterval(intervalId)
  }, [calculateTimeDifference, intervalTime])

  return <div className="text-xs">刷新于 {timeDiff}前</div>
}
