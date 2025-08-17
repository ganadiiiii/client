import React, { useState, useEffect } from 'react';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav>
      {/* 배경 이미지 영역: 항상 보이도록 */}
      <div className="absolute top-0 left-0 w-full h-[579px] z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('./src/assets/nav_bg.png')" }} />

      {/* 상단 바만 배경색이 변경되도록 분리 */}
      <div className={`fixed top-0 left-0 w-full z-10 transition-all duration-300 ease-in-out
        ${isScrolled ? 'bg-[#FCFBF6] h-[102px]' : 'bg-transparent h-[102px]'}
        flex items-center justify-between px-8
      `}>
      
          {/* 로고 영역 - 좌우 300px 간격 */}
        <div className="flex items-center" style={{ marginLeft: '300px' }}>
          <img 
            src="./src/assets/logo.png" 
            alt="Logo" 
            className={`transition-all duration-1000 ease-in-out h-12 w-auto`}
          />
        </div>
        
        {/* 중앙 메뉴 - 50px 간격 */}
        <div className="hidden md:flex items-center" style={{ gap: '50px' }}>
          <a href="#" className="hover:opacity-70 transition-opacity" style={{
            color: 'rgba(90, 90, 90, 0.8)',
            fontFamily: 'SUIT-Regular',
            fontSize: '17px',
            fontWeight: '700',
            lineHeight: 'normal'
          }}>
            Shop
          </a>
          <a href="#" className="hover:opacity-70 transition-opacity" style={{
            color: 'rgba(90, 90, 90, 0.8)',
            fontFamily: 'SUIT-Regular',
            fontSize: '17px',
            fontWeight: '700',
            lineHeight: 'normal'
          }}>
            Customizing
          </a>
          <a href="#" className="hover:opacity-70 transition-opacity" style={{
            color: 'rgba(90, 90, 90, 0.8)',
            fontFamily: 'SUIT-Regular',
            fontSize: '17px',
            fontWeight: '700',
            lineHeight: 'normal'
          }}>
            Brand
          </a>
          <a href="#" className="hover:opacity-70 transition-opacity" style={{
            color: 'rgba(90, 90, 90, 0.8)',
            fontFamily: 'SUIT-Regular',
            fontSize: '17px',
            fontWeight: '700',
            lineHeight: 'normal'
          }}>
            Archive
          </a>
        </div>
        
        {/* 우측 메뉴 - 300px 간격 */}
        <div className="flex items-center space-x-6" style={{ marginRight: '300px', gap: '70px' }}>
          <a href="#" className="hover:opacity-70 transition-opacity" style={{
            color: '#646464',
            fontFamily: 'SUIT-Regular',
            fontSize: '17px',
            fontWeight: '500',
            lineHeight: 'normal'
          }}>
            Login
          </a>
          <a href="#" className="hover:opacity-70 transition-opacity" style={{
            color: '#646464',
            fontFamily: 'SUIT-Regular',
            fontSize: '17px',
            fontWeight: '500',
            lineHeight: 'normal'
          }}>
            Cart
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
