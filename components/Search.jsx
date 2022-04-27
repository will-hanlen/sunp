import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Search({ handleSubmit }) {

  const [val, setVal] = useState("")

  return (
    <div className="flex w-full items-center space-x-2">
    <p className="w-max" >Zip Code</p>
    <form
    onSubmit={(e) => {
      e.preventDefault()
      handleSubmit(val)
    }}
          className="border-2 rounded-lg flex items-stretch justify-between grow">
      <input type="number"
             maxLength="5"
             minLength="5"
             className="grow p-2 focus:bg-[#eee]"
    required
    placeholder="64111"
             onChange={ (e) => setVal(e.target.value) }
             value={ val } />
      <input type="submit" className="bg-gray-200 px-4 py-2  text-lg cursor-pointer"
             value="&rarr;" />
    </form>
    </div>
  )
}
