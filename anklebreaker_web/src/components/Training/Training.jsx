import './styles/Training.css';
import {useState, useRef, useEffect} from 'react';
import trainingData from '../../data/training.json';
import Modal from './Modal.jsx';

function Training() {
  const [classData] = useState(trainingData.classes);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden'; // 배경 페이지 스크롤 막기
      document.addEventListener('touchmove', preventScroll, { passive: false }); // 모바일 드래그 막기
    } else {
      document.body.style.overflow = ''; // 원래 상태로 복구
      document.removeEventListener('touchmove', preventScroll);
    }
  
    return () => {
      document.body.style.overflow = ''; // Cleanup
      document.removeEventListener('touchmove', preventScroll);
    };
  }, [isModalOpen]);
  
  const preventScroll = (e) => {
    e.preventDefault(); // 터치 이벤트 차단
  };

  const handleNext = () => {
    if(sliderRef.current) {
      sliderRef.current.scrollBy({left:300, behavior:'smooth'});
    }
  };

  const handlePrev = () => {
    if(sliderRef.current) {
      sliderRef.current.scrollBy({left:-300, behavior:'smooth'});
    }
  };

  const handleCardClick = (classItem) => {
    setSelectedClass(classItem);
    setIsModalOpen(true);
  }

  return(
    <div className="training">
      <div className="class-card-section">
        <div className="card-slider" ref={sliderRef}>
          {classData.map((classItem) => (
            <div
              className="class-card"
              key={classItem.name}
              onClick={() => handleCardClick(classItem)}
              style={{
                backgroundImage: `url(${import.meta.env.VITE_BUCKET_URL}/training/${classItem.levels[0].details.photos[0]})`
              }}
            >
              <div className="levels">
                {classItem.levels.map((level) => (
                  <div
                    key={level.level}
                    className="level"
                    style={{backgroundColor: level.color}}
                  >
                    {level.level}
                  </div>
                ))}
              </div>
              <div className="class-name">
                <div className="class-kor-name">{classItem.name}</div>
                <div className="class-eng-name">{classItem.engname}</div>
              </div>
            </div>
          ))}
        </div>

        {/* 버튼 */}
        <div className="buttons">
          <button className="prev" onClick={handlePrev}>
            <span className="material-symbols-rounded">chevron_left</span>
          </button>
          <button className="next" onClick={handleNext}>
            <span className="material-symbols-rounded">chevron_right</span>
          </button>
        </div>
      </div>

      <div className="timetable">
        <img src={`${import.meta.env.VITE_BUCKET_URL}/training/new_time_table.webp`} alt="timetable"/>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        className={selectedClass?.name}
        classEngName={selectedClass?.engname}
        levels={selectedClass?.levels}
      />
    </div>
  )
}

export default Training;