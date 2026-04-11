import { useState } from 'react';

interface Props {
  onClose: () => void;
}

export default function PasswordModal({ onClose }: Props) {
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  function handleUnlock() {
    setMessage('coming soon — check back later!');
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-[#1d1d1f]/30 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-white rounded-2xl shadow-[0_8px_60px_rgba(0,0,0,0.1)] max-w-md w-full mx-6 p-8 animate-[bubble-in_0.25s_ease-out]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full bg-[#f5f5f7] text-[#86868b] hover:bg-[#e8e8ed] hover:text-[#1d1d1f] transition-all duration-200 cursor-pointer text-[14px] leading-none"
          aria-label="Close"
        >
          &times;
        </button>
        <h3 className="text-[20px] font-semibold text-[#1d1d1f] tracking-tight">enter password</h3>
        <p className="mt-2 text-[14px] text-[#86868b] leading-[1.6]">
          this case study is gated. if you were given a link, it may include the password automatically.
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="password"
          className="mt-6 w-full px-4 py-3 rounded-xl border border-[#d2d2d7] bg-[#f5f5f7] text-[#1d1d1f] text-[15px] outline-none focus:border-[#86868b] transition-colors"
        />
        {message && <p className="mt-3 text-[14px] text-[#86868b] font-medium">{message}</p>}
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
