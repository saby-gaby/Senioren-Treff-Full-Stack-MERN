import React, { useContext } from 'react';
import { SectionsContext } from '../../context/sectionsContext';
import Nav from '../Nav/Nav'

export default function UserProfil() {
  const {logout}=useContext(SectionsContext)
  return (
    <div>
      <Nav />
      <p>Herzlich willkommen {localStorage.getItem("userName")}</p>
          <button onClick={logout}>Logout</button>
    </div>
  )
}
