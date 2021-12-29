import React from 'react'

export default function Demo({ trigger, setPopup }) {
  return (trigger) ? (
    <div className='fixed top-0 left-0 bg-black w-full h-screen flex justify-center items-center'>
      <div className='relative p-10 max-w-prose max-h-fit bg-rose-500'>
        <iframe src="https://giphy.com/embed/JIX9t2j0ZTN9S"
          width="480"
          height="480"
          frameBorder="0"
          className="giphy-embed"
          allowFullScreen>
        </iframe>
        <button className='absolute top-10 right-10 text-white-500 border-rose-600 rounded p-1 bg-white hover:bg-rose-500'
          onClick={() => setPopup(false)}>close
        </button>
      </div>
    </div>
  ) : ''
}


