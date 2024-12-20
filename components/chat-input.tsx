import React from "react"
import TextareaAutosize from "react-textarea-autosize"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip"
import { Button } from "./ui/button"
import { ArrowUp, Paperclip, Square } from "lucide-react"

export function ChatInput({
    error ,
    retry ,
    isLoading ,
    stop,
    input,
    handleInputEvent,
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
    handleInputEvent : (e : React.ChangeEvent<HTMLTextAreaElement>) => void
    handleSubmit : (e : React.FormEvent<HTMLFormElement>) => void 
    files : File[];
    handleFileChange : (file : File[]) => void
    children : React.ReactNode 
    isMultiModal : boolean
}){
    return (
        <form
        onSubmit={handleSubmit}
       // onKeyDown={onEnter}
        className="mb-2 flex flex-col mt-auto bg-background"
      >
        {error !== undefined && (
          <div className="text-red-400 px-3 py-2 text-sm font-">
            An unexpected error has occurred. Please
            <button className="underline" onClick={retry}>
              try again
            </button>{" "}
          </div>
        )}
        <div className="shadow-md rounded-2xl border">
        <div className="flex items-center px-3 py-2 gap-1">{children}</div>
          <TextareaAutosize
          autoFocus={true}
          minRows={1}
          maxRows={5}
          required={true}
          className="text-normal px-3 resize-none ring-0 bg-inherit w-full m-0 outline-none"
          placeholder="Describe your app imagination..."
          value={input}
          //onChange={handleInputChange}
        />
                  <div className="flex flex-1 items-center gap-2">
            <input id="multimodal" type="file" accept="image/*" multiple={true} className="hidden" onChange={() => {}}/>
            <div className="flex items-center flex-1 gap-2">
                <TooltipProvider>
                    <Tooltip delayDuration={0}>
                    <TooltipTrigger asChild>
                     <Button disabled={!isMultiModal} type="button" variant={"outline"} size={"icon"} 
                     className="rounded-xl h-10 w-10" 
                     onClick={(e) => {
                        e.preventDefault();
                        document.getElementById("multimodal")?.click()
                     }}
                     >
                    <Paperclip className="w-5 h-5"/>
                     </Button>
                    </TooltipTrigger>
                    <TooltipContent>Show attachments</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                {files.length > 0 && ""}
          </div>
          <div>
            {!isLoading ? (
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      type="submit"
                      variant={"default"}
                      size={"icon"}
                      className="rounded-xl h-10 w-10"
                    >
                      <ArrowUp className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Send message</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      variant={"secondary"}
                      size={"icon"}
                      className="rounded-xl h-10 w-10"
                      onClick={(e) => {
                        e.preventDefault();
                        stop();
                      }}
                    >
                      <Square className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Stop generation</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mt-2 text-center">
         Abyss is code blocker generation and live UI Preview
      </p>
    </form>
  )
}