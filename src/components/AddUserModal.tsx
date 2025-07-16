import { useState } from 'react';

export function AddUserModal({ onClose, onSuccess }: { onClose: () => void; onSuccess?: () => void }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    const res = await fetch('/api/create-clerk-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firstName, lastName, email }),
    });

    if (res.ok) {
      setSuccess(true);
      setFirstName('');
      setLastName('');
      setEmail('');
      if (onSuccess) {
        onSuccess();
      }
    } else {
      const data = await res.json();
      setError(data.error || 'Błąd podczas dodawania użytkownika');
    }
    setLoading(false);
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
      <div style={{ background: '#fff', padding: 32, borderRadius: 8, minWidth: 320, boxShadow: '0 2px 16px rgba(0,0,0,0.15)' }}>
        <h2>Dodaj użytkownika</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <input type="text" placeholder="Imię" value={firstName} onChange={e => setFirstName(e.target.value)} required />
          <input type="text" placeholder="Nazwisko" value={lastName} onChange={e => setLastName(e.target.value)} required />
          <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} required />
          <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
            <button type="submit" disabled={loading} style={{ padding: '8px 16px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 4 }}>
              {loading ? 'Dodawanie...' : 'Dodaj'}
            </button>
            <button type="button" onClick={onClose} style={{ padding: '8px 16px', background: '#eee', border: 'none', borderRadius: 4 }}>
              Anuluj
            </button>
          </div>
        </form>
        {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
        {success && <div style={{ color: 'green', marginTop: 8 }}>Użytkownik dodany!</div>}
      </div>
    </div>
  );
}
