import './styles/Home.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import philosophyData from '../../data/philosophy.json';

function Home() {
  const bucketUrl = import.meta.env.VITE_BUCKET_URL;
  const navigate = useNavigate();

  const [bannerUrl, setBannerUrl] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);

  // 화면 크기 변경 감지
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    // 리사이즈 이벤트 리스너 추가
    window.addEventListener('resize', handleResize);

    // 컴포넌트 언마운트 시 이벤트 리스너 제거
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // 배너 이미지 동적 URL 설정
  useEffect(() => {
    const url = isMobile
      ? `${bucketUrl}/home/home_banner_web.webp` // 모바일용 배너
      : `${bucketUrl}/home/home_banner_web.webp`; // 데스크톱용 배너

    setBannerUrl(url);
  }, [isMobile, bucketUrl]);

  // 로딩 상태 처리
  if (!bannerUrl) {
    return <p>Loading banner...</p>;
  }

  const handleNavigation = () => {
    navigate('/training');
  };

  // 렌더링
  return (
    <div className="home">
      {/* 배너 */}
      <div className="banner">
        <img src={bannerUrl} alt="배너 이미지" className="banner-image"/>
        <div className="banner-content">
          <div className="slogan">FROM BASICS TO BRILLIANCE.</div>
          <button onClick={handleNavigation} className="go-training">수업 확인하기</button>
        </div>
      </div>

      {/* 섹션 구분선 */}
      <div className="section-divider">
        <div className="triangle"></div>
      </div>

      {/* Philosophy Section */}
      <div className="philosophy-section">
        <div className="section-title">OUR PHILOSOPHY</div>
        <div className="section-description">전태풍 앵클브레이커는 다음의 4가지 원칙에 따라 농구를 가르칩니다.</div>

        <div className="section-contents">
          {philosophyData.philosophy.map((item, index) => (
            <div className="philosophy-card" key={index}>
              <div className="card-philosophy">{item.title}</div>
              <div className="card-description">
                {item.description.map((line, lineIndex) => (
                  <p key={lineIndex}>{line}</p>
                ))}
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </div>
  );
}

export default Home;