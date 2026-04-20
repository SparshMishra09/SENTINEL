import { useState, useEffect } from "react";
import { db } from "../firebase";
import { collection, addDoc, onSnapshot, query, where, deleteDoc, doc, serverTimestamp, orderBy } from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import { Plus, Trash2, StickyNote, Calendar } from "lucide-react";

export default function Home() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    // Real-time listener for user's notes
    const q = query(
      collection(db, "notes"), 
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setNotes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    }, (error) => {
      console.error("Firestore error:", error);
    });

    return () => unsubscribe();
  }, [user]);

  async function handleAddNote(e) {
    e.preventDefault();
    if (!note.trim()) return;

    setLoading(true);
    try {
      await addDoc(collection(db, "notes"), {
        text: note,
        userId: user.uid,
        createdAt: serverTimestamp()
      });
      setNote("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
    setLoading(false);
  }

  async function handleDeleteNote(id) {
    try {
      await deleteDoc(doc(db, "notes", id));
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  }

  return (
    <div className="container animate-in">
      <header style={{ marginBottom: '3rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Secure Dashboard</h1>
        <p style={{ color: 'var(--text-muted)' }}>Manage your encrypted notes and records.</p>
      </header>

      <div className="glass-card" style={{ marginBottom: '3rem', maxWidth: '600px', marginInline: 'auto' }}>
        <form onSubmit={handleAddNote} style={{ display: 'flex', gap: '1rem' }}>
          <div className="input-group" style={{ flex: 1, marginBottom: 0 }}>
            <input 
              type="text" 
              placeholder="Write a new note..." 
              value={note} 
              onChange={(e) => setNote(e.target.value)}
              style={{ height: '3rem' }}
            />
          </div>
          <button disabled={loading} type="submit" className="btn-primary" style={{ height: '3rem' }}>
            <Plus size={20} />
            {loading ? "..." : "Add"}
          </button>
        </form>
      </div>

      <div className="grid">
        {notes.length === 0 ? (
          <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
            <StickyNote size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
            <p>No notes found. Start by creating one above!</p>
          </div>
        ) : (
          notes.map((n) => (
            <div key={n.id} className="glass-card" style={{ padding: '1.5rem', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                  <Calendar size={12} />
                  {n.createdAt?.toDate().toLocaleDateString() || "Just now"}
                </div>
                <button 
                  onClick={() => handleDeleteNote(n.id)} 
                  style={{ background: 'transparent', color: 'var(--text-muted)', padding: '0.25rem' }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#ef4444'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                >
                  <Trash2 size={16} />
                </button>
              </div>
              <p style={{ fontSize: '1.1rem', wordBreak: 'break-word' }}>{n.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
