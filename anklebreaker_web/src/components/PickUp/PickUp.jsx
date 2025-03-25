import './styles/PickUp.css';
import PickUpData from '../../data/game.json';
import { useRef } from 'react';

function PickUp() {
  const bucketUrl = import.meta.env.VITE_BUCKET_URL;
  
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
    <div className="pickup">
      <div className="how">
        <h3>픽업게임 신청 방법</h3>
        <div className="how-detail" ref={sliderRef}>
          {PickUpData.steps.map((step, index) => (
            <div key={index} className="how-step">
              <img src={`${bucketUrl}/game/${step.image}`} alt="step-image"/>
              <p>{step.step}</p>
            </div>
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
  )
}

export default PickUp;