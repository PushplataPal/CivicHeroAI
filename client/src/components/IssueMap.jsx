import { useEffect, useState } from "react";
import axios from "axios";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";

function ChangeView({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.flyTo(center, 15);
    }
  }, [center, map]);

  return null;
}

function IssueMap() {
  const [issues, setIssues] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    fetchIssues();

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation([
          position.coords.latitude,
          position.coords.longitude,
        ]);
      },
      (error) => {
        console.log(error);
      }
    );
  }, []);

  const fetchIssues = async () => {
    try {
      const res = await axios.get(
        "https://civichero-ai-backend.onrender.com/api/issues"
      );

      setIssues(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ margin: "30px 0" }}>
      <h2>Community Issue Map 🗺️</h2>

      <MapContainer
        center={currentLocation || [26.8467, 80.9462]}
        zoom={12}
        style={{
          height: "500px",
          width: "100%",
          borderRadius: "12px",
        }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {currentLocation && (
          <>
            <ChangeView center={currentLocation} />

            <Marker position={currentLocation}>
              <Popup>
                📍 Your Current Location
              </Popup>
            </Marker>
          </>
        )}

        {issues.map((issue) => {
          if (
            !issue.location ||
            !issue.location.includes(",")
          ) {
            return null;
          }

          const [lat, lng] =
            issue.location.split(",");

          const latitude = parseFloat(lat.trim());
          const longitude = parseFloat(lng.trim());

          if (
            isNaN(latitude) ||
            isNaN(longitude)
          ) {
            return null;
          }

          return (
            <Marker
              key={issue._id}
              position={[latitude, longitude]}
            >
              <Popup>
                <h3>{issue.title}</h3>

                <p>{issue.description}</p>

                <p>
                  <b>Category:</b> {issue.category}
                </p>

                <p>
                  <b>Severity:</b> {issue.severity}
                </p>

                <p>
                  <b>Upvotes:</b>{" "}
                  {issue.upvotes || 0} 👍
                </p>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default IssueMap;