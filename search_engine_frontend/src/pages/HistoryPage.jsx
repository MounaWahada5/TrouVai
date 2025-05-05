import React, { useEffect, useState } from 'react'
import HistoryList from '../components/HistoryList'
import { getHistory } from '../utils/api'

export default function HistoryPage() {
  const [history, setHistory] = useState([])

  useEffect(() => {
    getHistory().then(setHistory)
  }, [])

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Historique des recherches</h2>
      <HistoryList history={history} />
    </div>
  )
}
