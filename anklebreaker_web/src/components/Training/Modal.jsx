import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles/Modal.css';

function Modal({ isOpen, onClose, className, classEngName, levels }) {
  const bucketUrl = import.meta.env.VITE_BUCKET_URL;
  const [selectedImage, setSelectedImage] = useState('');
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const isMobile = window.innerWidth <= 450;

  // levels가 변경 시 초기화
  useEffect(() => {
    if (levels) {
      setCurrentLevelIndex(0); // 항상 첫 번째 레벨로 초기화
      if (levels[0]?.details?.photos?.[0]) {
        setSelectedImage(`${bucketUrl}/training/${levels[0].details.photos[0]}`);
      }
    }
  }, [levels]);

  // 이미지 업데이트
  useEffect(() => {
    if (levels?.[currentLevelIndex]?.details?.photos?.[0]) {
      setSelectedImage(`${bucketUrl}/training/${levels[currentLevelIndex].details.photos[0]}`);
    }
  }, [currentLevelIndex, levels]);

  if (!isOpen || !levels) return null;

  const handleNavigate = (direction) => {
    if (direction === 'prev' && currentLevelIndex > 0) {
      setCurrentLevelIndex((prev) => prev - 1);
    } else if (direction === 'next' && currentLevelIndex < levels.length - 1) {
      setCurrentLevelIndex((prev) => prev + 1);
    }
  };

  // 터치 시작 지점 저장
  const handleTouchStart = (e) => {
    if (isMobile) {
      setTouchStart(e.touches[0].clientX);
    }
  };

  // 터치 종료 지점 저장 및 방향 판단
  const handleTouchEnd = () => {
    if (isMobile) {
      const diff = touchStart - touchEnd;
  
      if (diff > 50) {
        handleNavigate('next');
      } else if (diff < -50) {
        handleNavigate('prev');
      }
    }
  };

  // 터치 이동 지점 추적
  const handleTouchMove = (e) => {
    setTouchEnd(e.touches[0].clientX);
  };

  const currentLevel = levels[currentLevelIndex];

  return (
    <div
      className="modal-backdrop"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button
        className={`navigation-button ${currentLevelIndex === 0 ? 'hidden' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          handleNavigate('prev');
        }}
      >
        <span className={`material-symbols-rounded ${currentLevelIndex === 0 ? 'hidden' : ''}`}>chevron_left</span><br />
        더 낮은 난이도<br />
        보러가기
      </button>

      <div className="mobile-description">좌우로 슬라이드하여 난이도를 선택해주세요.</div>

      <div
        className="modal-container"
        onClick={(e) => e.stopPropagation()}
        style={{
          backgroundImage: `url(${selectedImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <button className="close-button" onClick={onClose}>
          &times;
        </button>

        <div className="modal-title">
          <img src="/AnkleBreaker.svg" alt="앵클브레이커 로고" />
          <div className="class-name">
            <div className="class-kor">{className}</div>
            <div className="class-eng">{classEngName}</div>
          </div>
        </div>

        <div className="modal-content">
          <div className="info">
            <div className="level" style={{ backgroundColor: currentLevel?.color || 'transparent' }}>
              {currentLevel?.level || ''}
            </div>
            <div>
              <span>수업시간 : </span>
              {currentLevel?.details.schedule?.length
                ? currentLevel.details.schedule
                    .map((item) => `매주 ${item.day} ${item.time}`)
                    .join(' / ')
                : "시간 조정 가능"}
            </div>
            <div>
              <span>수업비 : </span>
              {currentLevel?.details.price?.length
                ? `${new Intl.NumberFormat('ko-KR').format(currentLevel.details.price[0])}원 (월 4회)`
                + (currentLevel.details.price[1] 
                    ? ` / ${new Intl.NumberFormat('ko-KR').format(currentLevel.details.price[1])}원 (월 8회)` 
                    : '')
                : "070-7757-0909로 문의부탁드립니다."}
            </div>
          </div>

          <div className="photos">
            {currentLevel?.details.photos.map((photo, index) => (
              <img
                key={index}
                src={`${bucketUrl}/training/${photo}`}
                alt={`${currentLevel?.level} photo ${index + 1}`}
                onClick={(e) => {
                  e.stopPropagation(); // 이벤트 전파 방지
                  setSelectedImage(`${bucketUrl}/training/${photo}`);
                }}
                style={{
                  cursor: 'pointer',
                  border: selectedImage.includes(photo) ? '2px solid red' : 'none',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <button
        className={`navigation-button ${currentLevelIndex === levels.length - 1 ? 'hidden' : ''}`}
        onClick={(e) => {
          e.stopPropagation();
          handleNavigate('next');
        }}
      >
        <span className="material-symbols-rounded">chevron_right</span><br />
        더 높은 난이도<br />
        보러가기
      </button>
    </div>
  );
}

Modal.propTypes = {
  isOpen: PropTypes.bool,               // 열림 여부 (true/false)
  onClose: PropTypes.func,              // 닫기 핸들러 (함수)
  className: PropTypes.string,          // 클래스명 (문자열)
  classEngName: PropTypes.string,       // 영어 클래스명 (문자열)
  levels: PropTypes.arrayOf(            // 레벨 데이터 (배열)
    PropTypes.shape({
      level: PropTypes.string,          // 레벨명 (문자열)
      color: PropTypes.string,          // 색상 (문자열)
      details: PropTypes.shape({        // 세부 정보 (객체)
        schedule: PropTypes.arrayOf(    // 일정 데이터 (배열)
          PropTypes.shape({
            day: PropTypes.string,      // 요일 (문자열)
            time: PropTypes.string      // 시간 (문자열)
          })
        ),
        price: PropTypes.arrayOf(PropTypes.number), // 가격 (숫자 배열)
        photos: PropTypes.arrayOf(PropTypes.string) // 사진 경로 (문자열 배열)
      })
    })
  )
};


export default Modal;
