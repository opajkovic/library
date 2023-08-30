import "../studentProfile.css";

const DUMMY_DATA = [
  {
    name: "Morgan",
    surname: "Streich",
    role: "Ucenik",
    JMBG: "07111995230034",
    email: "morganstreich@example.com",
    username: "Morgan 123",
    numberOfLogins: 0,
    lastSeen: null,
    image: null,
  },
];

export default function UserInfo() {
  return DUMMY_DATA.map((item, index) => (
    <div className="user-info" key={index}>
      <ul>
        <li>
          <span> Ime </span> {item.name}
        </li>
        <li>
          <span> Prezime </span> {item.surname}
        </li>
        <li>
          <span> Tip Korisnika </span> {item.role}
        </li>
        <li>
          <span> JMBG </span> {item.JMBG}
        </li>
        <li>
          <span> Email </span> {item.email}
        </li>
        <li>
          <span> Korisničko ime </span> {item.username}
        </li>
        <li>
          <span> Broj logovanja </span> {item.numberOfLogins}
        </li>
        <li>
          <span> Poslednji put logovan/na </span>
          {item.lastSeen === null ? "Nije se nikad ulogovao/la" : item.lastSeen}
        </li>
      </ul>
      <div className="user-image">
        <img
          src={
            item.image === null
              ? "https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-image-182145777.jpg"
              : item.image
          }
        />
      </div>
    </div>
  ));
}
