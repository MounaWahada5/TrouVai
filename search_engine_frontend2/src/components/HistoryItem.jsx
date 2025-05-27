import { useContext, useState } from "react";
import { MoreVertical } from "lucide-react";
import { SidebarContext } from "./Sidebar";


const HistoryItem = ({ item }) => {
  const { expanded } = useContext(SidebarContext);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(item.query);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleUpdate = () => {
    setIsEditing(true);
    setMenuOpen(false);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Add logic to save edited text to backend
  };

  const handleDelete = () => {
    // Add logic to delete item from backend
    setMenuOpen(false);
  };

  return (
    <li className="relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer hover:bg-indigo-50 text-gray-600 group">
      {isEditing ? (
        <input
          value={editedText}
          onChange={(e) => setEditedText(e.target.value)}
          className="w-full p-1"
        />
      ) : (
        <span className={`overflow-hidden transition-all ${expanded ? "w-52 ml-3" : "w-0"}`}>
          {item.query}
        </span>
      )}
      {expanded && (
        <div className="ml-2 relative">
          <MoreVertical
            size={20}
            className="cursor-pointer text-gray-500 group-hover:text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          />
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-10">
              <button
                onClick={handleUpdate}
                className="w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100"
              >
                Update
              </button>
              <button
                onClick={handleDelete}
                className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      )}
      {!expanded && (
        <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>
          {item.query}
        </div>
      )}
    </li>
  );
};

export default HistoryItem;