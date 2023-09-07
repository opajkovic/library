import "../AuthorProfile.css";

export default function AuthorInfo({userInfo}) {
  return (
    <ul className="author-info-wrapper">
      <li>
        <span> Ime i prezime </span>
        {userInfo.name} {userInfo.surname}
      </li>
      <li>
        <span> Opis </span>
        {userInfo.bio && userInfo.bio.replace(/<\/?p>/g, '')}
      </li>
    </ul>
  );
}
