import { useState } from 'react';
import PropTypes from 'prop-types';
import './styles/CoachCard.css';

function CoachCard({backgroundPosition, image, position, name, subName, player, coach, backImage}) {
  const [isFlipped, setIsFlipped] = useState(false);

  const toggleFlip = () => {
    setIsFlipped((prev) => !prev);
  };
  
  return(
    <div
      className = {`coach-card ${isFlipped ? 'is-flipped' : ''}`}
      onClick = {toggleFlip}
    >
      <div className="card-inner">
        {/* 카드 앞면 */}
        <div
          className="card-front"
          style={{
            backgroundImage: `url(${import.meta.env.VITE_BUCKET_URL}/Background.webp)`,
            backgroundPosition: backgroundPosition, 
          }}
        >
          <div className="card-content">
            <img src={image} alt={name}/>
            <div className="info">
              <div className="position">{position}</div>
              <div className="divider"></div>
              <div className="text-content">
                <div className="name">{name}</div>
                <div className="subName">{subName}</div>
              </div>
            </div>
          </div>
        </div>

        {/* 카드 뒷면 */}
        <div
          className="card-back"
          style={{
            backgroundImage: `url(${import.meta.env.VITE_BUCKET_URL}/Background.webp)`,
            backgroundPosition: backgroundPosition, 
          }}
        >
          <img src={backImage}></img>
          <div className="info-back">
            <div className="coach-name">
              <div className="name">{name}</div>
              <div className="eng-name">{subName}</div>
            </div>

            <div className="player">
              <div className="section-title">PLAYER</div>
              <div className="section-contents">
                {(player || []).map((line, index)=> (
                  <div key={index}>{line}</div>
                ))}
              </div>
            </div>

            <div className="coaching">
              <div className="section-title">COACH</div>
              <div className="section-contents">
                {(coach || []).map((line, index)=> (
                  <div key={index}>{line}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

CoachCard.propTypes = {
  backgroundPosition: PropTypes.string.isRequired, // 문자열 타입, 필수
  image: PropTypes.string.isRequired, // 문자열 타입, 필수
  position: PropTypes.string.isRequired, // 문자열 타입, 필수
  name: PropTypes.string.isRequired, // 문자열 타입, 필수
  subName: PropTypes.string, // 문자열 타입, 선택적
  player: PropTypes.arrayOf(PropTypes.string).isRequired, // 문자열 배열, 필수
  coach: PropTypes.arrayOf(PropTypes.string).isRequired, // 문자열 배열, 필수
  backImage: PropTypes.string.isRequired, // 문자열 타입, 필수
};

export default CoachCard;