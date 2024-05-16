import { Underline } from 'lucide-react'
import { Bold } from 'lucide-react'
import { Italic } from 'lucide-react'
import { Eraser } from 'lucide-react'
import styles from './EmailEditor.module.scss'
import { useState } from 'react'
import { useRef } from 'react'
import { HTMLTextAreaElement } from 'react'
import { applyStyle } from './applyStyle'
import { useMutation, useQueryClient } from '@tanstack/react-query'
//import parse from 'html-react-parser'
import { emailService } from '../../services/email.service'



export function EmailEditor() {

  const [text, setText]= useState('Enter email...');

  const[selectionStart,setSelectionStart]= useState(0)
  const[selectionEnd,setSelectionEnd]= useState(0)

  const textRef=useRef(null)
  //<HTMLTextAreaElement | null>

  const QueryClient=useQueryClient()

  const {mutate, isPending}=useMutation({
    mutationKey:['create email'],
    mutationFn:() => emailService.postEmails(text),
    onSuccess() {
      setText(''),
      QueryClient.refetchQueries({queryKey:['email list']})
    }
    
  })

  const updateSelection = () => {
    if (!textRef.current) return

    setSelectionStart(textRef.current.selectionStart)
    setSelectionEnd(textRef.current.selectionEnd)

  }

  const applyFormat = (format) => {
    
    const selectedText=text.substring(selectionStart,selectionEnd)
    console.log(selectedText)
    if (!selectedText) return

    const beforeText=text.substring(0,selectionStart)
    const afterText=text.substring(selectionEnd)

    setText(beforeText+applyStyle(format,selectedText)+afterText)


  }  

  return (
    <div>
      <h1>Email Editor</h1>
      <div className= {styles.card}>

        <textarea ref={textRef} className= {styles.editor} 
        spellCheck='false' 
        onSelect={updateSelection}
        value={text}
        onChange={e => setText(e.target.value)}
        />

        <div className= {styles.actions}>

          <div className= {styles.tools}>
            <button onClick={()  => setText('')}><Eraser size={17}/></button>
            <button onClick={()  => applyFormat('bold')}><Bold size={17}/></button>
            <button onClick={()  => applyFormat('italic')}><Italic size={17}/></button>
            <button onClick={()  => applyFormat('underline')}><Underline size={17}/></button>
          
          </div>

          <button disabled={isPending} onClick={() => mutate()}>Send now</button>

        </div>
      </div>
    </div>
  )
}


