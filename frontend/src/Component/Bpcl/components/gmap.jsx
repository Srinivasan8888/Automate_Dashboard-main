import React from 'react';
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

const position = { lat: 12.99106444004221, lng: 80.24291367574763 };

function MyMapComponent() {
  return (
    <div className="h-96 w-full rounded-lg">
      <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
        <Map
          center={position}
          zoom={16}
          options={{
            zoomControl: true,     
            mapTypeControl: false, 
            scaleControl: true,     
            streetViewControl: false,
            rotateControl: true,   
            fullscreenControl: true 
          }}
        >
          <Marker position={position} />
        </Map>
      </APIProvider>
    </div>
  );
}

export default React.memo(MyMapComponent);
