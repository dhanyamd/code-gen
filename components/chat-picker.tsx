import { LLMModel } from '@/app/models'
import React from 'react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from './ui/select'

const ChatPicker = ({models} : {models : LLMModel[]}) => {
  return (
    <div className='flex items-center space-x-2'>
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
                       <div>
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
                       <div>
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
