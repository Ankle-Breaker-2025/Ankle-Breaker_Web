import './styles/Footer.css';
import { useState, useEffect } from 'react';
import { FaInstagram, FaYoutube } from 'react-icons/fa';
import companyData from './data.json';

function Footer() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 450);

  // 화면 크기 변경 감지
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 450);
    };

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener('resize', handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return(
    <div className="footer">
      <div className="contents">
          <div className="info">
            상호 : {companyData.company_info.business_name} {isMobile?<br/>:'|'} 대표자명 : {companyData.company_info.representative_name}<br/>
            사업자 등록번호 : {companyData.company_info.business_registration_number}<br/>
            연락처 : {companyData.company_info.contact_number} {isMobile?<br/>:'|'} 이메일 : {companyData.company_info.email}<br/>
            주소 : {companyData.company_info.address}
            <div className="sns">
              <a href="https://www.instagram.com/chontaepoong_anklebreaker/" target="_blank" rel="noopener noreferrer">
                <FaInstagram className="icon-instagram" size="30"/>
              </a>
              <a href="https://www.youtube.com/@taepoong3" target="_blank" rel="noopener noreferrer">
                <FaYoutube className="icon-youtube" size="30"/>
              </a>
            </div>
          </div>
          <div className="logo">
            <img src={`${import.meta.env.VITE_BUCKET_URL}/footer/footer_logo.png`} alt="Footer Logo" />
          </div>
        </div>
        <div className="license">
          © 2025 ANKLE BREAKER All right Reserved.
        </div>
    </div>
  )
}

export default Footer;