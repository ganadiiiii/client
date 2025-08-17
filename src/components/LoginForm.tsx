import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 로그인 로직 구현
    console.log('Login attempted with:', { email, password });
  };

  return (
    <div className="flex items-start justify-center min-h-screen px-4 pt-[100px]">
      <div className="w-full max-w-6xl">
        {/* 로그인 제목과 데코레이션 라인 */}
        <div className="flex items-center justify-center mb-12">
          {/* 왼쪽 분홍색 파선 */}
          <div className="flex items-center space-x-2" style={{ width: '450px' }}>
            {Array.from({ length: 30 }, (_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-[#FFD1D4] rounded-full"
              />
            ))}
          </div>
          
          {/* 로그인 제목 */}
          <h1 className="px-8 text-nowrap" style={{
            color: '#C69FD4',
            fontFamily: 'BagelFatOne-Regular',
            fontSize: '36px',
            fontWeight: '400',
            lineHeight: 'normal'
          }}>
            CUSTOMER LOGIN
          </h1>
          
          {/* 오른쪽 분홍색 파선 */}
          <div className="flex items-center space-x-2" style={{ width: '450px' }}>
            {Array.from({ length: 30 }, (_, i) => (
              <div
                key={i}
                className="w-2 h-2 bg-[#FFD1D4] rounded-full"
              />
            ))}
          </div>
        </div>
        
        {/* 로그인 폼 */}
        <div className="flex justify-center">
          <form onSubmit={handleSubmit} className="space-y-6 w-full max-w-3xl">
          {/* Email 입력 */}
          <div>
            <label htmlFor="email" className="block text-2xl font-bold text-[#000000] mb-3" style={{ fontFamily: 'NEXON Lv1 Gothic OTF' }}>
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-4 border-2 border-gray-300/60 rounded bg-white text-lg focus:outline-none focus:border-gray-400 transition-colors"
              style={{ fontFamily: 'NEXON Lv1 Gothic OTF' }}
            />
          </div>
          
          {/* Password 입력 */}
          <div>
            <label htmlFor="password" className="block text-2xl font-bold text-[#000000] mb-3" style={{ fontFamily: 'NEXON Lv1 Gothic OTF' }}>
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-4 border-2 border-gray-300/60 rounded bg-white text-lg focus:outline-none focus:border-gray-400 transition-colors"
              style={{ fontFamily: 'NEXON Lv1 Gothic OTF' }}
            />
          </div>
          
          {/* 버튼들 */}
          <div className="flex gap-4 pt-4">
            {/* Sign in 버튼 */}
            <button
              type="button"
              className="flex-1 py-4 rounded hover:bg-gray-300 transition-colors"
              style={{
                paddingLeft: '50px',
                paddingRight: '50px',
                backgroundColor: '#EDEDED',
                color: '#000000',
                fontFamily: 'NEXON Lv1 Gothic OTF',
                fontSize: '24px',
                fontWeight: '700',
                lineHeight: 'normal'
              }}
            >
              Sign in
            </button>
            
            {/* Create Account 버튼 */}
            <button
              type="button"
              onClick={() => navigate('/signup')}
              className="flex-1 py-4 rounded hover:bg-pink-300 transition-colors"
              style={{
                paddingLeft: '50px',
                paddingRight: '50px',
                backgroundColor: '#FFD1D4',
                color: '#000000',
                fontFamily: 'NEXON Lv1 Gothic OTF',
                fontSize: '24px',
                fontWeight: '700',
                lineHeight: 'normal'
              }}
            >
              Create Account
            </button>
          </div>
          
          {/* Reset password 링크 */}
          <div className="text-center pt-4">
            <a 
              href="#" 
              className="hover:text-gray-700 transition-colors"
              style={{
                color: '#999999',
                fontFamily: 'NEXON Lv1 Gothic OTF',
                fontSize: '24px',
                fontWeight: '300',
                lineHeight: 'normal'
              }}
            >
              Forgot your password
            </a>
          </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
