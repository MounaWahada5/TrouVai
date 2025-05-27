import { ChatInput } from "@/components/custom/chatinput";
import { PreviewMessage, ThinkingMessage } from "../../components/custom/message";
import { useScrollToBottom } from "@/components/custom/use-scroll-to-bottom";
import { useState, useEffect } from "react";
import { message } from "../../interfaces/interfaces";
import { Overview } from "@/components/custom/overview";
import { apiFetch } from "../../utils/api";
import Sidebar from "../../components/Sidebar";
import { useNavigate } from "react-router-dom";

export function Chat() {
  const [messagesContainerRef, messagesEndRef] = useScrollToBottom<HTMLDivElement>();
  const [messages, setMessages] = useState<message[]>([]);
  const [question, setQuestion] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [resources, setResources] = useState<{ title: string; url?: string }[]>([]);
  const [history, setHistory] = useState<{ query: string; timestamp: string }[]>([]);
  const [username, setUsername] = useState<string>(localStorage.getItem("username") || "User"); // Ensure string type
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const data = await apiFetch("/history", { method: "GET" });
        console.log("Fetched History Data:", data);
        setHistory(data.history || []);
        console.log("Updated History State:", data.history || []);
      } catch (error) {
        console.error("Failed to fetch history:", error);
      }
    };
    fetchHistory();

    const userId = localStorage.getItem("user_id");
    const storedUsername = localStorage.getItem("username");
    console.log("Initial User Data from localStorage:", {
      userId,
      username: storedUsername,
      token: localStorage.getItem("token"),
    });

    if (!storedUsername) {
      console.warn("Username not found in localStorage, using fallback: 'User'");
      setUsername("User");
    } else {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    if (messages.length === 1) {
      const firstQuery = messages[0].content;
      console.log("Adding first query to history:", firstQuery);
      apiFetch("/history", {
        method: "POST",
        body: JSON.stringify({ query: firstQuery }),
      }).then((response) => {
        console.log("History POST Response:", response);
        fetchHistory();
      }).catch((error) => console.error("History update error:", error));
    }
    console.log("Current Messages State:", messages);
    console.log("Current User Data:", {
      userId: localStorage.getItem("user_id"),
      username,
    });
  }, [messages]);

  async function handleSubmit(text?: string) {
    if (isLoading) return;

    const messageText = text || question;
    const userId = localStorage.getItem("user_id");
    if (!userId) {
      console.error("No user_id found in localStorage. Please log in.");
      setMessages((prev) => [
        ...prev,
        { content: "Erreur: Veuillez vous connecter.", role: "assistant", id: Date.now().toString() },
      ]);
      return;
    }

    setIsLoading(true);
    setMessages((prev) => [
      ...prev,
      { content: messageText, role: "user", id: Date.now().toString() },
    ]);
    setQuestion("");
    console.log("User Data before Chat Request:", {
      userId,
      username,
      messageText,
    });

    try {
      const data = await apiFetch("/chat", {
        method: "POST",
        body: JSON.stringify({ query: messageText, user_id: userId }),
      });
      console.log("Chat API Response:", data);
      setMessages((prev) => [
        ...prev,
        { content: data.answer, role: "assistant", id: Date.now().toString() },
      ]);
      const formattedResources = (data.sources || []).map((source) => ({ title: source, url: source }));
      console.log("Formatted Resources:", formattedResources);
      setResources(formattedResources);
      console.log("Updated Resources State:", formattedResources);
    } catch (error) {
      console.error("Chat error:", error);
      setMessages((prev) => [
        ...prev,
        { content: `Erreur: ${error.message}`, role: "assistant", id: Date.now().toString() },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  const handleLogout = () => {
    console.log("Logging out user:", {
      userId: localStorage.getItem("user_id"),
      username,
      token: localStorage.getItem("token"),
    });
    localStorage.removeItem("token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("username");
    console.log("User data cleared from localStorage");
    navigate("/");
  };

  return (
    <div className="flex flex-row min-w-0 h-dvh bg-background">
      {/* Left Sidebar for History */}
      <Sidebar
        isOpen={true}
        toggleSidebar={() => {}}
        position="left"
        history={history}
        resources={[]}
        username={username}
        onLogout={handleLogout}
      />
      {/* Main Chat Area */}
      <div className="flex flex-col min-w-0 flex-1">
        <div className="flex flex-col min-w-0 gap-6 flex-1 overflow-y-scroll pt-4" ref={messagesContainerRef}>
          {messages.length === 0 && <Overview />}
          {messages.map((message, index) => (
            <PreviewMessage key={index} message={message} />
          ))}
          {isLoading && <ThinkingMessage />}
          <div ref={messagesEndRef} className="shrink-0 min-w-[24px] min-h-[24px]" />
        </div>
        <div className="flex mx-auto px-4 bg-background pb-4 md:pb-6 gap-2 w-full md:max-w-3xl">
          <ChatInput
            question={question}
            setQuestion={setQuestion}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>
      </div>
      {/* Right Sidebar for Resources/Sources */}
      <Sidebar
        isOpen={true}
        toggleSidebar={() => {}}
        position="right"
        resources={resources}
        history={[]}
        username={username}
        onLogout={handleLogout}
      />
    </div>
  );
}