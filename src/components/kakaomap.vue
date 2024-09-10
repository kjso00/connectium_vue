<template>
    <div style="width: 100%; height: 400px;">
      <div id="map" style="width: 100%; height: 100%;"></div>
      <button @click="showDirections">Show Directions</button>
    </div>
  </template>
  
  <script>
  import { onMounted, ref } from 'vue';
  
  export default {
    name: 'KakaoMap',
    setup() {
      const map = ref(null);
      const userMarker = ref(null);
      const destinationMarker = ref(null);
  
      const destination = {
        lat: 37.5665,
        lng: 126.9780
      };
  
      const loadKakaoMaps = () => {
        return new Promise((resolve) => {
          if (window.kakao && window.kakao.maps) {
            resolve();
          } else {
            const script = document.createElement('script');
            script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=9f647a199751b8c18f579fff34313544&autoload=false&libraries=services`;
            script.onload = () => {
              window.kakao.maps.load(() => {
                resolve();
              });
            };
            document.head.appendChild(script);
          }
        });
      };
  
      const initMap = () => {
        const container = document.getElementById('map');
        const options = {
          center: new window.kakao.maps.LatLng(destination.lat, destination.lng),
          level: 3
        };
  
        map.value = new window.kakao.maps.Map(container, options);
  
        destinationMarker.value = new window.kakao.maps.Marker({
          position: new window.kakao.maps.LatLng(destination.lat, destination.lng),
          map: map.value
        });
  
        // 사용자의 현재 위치 표시
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userLat = position.coords.latitude;
              const userLng = position.coords.longitude;
              const userPosition = new window.kakao.maps.LatLng(userLat, userLng);
  
              userMarker.value = new window.kakao.maps.Marker({
                position: userPosition,
                map: map.value
              });
  
              // 지도의 중심을 사용자 위치로 이동
              map.value.setCenter(userPosition);
            },
            (error) => {
              console.error("Error getting user's location:", error);
            }
          );
        }
      };
  
      const showDirections = () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const userLat = position.coords.latitude;
              const userLng = position.coords.longitude;
              const userPosition = new window.kakao.maps.LatLng(userLat, userLng);
  
              // 길찾기 서비스 생성
              const directions = new window.kakao.maps.services.Directions();
  
              directions.route({
                origin: userPosition,
                destination: new window.kakao.maps.LatLng(destination.lat, destination.lng),
                waypoints: [],
                priority: "RECOMMEND",
                method: "TRANSIT", // 대중교통 기준 (필요에 따라 변경 가능)
              }, (result, status) => {
                if (status === window.kakao.maps.services.Status.OK) {
                  // 경로 그리기
                  const polyline = new window.kakao.maps.Polyline({
                    path: result[0].path,
                    strokeWeight: 5,
                    strokeColor: '#DB4040',
                    strokeOpacity: 0.7,
                    strokeStyle: 'solid'
                  });
                  polyline.setMap(map.value);
  
                  // 지도 범위를 경로에 맞게 조정
                  const bounds = new window.kakao.maps.LatLngBounds();
                  result[0].path.forEach(point => bounds.extend(point));
                  map.value.setBounds(bounds);
                }
              });
            },
            (error) => {
              console.error("Error getting user's location:", error);
            }
          );
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      };
  
      onMounted(async () => {
        await loadKakaoMaps();
        initMap();
      });
  
      return {
        showDirections
      };
    }
  };
  </script>