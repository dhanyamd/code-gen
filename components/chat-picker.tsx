import { LLMModel } from '@/app/models'
import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'
import Image from 'next/image'
import { Template } from '@/lib/templates'
import { Sparkles } from 'lucide-react'

const ChatPicker = ({models, templates} : {models : LLMModel[], templates: Template}) => {
  return (
    <div className='flex items-center space-x-2'>
       <div className='flex flex-col'>
        <Select name='template' defaultValue='' onValueChange={() => {}}>
        <SelectTrigger className='whitespace-nowrap border-none focus:ring-0 shadow-none px-0 py-0 text-xs h-6'>
            <SelectValue placeholder="Select a persona"/>
        </SelectTrigger>
        <SelectContent side='top'>
         <SelectGroup>
            <SelectLabel>Persona</SelectLabel>
            <SelectItem value='auto'>
              <div className='flex items-center space-x-2'>
              <Sparkles className='flex text-[#a1a1aa]' width={14} height={14}/>
              <span>Auto</span>
              </div>
            </SelectItem>
            {Object.entries(templates).map(([templateId, template]) => (
                <SelectItem key={templateId} value={templateId}>
                  <div className='flex items-center space-x-2'>
                  <Image className='flex' alt={templateId} height={14} width={14} src={`/thirdparty/logos/${templateId}.svg`}/>
                  <span>{(template as any).name}</span>
                  </div>
                </SelectItem>
            ))}
         </SelectGroup>
        </SelectContent>
        </Select>
      </div>
      <div className='flex flex-col'>
        <Select name='languageModel' defaultValue='' onValueChange={() => {}}>
        <SelectTrigger className='whitespace-nowrap border-none focus:ring-0 shadow-none px-0 py-0 text-xs h-6'>
            <SelectValue placeholder="Language model"/>
        </SelectTrigger>
        <SelectContent>
        {Object.entries(
              Object.groupBy(models, ({ provider }) => provider)
            ).map(([provider, models]) => (
               <SelectGroup key={provider}>
                <SelectLabel>{provider}</SelectLabel>
                {models?.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                       <div className='flex items-center space-x-2'>
                        <Image className='flex' alt={model.providerId} height={14} width={14} src={`/thirdparty/logos/${model.providerId}.svg`}/>
                        <span>{model.name}</span>
                       </div>
                    </SelectItem>
                ))}
               </SelectGroup>
            ))
        }
        </SelectContent>
        </Select>
      </div>
    </div>
  )
}

export default ChatPicker
