import { useState } from 'react'
import { useRouter } from 'next/router'

export default function Search({ handleSubmit }) {

  const [val, setVal] = useState("")

  return (
    <div className="flex w-full items-center space-2 flex-wrap">
    <p className="w-max grow-0 whitespace-nowrap mr-2 my-2" >Zip Code</p>
    <form
    onSubmit={(e) => {
      e.preventDefault()
      handleSubmit(val)
    }}
    className="border-2 rounded-lg flex items-stretch justify-between grow">

    <input type="number"
    className="p-2 bg-transparent block grow"
    placeholder="64111"
    onChange={ (e) => setVal(e.target.value) }
    value={ val } />
      <input type="submit" className="bg-transparent border-l px-4 py-2 text-lg cursor-pointer"
             value="&rarr;" />
    </form>
    </div>
  )
}
