import React from 'react'

import '../css/myTeam.css'

export default function MyTeams(props) {
  return (
    <div className="chooseTeam">
        <div className='pokemonTeamElement'>
            <img src={props.img} alt="" />
         </div>
    </div>
  )
}
