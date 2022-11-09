import React, { useContext } from "react";
import { SectionsContext } from "../../context/sectionsContext";
import Nav from '../Nav/Nav'

export default function Home() {

  const {setAllSectFalse, setIsLogin, setIsRegister, setIsUserProfile, setIsEventForm, setIsSearchedEvents, setIsOneEvent}=useContext(SectionsContext)
  const toLogin = ()=>{
    setAllSectFalse();
    setIsLogin(true)
  }
  const toRegister = ()=>{
    setAllSectFalse();
    setIsRegister(true)
  }
  const toUser = ()=>{
    setAllSectFalse();
    setIsUserProfile(true)
  }
  const toEventForm = ()=>{
    setAllSectFalse();
    setIsEventForm(true)
  }
  const toEvents = ()=>{
    setAllSectFalse();
    setIsSearchedEvents(true)
  }
  const toEvent = ()=>{
    setAllSectFalse();
    setIsOneEvent(true)
  }

  return (
  <div>
    <Nav />
    
    <button onClick={toLogin}>login</button>
    <button onClick={toRegister}>Register</button>
    <button onClick={toUser}>Mein Bereich</button>
    <button onClick={toEventForm}>Event Form</button>
    <button onClick={toEvents}>Searched Events</button>
    <button onClick={toEvent}>One Event</button>
  </div>
  )
}
