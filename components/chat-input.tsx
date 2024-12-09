import React from "react"
import TextareaAutosize from "react-textarea-autosize"

export function ChatInput({
    error ,
    retry ,
    isLoading ,
    stop,
    input,
    handleChangeEvent,
    handleFileChange,
    handleSubmit,
    children, 
    files,
    isMultiModal,
} : {
    error : undefined | unknown
    retry : () => void 
    isLoading : boolean 
    stop : () => void 
    input : string 
    handleChangeEvent : (e : React.ChangeEvent<HTMLTextAreaElement>) => void
    handleSubmit : (e : React.FormEvent<HTMLFormElement>) => void 
    files : File[];
    handleFileChange : (file : File[]) => void
    children : React.ReactNode 
    isMultiModal : boolean
}){
    return (
       <form>
        {error  !== "undefine" && (
            <div>
                An unexpected error has occured! Please try again later
            </div>           
        )}
        <div>
            <div>{children}</div>
            <TextareaAutosize
          autoFocus={true}
          minRows={1}
          maxRows={5}
          required={true}
          className="text-normal px-3 resize-none ring-0 bg-inherit w-full m-0 outline-none"
          placeholder="Describe your app imagination..."
          value={input}
         // onChange={handleInputChange}
        />
        </div>

       </form>
    )
}