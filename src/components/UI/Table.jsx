import "./Table.css";
import photo from "../../assets/profileStudent.jpg"

const Table = () => {
    return (
    <table id="table">
        <tr>
            <th><input type="checkbox" />Ime i prezime</th>
            <th>Email</th>
            <th>Tip korisnika</th>
            <th>Zadnj pristup sistemu</th>
        </tr>
        <tr>
            <td><input type="checkbox" />Valentina Kascelan</td>
            <td>valentina.kascelan@domain...</td>
            <td>Bibliotekar</td>
            <td>Prije 10 sati</td>
        </tr>
        <tr>
            <td><input type="checkbox" />Valentina Kascelan</td>
            <td>valentina.kascelan@domain...</td>
            <td>Bibliotekar</td>
            <td>Prije 10 sati</td>
        </tr>
       <tr>
            <td><input type="checkbox" />Valentina Kascelan</td>
            <td>valentina.kascelan@domain...</td>
            <td>Bibliotekar</td>
            <td>Prije 10 sati</td>
        </tr>

    </table>
    )
};

export default Table;
