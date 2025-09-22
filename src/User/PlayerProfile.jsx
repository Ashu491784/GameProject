import { useState, useEffect } from "react";
import { auth, database } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { ref, get } from "firebase/database";

const PlayerProfile = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);   

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          const userRef = ref(database, `users/${user.uid}`);
          const snapshot = await get(userRef);

          if (snapshot.exists()) {
            setUserData(snapshot.val());
          } else {
            console.log("No user data found!");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else {
        setUserData(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <p>Loading profile...</p>;
  if (!userData) return <p>No profile data available. Please log in.</p>;

  return (
    <div className="max-w-md mx-auto p-6 border rounded shadow mt-10 bg-white/10 text-white">
      <h1 className="text-2xl font-bold mb-4">Player Profile</h1>
      <p><strong>First Name:</strong> {userData.firstName}</p>
      <p><strong>Last Name:</strong> {userData.lastName}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Contact:</strong> {userData.contact}</p>
    </div>
  );
};

export default PlayerProfile;
