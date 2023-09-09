import "../studentProfile.css";

export default function UserInfo({ userInfo }) {
  return (
    <div className="user-info">
      <ul>
        <li>
          <span> Ime </span> {userInfo && userInfo.name}
        </li>
        <li>
          <span> Prezime </span> {userInfo && userInfo.surname}
        </li>
        <li>
          <span> Tip Korisnika </span> {userInfo && userInfo.role}
        </li>
        <li>
          <span> JMBG </span> {userInfo && userInfo.jmbg}
        </li>
        <li className="email-info">
          <span> Email </span> {userInfo && userInfo.email}
        </li>
        <li>
          <span> Korisničko ime </span> {userInfo && userInfo.username}
        </li>
        <li>
          <span> Broj logovanja </span> {userInfo && userInfo.numberOfLogins}
        </li>
        <li>
          <span> Poslednji put logovan/na </span>
          {/* {userInfo.lastSeen === null ? "Nije se nikad ulogovao/la" : userInfo.lastSeen} */}
        </li>
      </ul>
      <div className="user-image">
        <img
          src={
            !userInfo
              ? "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
              : userInfo.photoPath
          }
        />
      </div>
    </div>
  );
}
