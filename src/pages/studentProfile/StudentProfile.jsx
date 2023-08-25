import React, { useEffect } from 'react'
import './studentProfile.css'
import ProfileTitle from '../../layout/profileTitle/ProfileTitle'
import { useOutletContext } from 'react-router';

export default function StudentProfile() {
  const { setRoute } = useOutletContext();
  useEffect(() => {
    setRoute("students");
  }, []);
  return (
    <div>
        <ProfileTitle linkOne={'Svi Studenti'} linkOnePath={'/students'} linkTwoPath={'/students/'} />
    </div>
  )
}
