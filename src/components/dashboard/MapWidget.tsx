import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Card } from '../ui/Card';
import L from 'leaflet';

// Fix for default marker icon in React Leaflet
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Icons
const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-violet.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const vanIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export function MapWidget() {
  const position: [number, number] = [40.7128, -74.0060]; // NY coordinates

  return (
    <Card className="h-full min-h-[400px] relative overflow-hidden p-0 border-0" title="">
       <div className="absolute top-4 left-4 z-[1000] bg-card/90 backdrop-blur-md p-3 rounded-xl border border-white/10 shadow-xl">
          <h3 className="text-white font-semibold text-sm">Real-Time Tracking</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
            <span className="text-xs text-text-secondary">Active Drivers: 12</span>
          </div>
       </div>

      <MapContainer 
        center={position} 
        zoom={13} 
        scrollWheelZoom={false} 
        style={{ height: '100%', width: '100%', borderRadius: '1rem' }}
        zoomControl={false}
      >
        {/* Dark Matter Tile Layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        <Marker position={position} icon={userIcon}>
          <Popup>Your Location</Popup>
        </Marker>

        {/* Simulated Vans */}
        <Marker position={[40.7228, -74.0160]} icon={vanIcon} />
        <Marker position={[40.7028, -73.9960]} icon={vanIcon} />
        <Marker position={[40.7158, -74.0260]} icon={vanIcon} />
      </MapContainer>
    </Card>
  );
}
