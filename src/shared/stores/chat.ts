import { atom } from "nanostores";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export const chatStore = atom<Message[]>([]);

export const appendToMessage = (content: string) => {
  const currentChat = chatStore.get();
  const currentMessage = currentChat[currentChat.length - 1];
  currentChat[currentChat.length - 1] = {
    ...currentMessage,
    content: currentMessage.content + content,
  };
  chatStore.set([...currentChat]);
};
