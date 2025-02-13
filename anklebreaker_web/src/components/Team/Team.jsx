import './styles/Team.css';
import { useEffect, useRef, useState } from 'react';
import teamData from '../../data/team.json';

function Team() {
  const bucketUrl = import.meta.env.VITE_BUCKET_URL;
  const sliderRef = useRef(null);
  const [selectedTeam, setSelectedTeam] = useState('U15');
  const [bannerUrl, setBannerUrl] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 1000);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 1000);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const url = isMobile
      ? `${bucketUrl}/team/team_banner.webp`
      : `${bucketUrl}/team/team_banner.webp`;

      setBannerUrl(url);
  }, [isMobile]);

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
    <div className="team">
      {/* 배너 */}
      <div className="banner" style={{backgroundImage:`url(${bannerUrl})`}}/>

      {/* 버튼영역 */}
      <div className="team-buttons">
        {Object.keys(teamData).map((team) => (
          <button key={team} onClick={() => setSelectedTeam(team)} className={`team-button ${selectedTeam === team ? 'selected' : ''}`}>{team}</button>
        ))}
      </div>

      {/* 팀 사진 */}
      <h2>{selectedTeam} 선수단</h2>
      <div className="team-pic">
        {teamData[selectedTeam].pictures.length > 0 ? (
          <div className="image-slider">
            <div className="images" ref={sliderRef}>
              {teamData[selectedTeam].pictures.map((src, index) => (
                <img key={index} src={`${bucketUrl}/${src}`} alt={`${selectedTeam} 이미지-${index + 1}`} />
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
        ) : null }
      </div>

      {/* 팀 리스트 */}
      <div className="team-list">
        {teamData[selectedTeam].players.length > 0 ? (
          <div className="player-list">
            {teamData[selectedTeam].players.map((player, index) => (
              <div key={index} className="player">
                <div>{player.number} / {player.position}</div>
                <div className="player-name">{player.name}</div>
              </div>
            ))}
          </div>
        ) : (
          <p>해당하는 선수단이 없습니다.</p>
        )}
      </div>

      {/* 팀 경기정보 */}
      <div
        className="team-match"
        style={{
          backgroundImage: `url(${bucketUrl}/Background.webp)`,
          backgroundPosition: "0px 0px"
        }}
      >
        <div className="section">
          <div className="section-title">Upcoming Matches</div>
          <div className="section-contents">
            <div className="match">
            {teamData[selectedTeam].matches.length > 0 ? (
              <>
                {teamData[selectedTeam].matches.map((match, idx)=>(
                  <div key={idx} className="match-card">
                    <div className="match-info">
                      <div className="datetime">{match.datetime}</div>
                      <div className="location">{match.location}</div>
                    </div>
                    <div className="match-name">{match.match}</div>
                  </div>
                ))}
              </>
            ) : ( <div className="no-data"> 예정된 경기가 없습니다. </div>)}
            </div>
          </div>
        </div>
        <div className="section">
          <div className="section-title">Achievements</div>
          <div className="section-contents">
            <div className="match">
              {teamData[selectedTeam].achievements.length > 0 ? (
              <>
                {teamData[selectedTeam].achievements.map((achievement, idx)=>(
                  <div key={idx} className="match-card">
                    <div className="datetime">{achievement.datetime}</div>
                    <div className="match-name">{achievement.match}</div>
                  </div>
                ))}
              </>
            ) : ( <div className="no-data"> 수상 내역이 없습니다. </div>)}
            </div>
          </div>
        </div>
      </div>

      
    </div>
  )
}

export default Team;
