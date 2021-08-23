import React, {useState, useEffect} from 'react';
import PlayerCard from './PlayerCard';
import { connect } from 'react-redux';
import { flexStartPosition } from '../constants/positions';



const mapStateToProps = (state) => {
    return { 
        //pickedPlayers: state.pickedPlayers, 
        teamStructure: state.teamStructure,
        teams: state.teams,
        draftingTeam: state.draftingTeam
    };
}
//  
function TeamCard({ teamStructure, teams, draftingTeam, team, key }) {
    const [flexPlayer, addPlayerToFlexSpot] = useState(null);
    const { positions, benchSpots } = teamStructure; 
    const isDrafting = draftingTeam.name === team.name;
    const { pickedPlayers } = team;

    let startingList = [],
        benchList = [],
        sortedPlayers = pickedPlayers,
        i = 0;
    

    console.log(team);
    // useEffect(() => {
        // Update the document title using the browser API
    //useEffect(() => {
        //TODO: left off here: add empty slots and will need to add and remove dynamically
        for (let position in positions) {
            const currentPosition = positions[position],
                currentRosteredPosition = pickedPlayers[position];
            if (pickedPlayers.hasOwnProperty(position) && currentPosition.onRoster) {
                //Create starting Roster Slots
                [...Array(currentPosition.starter)].forEach((el, i) => {
                    console.log('==========================');
                    startingList.push(
                        <React.Fragment>
                            <dt>{currentPosition.name}</dt>
                            <dd key={currentPosition.name + '-' + i} >
                            {(currentRosteredPosition.length
                                && i < currentRosteredPosition.length) ? (
                                    <PlayerCard player={currentRosteredPosition[i]} draftPlayer={null} />
                                ) : (
                                    <div className="team-view__slot--empty">empty</div>
                                )
                            }
                            </dd>
                        </React.Fragment>
                    );
                });

                //Create bench roster slots
                if (currentPosition.starter < team.pickedPlayers[position].length) {
                    let remainingPlayers = currentRosteredPosition.slice(currentPosition.starter, currentRosteredPosition.length);
                    //Remove player from bench if flexable
                    if (!flexPlayer && currentPosition.isFlexable) {
                        addPlayerToFlexSpot(remainingPlayers[0])
                    }
                    if (flexPlayer) {
                        remainingPlayers.shift();
                    }

                    remainingPlayers.forEach(remaingPlayer => {
                        benchList.push(
                            <React.Fragment>
                                <li key={remaingPlayer.RANK}><PlayerCard player={remaingPlayer} /></li>
                            </React.Fragment>
                        );
                    });
                }
                //Add empty bench slots
                while (benchList.length < benchSpots) {
                    benchList.push(
                        <React.Fragment>
                            <li key="emptybench" className="team-view__slot--empty team-view__slot">blank</li>
                        </React.Fragment>
                    )
                }
            }
        }
    //}, [pickedPlayers])

    //Add Flex spot
    
    i++;
    let flexSplit1 = startingList.slice(0, flexStartPosition - 1);
    let flexSplit2 = startingList.slice(flexStartPosition -1, startingList.length);
    if (!flexPlayer) {
        flexSplit1.push(
            <React.Fragment>
                <dt>Flex</dt>
                <dd key={i}>
                </dd>
            </React.Fragment >
        );
    } else {
        flexSplit1.push(
            <React.Fragment>
                <dt>Flex</dt>
                <dd key={flexPlayer.RANK}>
                    <PlayerCard player={flexPlayer} draftPlayer={null}  />
                </dd>
            </React.Fragment >
        );
    }
    startingList = flexSplit1.concat(flexSplit2);
    
    return (
        <article>
            <h2>{team.name}</h2>
            {isDrafting && <dl>
                <dt><h3>Starting Line Up</h3></dt>
                <dd className="yo">
                    <dl>
                        {startingList}
                    </dl>
                </dd>
                <dt><h3>Bench</h3></dt>
                <dd>
                    <ul>
                        {benchList}
                    </ul>
                </dd>
            </dl>}
        </article>
    );
}

export default connect(mapStateToProps)(TeamCard);