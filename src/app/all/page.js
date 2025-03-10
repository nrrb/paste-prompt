// app/all/page.js
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { db } from '../../lib/firebase';
import { collection, getDocs, query, orderBy, deleteDoc, doc } from 'firebase/firestore';

export default function AllConversations() {
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const q = query(
          collection(db, 'conversations'),
          orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const convos = [];
        querySnapshot.forEach((docSnapshot) => {
          convos.push({ id: docSnapshot.id, ...docSnapshot.data() });
        });
        setConversations(convos);
      } catch (error) {
        console.error('Error fetching conversations:', error);
      }
    };
    fetchConversations();
  }, []);

  const handleDelete = async (id, e) => {
    // Prevent the Link click from firing.
    e.stopPropagation();
    const confirmDelete = window.confirm('Are you sure you want to delete this conversation?');
    if (!confirmDelete) return;
    try {
      await deleteDoc(doc(db, 'conversations', id));
      setConversations((prev) => prev.filter((convo) => convo.id !== id));
    } catch (error) {
      console.error('Error deleting conversation:', error);
    }
  };

  return (
    <div className="container">
      <h1>All Conversations</h1>
      {conversations.length === 0 ? (
        <p>No conversations found.</p>
      ) : (
        conversations.map((conv) => (
          <div key={conv.id} className="conversationCard">
            <Link legacyBehavior href={`/conversation/${conv.id}`}>
              <a className="cardLink">
                <div className="conversationContent">
                  <div
                    className="prompt"
                    dangerouslySetInnerHTML={{ __html: conv.prompt }}
                  />
                  <div
                    className="response"
                    dangerouslySetInnerHTML={{ __html: conv.response }}
                  />
                </div>
              </a>
            </Link>
            <button className="deleteButton" onClick={(e) => handleDelete(conv.id, e)}>
              Delete
            </button>
          </div>
        ))
      )}
      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 1rem;
        }
        h1 {
          text-align: center;
          margin-bottom: 2rem;
        }
        .conversationCard {
          border: 1px solid #ccc;
          border-radius: 8px;
          margin: 1rem 0;
          padding: 1rem;
          position: relative;
          transition: background 0.2s;
          cursor: pointer;
        }
        .conversationCard:hover {
          background: #f9f9f9;
        }
        .conversationContent {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        .prompt {
          font-weight: bold;
          margin-bottom: 0.5rem;
        }
        .response {
          color: #555;
        }
        .deleteButton {
          position: absolute;
          top: 0.5rem;
          right: 0.5rem;
          background: transparent;
          border: none;
          color: red;
          cursor: pointer;
          font-size: 0.8rem;
          padding: 0.25rem;
        }
        .cardLink {
          text-decoration: none;
          color: inherit;
          display: block;
        }
      `}</style>
    </div>
  );
}
