import React from 'react'
import ProfileTitle from '../../layout/profileTitle/ProfileTitle'

export default function LibrarianProfile() {
  return (
    <div className='Librarian'>
        <ProfileTitle linkOne={'Svi Bibliotekari'} linkOnePath={'/librarians'} linkTwoPath={'/librarians/'} />
    </div>
  )
}
