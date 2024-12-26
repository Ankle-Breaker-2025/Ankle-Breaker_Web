import './styles/About.css';
import {useRef} from 'react';
import CoachCard from './CoachCard.jsx';
import StaffCard from './StaffCard.jsx';
import aboutData from '../../data/coachs.json';
import gymData from '../../data/company.json';

function About() {
  const sliderRef = useRef(null);

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

  return(
    <div className="about">
      <div className="section">
        <div className="section-title">COACH & STAFF</div>
        <div className="section-description">전태풍 앵클브레이커의 코치와 스태프를 소개합니다.</div>
        <div className="section-description-2">카드를 클릭하여 코치의 이력을 살펴보세요.</div>
        <div className="card-wrapper">
          {aboutData.coach.map((item, index) => (
            <CoachCard
              key={index}
              backgroundPosition={item.background_position}
              image={`${import.meta.env.VITE_BUCKET_URL}/${item.image}`}
              position={item.position}
              name={item.name}
              subName={item.sub_name}
              player={item.career_player}
              coach={item.career_coach}
              backImage={`${import.meta.env.VITE_BUCKET_URL}/${item.back_image}`}
            />
          ))}
          <StaffCard
            backgroundPosition="600px 450px"
          />
        </div>
      </div>

      <div className="section">
        <div className="section-title">GYM</div>
        <div className="section-description">{gymData.company_info.address} (주차 가능)</div>
        <div className="image-slider">
          <div className="images" ref={sliderRef}>
            {gymData.company_info.images.map((src, index) => (
              <img key={index} src={`${import.meta.env.VITE_BUCKET_URL}/${src}`} alt={`체육관 이미지-${index + 1}`}/>
            ))}
          </div>
          <div className="buttons">
            <button className="prev" onClick={handlePrev}>
              <span className="material-symbols-rounded">chevron_left</span>
            </button>
            <button className="next" onClick={handleNext}>
              <span className="material-symbols-rounded">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About;