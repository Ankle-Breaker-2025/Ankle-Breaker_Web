import './styles/Store.css';
import uniformData from '../../data/uniform.json';

function Store() {
  const bucketUrl = import.meta.env.VITE_BUCKET_URL;
  return(
    <div className="store">
      <div className="section-title">UNIFORM</div>
      <div className="section-description">전태풍 앵클브레이커의 유니폼입니다.</div>
      <div className="section-description-2">유니폼 주문은 070-7757-0909로 연락 부탁드립니다.</div>
      <div className="uniform-list">
        {uniformData.uniforms.map((uniform, index) => (
          <div key={index} className="uniform-card">
            <img src={`${bucketUrl}/store/${uniform.image}`} alt="uniform-image"/>
            <div className="uniform-name">{uniform.name}</div>
            {/* <div className="uniform-price">{new Intl.NumberFormat('ko-KR').format(uniform.price)}원</div> */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Store;