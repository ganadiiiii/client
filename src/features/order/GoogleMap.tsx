import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useRef} from "react";
import currentpositionSvg from "../../assets/order/currentposition.svg";

const containerStyle = {
	width: "100%",
	height: "100%",
	borderRadius: "1.25em",
	overflow: "hidden",
};

const center = {
	lat: 37.4979511,
	lng: 127.0276182,
}; // 나중에 시간 나면 현재 위치로 변경?

export default function GoogleMapComponent() {
	const { isLoaded, loadError } = useJsApiLoader({
		id: "google-map-script",
		googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
	});

	const mapRef = useRef<google.maps.Map | null>(null);

	const onLoad = useCallback((mapInstance: google.maps.Map) => {
		mapRef.current = mapInstance;
	}, []);

	const onUnmount = useCallback(() => {
		mapRef.current = null;
	}, []);

	// 에러 체크
	if (loadError) {
		console.error("Google Maps API 로드 에러:", loadError);
		return <div>Google Maps를 로드할 수 없습니다.</div>;
	}

	// API 키 체크
	if (!import.meta.env.VITE_GOOGLE_MAPS_API_KEY) {
		console.error("VITE_GOOGLE_MAPS_API_KEY가 설정되지 않았습니다.");
		return <div>Google Maps API 키가 설정되지 않았습니다.</div>;
	}

	const handleCurrentLocation = () => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				const userLocation = {
					lat: position.coords.latitude,
					lng: position.coords.longitude,
				};
				mapRef.current?.panTo(userLocation);
			});
		}
	};

	if (!isLoaded) {
		return (
			<div
				className="flex items-center justify-center bg-gray-100 rounded-[1.25em]"
				style={{ width: "100%", height: "31em" }}
			>
				<div className="text-gray-500">Google Maps 로딩 중...</div>
			</div>
		);
	}

	return (
		<div className="flex items-center justify-center relative bg-white rounded-[1.25em] p-[1.875em] w-[52em] h-[31em]">
			<GoogleMap
				mapContainerStyle={containerStyle}
				center={center}
				zoom={16}
				onLoad={onLoad}
				onUnmount={onUnmount}
				options={{
					disableDefaultUI: true,
				}}
			>
				{/* 구글맵 내부에 필요한 마커, 오버레이 등을 추가 가능 */}
			</GoogleMap>

			{/* 현재 위치 버튼 */}
			<button
				onClick={handleCurrentLocation}
				className="absolute bottom-12 right-12 z-10 bg-white rounded-full p-4 w-18.5 h-18.5"
				style={{
					boxShadow: "0 2.846px 9.962px 0 rgba(0, 0, 0, 0.2)",
				}}
			>
				<img
					src={currentpositionSvg}
					alt="현재 위치로 이동"
					className="w-10 h-10"
				/>
			</button>
		</div>
	);
}
