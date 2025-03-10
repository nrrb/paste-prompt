// app/conversation/[id]/page.js
'use client';

import { use, useEffect, useState } from 'react';
import { db } from '../../../lib/firebase';
import { doc, onSnapshot } from 'firebase/firestore';

export default function ConversationPage({ params }) {
  // Unwrap the params promise
  const resolvedParams = use(params);
  const { id } = resolvedParams;
  const [conversation, setConversation] = useState(null);

  useEffect(() => {
    if (!id) return;
    const unsubscribe = onSnapshot(doc(db, 'conversations', id), (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setConversation(data);
        console.log('Prompt:', data.prompt);
        console.log('Response:', data.response);
      } else {
        setConversation(null);
      }
    });
    return () => unsubscribe();
  }, [id]);

  const copyToClipboard = (text) => {
    if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text)
        .then(() => {
          console.log('Copied text to clipboard');
        })
        .catch((err) => {
          console.error('Failed to copy text: ', err);
        });
    } else {
      console.error('Clipboard API not supported');
      // Optional: Provide a fallback method, e.g., creating a temporary textarea and using document.execCommand('copy')
    }
  };

  if (!conversation) {
    return <div>Loading conversation…</div>;
  }

  return (
    <div className="conversation-container">
      <div className="bubble-prompt prompt">
        <div style={{ whiteSpace: 'pre-wrap' }}>
          {conversation.prompt}
        </div>
        <button className="copyButton" onClick={() => copyToClipboard(conversation.prompt)}>
          Copy
        </button>
      </div>
      <div className="bubble-response response">
        <div style={{ whiteSpace: 'pre-wrap' }}>
          {conversation.response}
        </div>
        <button className="copyButton" onClick={() => copyToClipboard(conversation.response)}>
          Copy
        </button>
      </div>
      <style jsx>{`
        .conversation-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 1rem;
        }
        .bubble-prompt {
          padding: 1rem;
          border-radius: 16px;
          margin: 1rem 0;
          background-color: #f1f1f1;
          width: 100%;
        }
        .bubble-response {
          padding: 1rem;
          border-radius: 16px;
          margin: 1rem 0;
          background-color: #ffffff;
          width: 100%;
        }
        .copyButton {
          margin-top: 0.5rem;
          padding: 0.25rem 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          background: #fff;
          cursor: pointer;
          font-size: 0.8rem;
        }
        @media (min-width: 768px) {
          .bubble-prompt,
          .bubble-response {
            max-width: 50%;
          }
        }
      `}</style>
    </div>
  );
}
