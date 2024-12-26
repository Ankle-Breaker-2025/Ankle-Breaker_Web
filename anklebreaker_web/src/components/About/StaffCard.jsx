import PropTypes from 'prop-types';
import aboutData from '../../data/coachs.json';
import './styles/StaffCard.css'

function StaffCard( {backgroundPosition} ){
  return(
    <div 
      className="staff-card"
      style={{
        backgroundImage: `url(${import.meta.env.VITE_BUCKET_URL}/Background.webp)`,
        backgroundPosition: backgroundPosition,
      }}
    >
      <div className="card-header">
        <div className="card-title">STAFF</div>
        <div className="line"></div>
      </div>

      <div className="card-contents">
        {aboutData.staff.map((item, index) => (
          <div key={index} className="staff">
            <div className="name">
              <div className="korName">{item.kor_name}</div>
              <div className="engName">{item.eng_name}</div>
            </div>
            <div className="position">{item.position}</div>
          </div>
        ))}
      </div>

    </div>
  );
}

StaffCard.propTypes = {
  backgroundPosition: PropTypes.string.isRequired, // 문자열 타입, 필수
};

export default StaffCard;