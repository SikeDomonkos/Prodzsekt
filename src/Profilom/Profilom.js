import { useState, useEffect } from "react";
import { useParams } from "react-router-dom"; // ID paraméter URL-ből
import "./Profilom.css";

const Profile = () => {
  const { id } = useParams(); // URL-ből kapott ID
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`https://localhost:7285/auth/profile/${id}`)// Fetch API használata
      .then((response) => {
        if (!response.ok) {
          throw new Error("Hiba történt az adatok lekérésekor!");
        }
        return response.json();
      })
      .then((data) => {
        setProfile(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="loading">🔄 Betöltés...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="profile-card">
      <img src={profile.avatar} alt="Profilkép" className="profile-image" />
      <h2>{profile.name}</h2>
      <p><strong>Email:</strong> {profile.email}</p>
    
    </div>
  );
};

export default Profile;
