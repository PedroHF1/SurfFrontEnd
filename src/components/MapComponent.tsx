import { customMap } from '@/styles/GoogleMaps';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
  border: '2px solid #E2E8F0',
};

interface GoogleMapComponentProps {
markers: { lat: number; lng: number }[]
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({markers}: GoogleMapComponentProps) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  if (loadError) {
    return <div>Error loading maps...</div>;
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{lat: markers[0].lat, lng: markers[0].lng}}
      zoom={markers.length > 1 ? 10 : 14}
      options={{
        styles: customMap,
        disableDefaultUI: true,
        zoomControl: true,
        clickableIcons: true,
      }}
    >
       {markers.map((marker, index) => (
        <Marker key={index} position={marker} />
      ))}
    </GoogleMap>
  ) : null;
};

export default GoogleMapComponent;
