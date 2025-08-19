import { customMap } from '@/styles/GoogleMaps';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
  border: '2px solid #E2E8F0',
  borderRadius: '1rem',
};

interface GoogleMapComponentProps {
  latitude: number;
  longitude: number;
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({ latitude, longitude }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  if (loadError) {
    return <div>Error loading maps...</div>;
  }
  const center = {
    lat: latitude,
    lng: longitude,
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      options={{
        styles: customMap,
        disableDefaultUI: true,
        zoomControl: true,
        clickableIcons: true,
      }}
    >
      <Marker position={center} />
    </GoogleMap>
  ) : null;
};

export default GoogleMapComponent;
