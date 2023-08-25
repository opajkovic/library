import React, { useEffect } from 'react'
import ProfileTitle from '../../layout/profileTitle/ProfileTitle'
import { useOutletContext } from 'react-router';

export default function LibrarianProfile() {
  const { setRoute } = useOutletContext();
  useEffect(() => {
    setRoute("librarians");
  }, []);
  return (
    <div className='Librarian'>
        <ProfileTitle linkOne={'Svi Bibliotekari'} linkOnePath={'/librarians'} linkTwoPath={'/librarians/'} />
    </div>
  )
}
