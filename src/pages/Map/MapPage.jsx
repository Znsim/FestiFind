import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MapPage.css';
import searchFestival from '../../api/serachApi';

const MapPage = () => {
  const mapContainer = useRef(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [infowindow, setInfowindow] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [festivalData, setFestivalData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=f5f84770e94a9d71b07534bcbbad07a3&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        const options = {
          center: new window.kakao.maps.LatLng(37.5665, 126.9780),
          level: 3,
        };
        const kakaoMap = new window.kakao.maps.Map(mapContainer.current, options);
        setMap(kakaoMap);
        setInfowindow(new window.kakao.maps.InfoWindow({ zIndex: 1 }));
      });
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleSearch = async () => {
    if (searchTerm) {
      try {
        const festivalData = await searchFestival({
          pageNo: 0,
          contentTypeId: 15,
          keyword: searchTerm,
        });

        if (Array.isArray(festivalData)) {
          setFestivalData(festivalData);
          updateMarkers(festivalData);
        } else {
          console.error('잘못된 데이터 형식:', festivalData);
        }
      } catch (err) {
        console.error('검색 오류:', err);
      }
    }
  };

  // 축제 데이터와 마커를 연결하기 위한 맵 생성
  const festivalMarkerMap = useRef(new Map());

  const updateMarkers = (festivals) => {
    if (!map) return;

    // 기존 마커들 삭제
    markers.forEach(marker => marker.setMap(null));
    setMarkers([]);
    
    // 마커 맵 초기화
    festivalMarkerMap.current.clear();

    // 새로운 마커들 추가
    const newMarkers = festivals.map(festival => {
      const position = new window.kakao.maps.LatLng(
        parseFloat(festival.mapy), 
        parseFloat(festival.mapx)
      );

      const marker = new window.kakao.maps.Marker({ position, map });

      // 마커 클릭 시 인포윈도우 열기 및 상세 페이지로 이동
      window.kakao.maps.event.addListener(marker, 'click', () => {
        // 인포윈도우 내용 설정
        infowindow.setContent(`
          <div style="padding:10px; font-size:14px; color:#000; max-width: 200px;">
            <strong>${festival.title}</strong><br />
            위치: ${festival.addr1 || '정보 없음'}<br />
            기간: ${festival.eventstartdate || '미정'} ~ ${festival.eventenddate || '미정'}
          </div>
        `);
        
        // 인포윈도우 열기
        infowindow.open(map, marker);
        
        // 지도 중심 이동
        map.setCenter(position);
        
        // 상세 페이지로 직접 이동 (더블 클릭 효과 방지를 위한 setTimeout)
        setTimeout(() => {
          navigate(`/festival/${festival.contentid}/15`, {
            state: {
              title: festival.title,
              image: festival.firstimage || festival.firstimage2 || null
            }
          });
        }, 200);
      });

      // 축제 ID와 마커를 맵에 저장
      festivalMarkerMap.current.set(festival.contentid, marker);

      return marker;
    });

    setMarkers(newMarkers);
  };

  // 축제 목록에서 축제 이름을 클릭하면 해당 마커로 지도 이동
  const handleFestivalClick = (festival) => {
    // 저장된 맵에서 contentid로 마커 찾기
    const selectedMarker = festivalMarkerMap.current.get(festival.contentid);
    
    if (selectedMarker) {
      const position = selectedMarker.getPosition();
      
      // 인포윈도우 표시
      infowindow.setContent(`
        <div style="padding:10px; font-size:14px; color:#000; max-width: 200px;">
          <strong>${festival.title}</strong><br />
          위치: ${festival.addr1 || '정보 없음'}<br />
          기간: ${festival.eventstartdate || '미정'} ~ ${festival.eventenddate || '미정'}
        </div>
      `);
      infowindow.open(map, selectedMarker);
      
      // 지도 중심 이동
      map.setCenter(position);
      
      // 줌 레벨 조정 (선택 사항)
      map.setLevel(3);
    } else {
      console.error('선택한 축제의 마커를 찾을 수 없습니다:', festival.contentid);
    }
  };

  // 바로 상세 페이지로 이동하는 함수 (수정된 부분)
  const navigateToDetail = (festival) => {
    // contentTypeId를 명시적으로 URL에 포함시킴
    const detailUrl = `/festivalDetailPage/${festival.contentid}/15`;
    console.log('이동할 URL:', detailUrl);
    navigate(detailUrl, {
      state: {
        title: festival.title,
        image: festival.firstimage || festival.firstimage2 || null
      }
    });
  };

  return (
    <div className="map-page">
      <div className="festival-list">
        <div className="search-box">
          <input
            type="text"
            placeholder="축제 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button onClick={handleSearch}>검색</button>
        </div>
        {festivalData.map((festival) => (
          <div
            key={festival.contentid}
            className="festival-item"
          >
            <div className="festival-info" onClick={() => handleFestivalClick(festival)}>
              <h4>{festival.title}</h4>
              <p>{festival.addr1 || '주소 정보 없음'}</p>
              <p>{festival.eventstartdate || '미정'} ~ {festival.eventenddate || '미정'}</p>
            </div>
            <button 
              className="detail-button"
              onClick={() => navigateToDetail(festival)}
            >
              상세 보기
            </button>
          </div>
        ))}
      </div>
      <div ref={mapContainer} className="map-container"></div>
    </div>
  );
};

export default MapPage;