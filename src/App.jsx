import { useState, useCallback, useEffect, useRef } from 'react'

function App() {
  const [length, setLength] = useState(7)
  const [numbersAllowed, setNumbersAllowed] = useState(false)
  const [symbolsAllowed, setSymbolsAllowed] = useState(false)
  const [password, setPassword] = useState()
  const [color, setColor] = useState("blue")

  //useRef Hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
      let pass = "";
      let str = "ZXCVBNMLKJHGFDSAQWERTYUIOPmnbvcxzasdfghjklpoiuytrewq";
      if(numbersAllowed) {
        str = str + "0123456789";
      }
      if(symbolsAllowed) {
        str = str + "!@#$%^&*()-_=+[]{}|;:,<.>?/~"
      }

      for(let i=1; i<=length; i++) {
        let char = Math.floor(Math.random() * str.length);
        pass = pass + str[char]; 
      }
      
      setPassword(pass);
  
    }, [length,numbersAllowed,symbolsAllowed])

    // passwordGenerator();  (in promise) Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.

    useEffect(() => {
      passwordGenerator()
    }, [length,numbersAllowed,symbolsAllowed,passwordGenerator])

    const copyPasswordToClipboard = () => {

      passwordRef.current?.select();                      //Use this to show the selected range of password 
      passwordRef.current?.setSelectionRange(0,100);       //Use this to show the selected effect range of password 
      //If ? is not used and let's assume password is null or undefined then it will throw error & if ? is used, expression will get short circuit 

      window.navigator.clipboard.writeText(password);      //window can be used in React not in Next.js
      
      setColor("green");
    }

  return (
      <div className='w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-purple-200 bg-gray-700'>
        <h1 className='text-white text-center my-3 text-2xl'>Password Generator</h1>
         <div className='flex shadow rounded-lg overflow-hidden mb-4'>
                <input type="text" 
                value={password} 
                className='outline-none w-full py-1 px-3 text-black'
                placeholder='Password'
                readOnly
                ref={passwordRef}
                />
                <button onClick={copyPasswordToClipboard} className='outline-none bg-blue-400 text-white px-3 py-1 shrink-0 hover:bg-green-400'>Copy</button>
         </div>

         <div className='flex text-sm gap-x-2'>
              <div className='flex items-center gap-x-1'>
                  <input 
                      type="range"
                      min={7}
                      max={100}
                      value={length}
                      className='cursor-pointer'
                      onChange = {(e)=> {
                        setLength(Number(e.target.value))   // Convert value to number(kuch hoga nahi bus length number dikhega not string)
                      }}
                  />
                  <label>Length: {length}</label>
              </div>

              <div className='flex items-center gap-x-1'>
                    <input 
                        type="checkbox"
                        defaultChecked={numbersAllowed}
                        id="numberInput"
                        onChange = {()=> {
                          setNumbersAllowed((prev) => !prev)    //isse next time jab click hoga checkbox jo value if true=>false ho jaega vice versa
                        }}
                     />  
                     <label>Numbers {numbersAllowed}</label>
              </div>

              <div className='flex items-center gap-x-1'>
                    <input 
                        type="checkbox"
                        defaultChecked={symbolsAllowed}
                        id="charactersInput"
                        onChange = {()=> {
                          setSymbolsAllowed((prev) => !prev)    //isse next time jab click hoga checkbox jo value if true=>false ho jaega vice versa
                        }}
                     />  
                     <label>Symbols {symbolsAllowed}</label>
              </div>
         </div>
      </div>
  )
}

export default App
