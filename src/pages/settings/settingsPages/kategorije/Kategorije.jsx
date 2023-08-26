import './kategorije.css'
import PageTitle from '../../../../components/pageTitle/PageTitle'
// import Menu from '../../layouts/menu/Menu'
import { useOutletContext } from 'react-router';
import Button from "../../../../components/UI/Button"
import { FaPlus } from "react-icons/fa";
import {BsThreeDotsVertical} from "react-icons/bs";
import {FaLongArrowAltDown} from "react-icons/fa";
import { useEffect } from 'react';

const categories= [
  {id:1, name:"Hrana i pice",opis:"Lorem ipsum dolor sit amet consectetur adipising eli,"},
  {id:2, name:"Djecije knjige",opis:"Lorem ipsum dolor sit amet consectetur adipising eli,"},
  {id:3, name:"Istorija",opis:"Lorem ipsum dolor sit amet consectetur adipising eli,"},
  {id:4, name:"Skolske knjige",opis:"Lorem ipsum dolor sit amet consectetur adipising eli,"},
  {id:5, name:"Nauka, priroda i matematika",opis:"Lorem ipsum dolor sit amet consectetur adipising eli,"},
  {id:6, name:"Pravo",opis:"Lorem ipsum dolor sit amet consectetur adipising eli,"},
  {id:7, name:"Hrana i pice",opis:"Lorem ipsum dolor sit amet consectetur adipising eli,"}
]
export default function Kategorije() {
  const {setRoute} = useOutletContext()
  useEffect(()=>{
    setRoute('settings')
  },[])

  const handleDots = () => {

  }
  return (
    <>
    <div>
    <PageTitle title="Settings" />
    {/* <Menu selectedSettings={'kategorije'} /> */}
    <div className='container'>
    <Button type="button" btn="btn btn-primary">
          <FaPlus />
          <span>Nova  kategorija</span>
        </Button>
    <table id="table">
      <thead>
      <tr>
        <th>
          <input type="checkbox" />
          Nova kategorija
          <sub><FaLongArrowAltDown className="arrow"/></sub>
        </th>
        <th>Opis</th>
      </tr>
      </thead>
      <tbody>
    {categories.map((category) => {
      return (
        <tr key={category.id}>
        <td>
          <input type="checkbox" />
          {category.name}
        </td>
        <td className="flex-between"> {category.opis}
        <BsThreeDotsVertical className="dots" onClick={handleDots}/>
        </td>
      </tr>
      )
    })}
      
      </tbody>
    </table>
    </div>
    </div>
    </>
  )
}
