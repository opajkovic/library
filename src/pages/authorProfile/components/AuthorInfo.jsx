import "../AuthorProfile.css";

export default function AuthorInfo({ userInfo }) {
  const htmlString = userInfo.bio;
  return (
    <ul className="author-info-wrapper">
      <li>
        <span> Ime i prezime </span>
        {userInfo.name} {userInfo.surname}
      </li>
      <li>
        <span> Opis </span>
        <div dangerouslySetInnerHTML={{ __html: htmlString }} />
      </li>
    </ul>
  );
}
