import { useState } from 'react';

interface Props {
  onClose: () => void;
}

export default function PasswordModal({ onClose }: Props) {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  function handleUnlock() {
    setMessage('incorrect password');
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="password-modal-title">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} aria-hidden="true" />
      <div className="relative bg-white border border-black/10 rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.15)] max-w-md w-full mx-6 p-8 animate-[bubble-in_0.25s_ease-out]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full bg-black/[0.05] text-[#666] hover:bg-black/[0.08] hover:text-[#1d1d1f] transition-all duration-200 cursor-pointer text-[14px] leading-none"
          aria-label="Close"
        >
          &times;
        </button>
        <h3 id="password-modal-title" className="text-[20px] font-semibold text-[#1d1d1f] tracking-tight">Enter password</h3>
        <p className="mt-2 text-[14px] text-[#666] leading-[1.6]">
          This case study is gated. Please contact Leia to request the password.
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (message) setMessage('');
          }}
          onKeyDown={(e) => { if (e.key === 'Enter') handleUnlock(); }}
          placeholder="password"
          autoFocus
          className="mt-6 w-full px-4 py-3 rounded-xl border border-black/10 bg-black/[0.02] text-[#1d1d1f] text-[15px] outline-none focus:border-black/30 transition-colors placeholder:text-[#888]"
        />
        {message && <p className="mt-3 text-[14px] text-[#c0392b] font-medium">{message}</p>}
        <button
          onClick={handleUnlock}
          className="mt-4 w-full py-3 rounded-full bg-[#1d1d1f] text-white font-medium text-[15px] hover:bg-[#424245] transition-all duration-200 active:scale-[0.98] cursor-pointer"
        >
          unlock
        </button>
      </div>
    </div>
  );
}
