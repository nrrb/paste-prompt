// app/page.js
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db } from '../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Function to normalize markdown bullet list markers.
function normalizeMarkdown(text) {
  // For each line, replace any leading "-" with one dash and one space.
  return text
    .split('\n')
    .map((line) => line.replace(/^-\s+/, '- '))
    .join('\n');
}

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Normalize the markdown in both fields before saving.
    const normalizedPrompt = normalizeMarkdown(prompt);
    const normalizedResponse = normalizeMarkdown(response);

    try {
      const docRef = await addDoc(collection(db, 'conversations'), {
        prompt: normalizedPrompt,
        response: normalizedResponse,
        createdAt: serverTimestamp(),
      });
      router.push(`/conversation/${docRef.id}`);
    } catch (error) {
      console.error('Error saving conversation:', error);
    }
  };

  return (
    <div className="container">
      <h1>Share Your ChatGPT Conversation</h1>
      <form onSubmit={handleSubmit}>
        <div className="formGroup">
          <label htmlFor="prompt">
            <strong>Prompt:</strong>
          </label>
          <textarea
            id="prompt"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows="8"
            className="textarea"
            maxLength={10000}
          />
        </div>
        <div className="formGroup">
          <label htmlFor="response">
            <strong>Response:</strong>
          </label>
          <textarea
            id="response"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
            rows="8"
            className="textarea"
            maxLength={10000}
          />
        </div>
        <button type="submit" className="submitButton">
          Share Conversation
        </button>
      </form>
      <style jsx>{`
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 1rem;
        }
        .formGroup {
          margin-bottom: 1rem;
        }
        .textarea {
          width: 100%;
          border: 1px solid #ccc;
          border-radius: 4px;
          padding: 0.5rem;
          font-size: 1rem;
          outline: none;
        }
        .submitButton {
          background: transparent;
          border: 1px solid #ccc;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .submitButton:hover {
          background: #f9f9f9;
        }
      `}</style>
    </div>
  );
}
