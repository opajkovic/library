import React from 'react'
import './studentProfile.css'
import ProfileTitle from '../../layout/profileTitle/ProfileTitle'

export default function StudentProfile() {
  return (
    <div>
        <ProfileTitle linkOne={'Svi Studenti'} linkOnePath={'/students'} linkTwoPath={'/students/'} />
    </div>
  )
}
