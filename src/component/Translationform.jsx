 import React, { useEffect, useState } from 'react'

function Translationform() {
  const [output, setOutput] = useState("")
  const [inputText, setInputText] = useState("")
  const [languages, setLanguages] = useState([])
  const [targetLang, setTargetLang] = useState("")

  useEffect(() => {
    const fetchLanguages = async () => {
      try {
        const response = await fetch('https://anuvadak-backend.onrender.com/languages')
        const data = await response.json()

        const formattedLangs = data.map(l => ({
          code: l.code,
          language: l.language
        }))

        setLanguages(formattedLangs)
      }  catch (error) {
  console.error("FULL ERROR:", error)
  res.status(500).json({ error: error.message })
}
    }

    fetchLanguages()
  }, [])

  const handleTranslate = async (e) => {
    e.preventDefault()

    if (!inputText || !targetLang) {
      alert("Enter text and select language")
      return
    }

    try {
      const response = await fetch('https://anuvadak-backend.onrender.com/translate', {
        method: 'POST',
        body: JSON.stringify({
          q: inputText,
          source: "auto",
          target: targetLang,
          format: "text"
        }),
        headers: { "Content-Type": "application/json" }
      })

      const data = await response.json()
      setOutput(data.translatedText || "")
    } catch (err) {
      console.error("Translation error:", err)
    }
  }

  return (
    <div className='flex w-full justify-center items-center min-h-screen bg-gray-100'>
      <form onSubmit={handleTranslate} className='grid gap-4 w-96 bg-white p-6 rounded-lg shadow-md'>
        
        <h2 className='text-xl font-semibold text-center'>Translator</h2>

        <textarea
          className='p-2 border outline-none resize-none'
          rows="4"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />

        <select
          className='outline-none border p-2'
          value={targetLang}
          onChange={(e) => setTargetLang(e.target.value)}
        >
          <option value="">Select language</option>
          {languages.map((lang, index) => (
            <option key={index} value={lang.code}>
              {lang.language}
            </option>
          ))}
        </select>

        <button className='p-2 bg-blue-500 text-white rounded'>
          Translate
        </button>

        <textarea
          value={output}
          className='p-2 border outline-none resize-none bg-gray-100'
          rows="4"
          disabled
        />
      </form>
    </div>
  )
}

export default Translationform