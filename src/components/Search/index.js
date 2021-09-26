import React, { useState } from 'react'
import { useNavigate } from 'react-router'

const SearchCom = () => {

  const navigate = useNavigate()
  const [searchWord, setSearchWord] = useState('')

  const handleOnChange = (e) => {
    setSearchWord(e.target.value)
  }

  const toResult = () => {
    navigate('/search')
  }

  const submitSearch = () => {

  }

  return (
    <div style={{ marginTop: '6px' }}>
      {searchWord}
      <button onClick={toResult}>
        to result
      </button>
      <form
        onSubmit={toResult} 
      >
        <input 
          placeholder="Search..." 
          value={searchWord}
          onChange={handleOnChange}
        />
      </form>
    </div>
  )
}

export default SearchCom
