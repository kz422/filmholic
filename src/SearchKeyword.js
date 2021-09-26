import React, { useState, createContext, useContext } from 'react'

const KeywordContext = createContext({
  keyword: '',
  setKeyword: () => {}
})

const KeywordProvider = ({ children }) => {
  const [keyword, setKeyword] = useState('')
  
  return <KeywordContext.Provider value={{ keyword, setKeyword }}>
    { children }
  </KeywordContext.Provider>
}

const useKeywordContext = () => useContext(KeywordContext)

export { KeywordProvider, useKeywordContext }
