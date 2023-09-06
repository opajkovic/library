import "../AuthorProfile.css";

const DUMMY_DATA = {
  name: "Mark Twain",
  description:
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque non aperiam voluptas expedita, laborum deleniti sit ipsum quam! Quis architecto aliquid deleniti ipsum labore ipsa mollitia aspernatur consequatur incidunt nesciunt. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Atque non aperiam voluptas expedita, laborum deleniti sit ipsum quam! Quis architecto aliquid deleniti ipsum labore ipsa mollitia aspernatur consequatur incidunt nesciunt.",
};

export default function AuthorInfo({userInfo}) {
  return (
    <ul className="author-info-wrapper">
      <li>
        <span> Ime i prezime </span>
        {userInfo.name} {userInfo.surname}
      </li>
      <li>
        <span> Opis </span>
        {userInfo.bio}
      </li>
    </ul>
  );
}
