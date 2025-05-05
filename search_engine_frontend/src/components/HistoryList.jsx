export default function HistoryList({ history }) {
    return (
      <ul className="space-y-2">
        {history.map((item, index) => (
          <li key={index} className="p-2 border rounded bg-white shadow">
            {item}
          </li>
        ))}
      </ul>
    )
  }
  