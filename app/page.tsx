'use client'
import React, { useState } from 'react'
import { AuthViewType, useAuth } from "@/app/lib/auth";
import { supabase } from './lib/supabase';
import { NavBar } from '@/components/Navbar';
import Chat from '@/components/chat';
import { ChatInput } from '@/components/chat-input';
import { useLocalStorage } from "usehooks-ts";
import ChatPicker from '@/components/chat-picker';
import modelsList from "@/lib/models.json"
const Home = () => {
  const [isAuthDialogOpen, setAuthDialog] = useState(false);
  const [authView, setAuthView] = useState<AuthViewType>("sign_in");
  const { session } = useAuth(setAuthDialog, setAuthView);
  const [files, setFiles] = useState<File[]>([]);
  const[chatInput, setChatInput] = useLocalStorage("chat", "")
  const[selectTemplate, setselectedTemplate] = useState<"auto">("auto")
  const [largeLanguageModel, setLanguageModel] = useLocalStorage("largelanguageModel", {
    model : "gpt-4o-mini"
  })
  function logout() {
    supabase
      ? supabase.auth.signOut()
      : console.warn("Supabase is not initialized");
  }
  return (
    <main className='flex min-h-screen max-h-screen'>
    <div className='grid w-full md:grid-cols-2'>
      <div className='flex flex-col w-full max-w-[800px] mx-auto px-4 overflow-auto col-span-2'>
      <NavBar 
       session={session}
       showLogin={() => setAuthDialog(true)}
       signOut={logout}
       /*onClear={handleClearChat}
       canClear={messages.length > 0}
       canUndo={messages.length > 1 && !isLoading}
       onUndo={handleUndo}
       onSocialClick={handleSocialClick}*/
      />
      <Chat />
      <ChatInput
      isLoading={false}
      input={chatInput}
      handleSubmit={() => {}}
      handleFileChange={() => {}}
      files={files}
      error={undefined}
      retry={() => {}}
      isMultiModal={false}
      stop={() => {}}
      handleInputEvent={() => {}}
      >
        <ChatPicker
          models={modelsList.models}
        />

      </ChatInput>
           
      </div>
    </div>
    </main>
  )
}

export default Home
