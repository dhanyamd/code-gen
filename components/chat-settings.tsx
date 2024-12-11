import { LLMConfig } from '@/app/models'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from './ui/dropdown-menu'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip'
import { Button } from './ui/button'
import { Settings2 } from 'lucide-react'
import { Label } from './ui/label'
 
const ChatSettings = ({
    apiConfigurable,
    baseURLConfigurable,
    languageModel,
    onLanguageModeChange
} : {
    apiConfigurable : boolean,
    baseURLConfigurable : boolean,
    languageModel : LLMConfig
    onLanguageModeChange : (model : LLMConfig) => void
}) => {
  return <DropdownMenu>
    <TooltipProvider>
        <Tooltip delayDuration={0}>
            <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} size={"icon"} className='text-muted-foreground h-6 w-6 rounded-sm'>
                <Settings2 className='h-4 w-4'/>
                </Button>
                </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent>LLM Settings</TooltipContent>
        </Tooltip>
    </TooltipProvider>
    <DropdownMenuContent align='start'>
     {apiConfigurable && (
        <>
        <div>
            <Label htmlFor='apiKey'> API Key</Label>
            
            </div>
            </>
     )}
    </DropdownMenuContent>
  </DropdownMenu>
}

export default ChatSettings
