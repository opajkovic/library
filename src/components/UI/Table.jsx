import "./Table.css";
import {BsThreeDotsVertical} from "react-icons/bs";
import {FaLongArrowAltDown} from "react-icons/fa";
import photo from "../../assets/profileStudent.jpg";

const Table = () => {

  const handleDots = () => {

  }
  return (
    <table id="table">
      <thead>
      <tr>
        <th>
          <input type="checkbox" />
          Ime i prezime 
          <sub><FaLongArrowAltDown className="arrow"/></sub>
        </th>
        <th>Email</th>
        <th>Tip korisnika</th>
        <th>Zadnji pristup sistemu</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>
          <input type="checkbox" />
          Valentina Kascelan
        </td>
        <td>valentina.kascelan@domain...</td>
        <td>Bibliotekar</td>
        <td className="flex-between">Prije 10 sati 
        <BsThreeDotsVertical className="dots" onClick={handleDots}/>
        </td>
      </tr>
      <tr>
        <td>
          <input type="checkbox" />
          Valentina Kascelan
        </td>
        <td>valentina.kascelan@domain...</td>
        <td>Bibliotekar</td>
        <td className="flex-between">Prije 10 sati
        <BsThreeDotsVertical className="dots" onClick={handleDots}/>
        </td>
      </tr>
      <tr>
        <td>
          <input type="checkbox" />
          Valentina Kascelan
        </td>
        <td>valentina.kascelan@domain...</td>
        <td>Bibliotekar</td>
        <td className="flex-between">Prije 10 sati
        <BsThreeDotsVertical className="dots" onClick={handleDots}/>
        </td>
      </tr>
      </tbody>
    </table>
  );
};

export default Table;
