import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AddressManagement } from "../components/address-manager";

const Profile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (
      !localStorage.getItem("isAuth") ||
      localStorage.getItem("isAuth") === "false" ||
      localStorage.getItem("token").length < 25
    )
      navigate(-1);
  }, [navigate]);

  return (
    <div className="profile section">
      <div className="container">
        <AddressManagement />
      </div>
    </div>
  );
};

export default Profile;
