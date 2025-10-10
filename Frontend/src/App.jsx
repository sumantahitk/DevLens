// import { useState, useEffect } from 'react'
// import "prismjs/themes/prism-tomorrow.css"
// import Editor from "react-simple-code-editor"
// import prism from "prismjs"
// import Markdown from "react-markdown"
// import rehypeHighlight from "rehype-highlight";
// import "highlight.js/styles/github-dark.css";
// import axios from 'axios'
// import './App.css'

// function App() {
//   const [ count, setCount ] = useState(0)
//   const [ code, setCode ] = useState(` function sum() {
//   return 1 + 1
// }`)

//   const [ review, setReview ] = useState(``)

//   useEffect(() => {
//     prism.highlightAll()
//   }, [])

//   async function reviewCode() {
//     const response = await axios.post('http://localhost:3000/ai/get-review', { code })
//     setReview(response.data)
//   }

//   return (
//     <>
//     <header>
//   <h1>Codalyze</h1>
// </header>
//       <main>
//         <div className="left">
//           <div className="code">
//             <Editor
//               value={code}
//               onValueChange={code => setCode(code)}
//               highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
//               padding={10}
//               style={{
//                 fontFamily: '"Fira code", "Fira Mono", monospace',
//                 fontSize: 16,
//                 border: "1px solid #ddd",
//                 borderRadius: "5px",
//                 height: "100%",
//                 width: "100%"
//               }}
//             />
//           </div>
//           <div
//             onClick={reviewCode}
//             className="review">Review</div>
//         </div>
//         <div className="right">
//           <Markdown

//             rehypePlugins={[ rehypeHighlight ]}

//           >{review}</Markdown>
//         </div>
//       </main>
//     </>
//   )
// }



// export default App





import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
  const [code, setCode] = useState(`function sum() {\n  return 1 + 1\n}`)
  const [review, setReview] = useState(``)
  const [theme, setTheme] = useState('dark') // 🌗 theme state

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    const response = await axios.post('http://localhost:3000/ai/get-review', { code })
    setReview(response.data)
  }

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  // Theme-specific inline styles
  const styles = {
    app: {
      backgroundColor: theme === 'dark' ? '#1b1b1b' : '#f5f5f5',
      color: theme === 'dark' ? '#eaeaea' : '#111111',
      minHeight: '100vh'
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '1rem 2rem',
      background: theme === 'dark' ? 'linear-gradient(90deg, #101010, #181818)' : 'linear-gradient(90deg, #f0f0f0, #e0e0e0)',
      boxShadow: '0 2px 10px rgba(0,0,0,0.4)'
    },
    toggleButton: {
      padding: '0.4rem 1rem',
      fontSize: '0.9rem',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
      backgroundColor: theme === 'dark' ? '#555' : '#ccc',
      color: theme === 'dark' ? '#fff' : '#111'
    },
    main: {
      display: 'flex',
      gap: '1.5rem',
      height: 'calc(100vh - 70px)',
      padding: '1.5rem'
    },
    left: {
      flex: 1,
      borderRadius: '0.8rem',
      overflow: 'hidden',
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      background: theme === 'dark' ? 'linear-gradient(160deg, #111111, #1a1a1a)' : 'linear-gradient(160deg, #fff, #eee)',
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.4)',
      transition: 'all 0.3s ease'
    },
    code: {
      flex: 1,
      padding: '1rem',
      borderRadius: '0.5rem',
      overflowY: 'auto',
      backgroundColor: theme === 'dark' ? '#1b1b1b' : '#f0f0f0',
      color: theme === 'dark' ? '#eaeaea' : '#111',
      fontFamily: '"Fira code", "Fira Mono", monospace',
      fontSize: '1rem',
      lineHeight: 1.6,
      boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.5)'
    },
    review: {
      position: 'absolute',
      bottom: '2rem',
      right: '2rem',
      padding: '0.6rem 2rem',
      fontWeight: 600,
      cursor: 'pointer',
      borderRadius: '0.7rem',
      border: 'none',
      background: theme === 'dark' ? 'linear-gradient(135deg, #a9a9ff, #7b7bff)' : 'linear-gradient(135deg, #89c2ff, #4da6ff)',
      color: '#000',
      boxShadow: '0 0 8px rgba(150, 150, 255, 0.3)',
      transition: '0.3s ease'
    },
    right: {
      flex: 1,
      borderRadius: '0.8rem',
      overflowY: 'auto',
      padding: '1.5rem 2rem',
      background: theme === 'dark' ? 'linear-gradient(145deg, #232323, #2f2f2f)' : 'linear-gradient(145deg, #fff, #eee)',
      color: theme === 'dark' ? '#eaeaea' : '#111',
      lineHeight: 1.7,
      fontSize: '1rem',
      boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)'
    }
  }

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <h1>Codalyze</h1>
        <button style={styles.toggleButton} onClick={toggleTheme}>
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
      </header>

      <main style={styles.main}>
        <div className="left" style={styles.left}>
          <div className="code" style={styles.code}>
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={10}
              style={{ fontFamily: '"Fira code", "Fira Mono", monospace', fontSize: 16, height: '100%', width: '100%' }}
            />
          </div>
          <div onClick={reviewCode} style={styles.review}>Review</div>
        </div>

        <div className="right" style={styles.right}>
          <Markdown rehypePlugins={[rehypeHighlight]}>
            {review}
          </Markdown>
        </div>
      </main>
    </div>
  )
}

export default App
