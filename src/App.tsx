import { useState, lazy, Suspense } from 'react'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import './App.css'

const ReactMarkdown = lazy(() => import('react-markdown'))

function App() {
  const [response, setResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    // Send a true form data post request
    fetch('/', {
      method: 'POST',
      body: new FormData(e.currentTarget),
    })
    .then(res => res.json())
    .then(data => {
      console.log(data)
      setResponse(data)
    })
    .catch(err => console.error(err))
    .finally(() => setLoading(false))
  }

  return (
    <>
      <h1 className="py-4">Testing Swiss AI - Text Generation</h1>
      {!loading && <div className="text-left mt-4 p-4">
        <form action="/" method="post" onSubmit={handleSubmit}>
          <label htmlFor="prompt">Prompt</label>
          <textarea id="prompt" name="prompt" placeholder="Enter your prompt" rows={5}></textarea>
          <br />
          <button type="submit">Generate</button>
        </form>
      </div>}
      {loading && <div className="py-4 flex items-center gap-2">
        Loading... this may take a few minutes...
        <div className="animate-spin border-t-4 border-b-4 border-blue-500 rounded-full w-8 h-8"></div>
      </div>}
      {response && <div className="text-left mt-4">
          <h3 className="py-4">Response</h3>
          <Suspense fallback={<div>Loading...</div>}>
            <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>{response}</ReactMarkdown>
          </Suspense>
      </div>}
      <footer className="mt-4 p-4">
        <p>For testing purposes only</p>
      </footer>
    </>
  )
}

export default App
