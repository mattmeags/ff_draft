import PlayerCard from './PlayerCard';
import players from '../players';
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addDraftedPlayer, setDraftingTeam } from '../actions';
import { removeItemFromArray } from '../assets/scripts/utilities';
import Select from './controls/Select';
import { positionCodes } from '../constants/positions';
import TeamCard from './TeamCard';
import '../assets/styles/components/draftboard.scss';

/**
 * Connector of actions
 * @param {*} dispatch 
 * addDraftedPlayer - adds drafter player to team state object
 */
const mapDispatcherstoProps = dispatch => {
    return {
        addDraftedPlayer: (player) => dispatch(addDraftedPlayer(player)),
        setDraftingTeam: (team) => dispatch(setDraftingTeam(team))
    }
}

const mapStateToProps = (state) => {
    console.log(state);
    return {
        draftingTeam: state.draftingTeam,
        teams: state.teams,
        teamStructure: state.teamStructure
    }
}

/**
 * 
 * @param {Object} props 
 * @param {Function} props.addDraftedPlayer - action - add the player to the drafting team object
 * @param {Object} props.draftingTeam - the drafting team
 * @param {Array} props.teams - list of all the teams - their picks if they have maxed out and pics and team name
 * @param {Function} props.setDraftingTeam - action update the drafting team
 * @param {Object} props.teamStructure - object describing the limits and capcity of an individual team
 */
function DraftBoard({ addDraftedPlayer, draftingTeam, teams, setDraftingTeam, teamStructure }) {

    //TODO: This pattern is used to call child methods in parent maybe can be custom hook
    let filterCallables = null;

    const [availablePlayers, updateAvailablePlayers] = useState(players),
        //This is players displayed so don't affect who is drafted
        [displayedAvailablePlayers, displayPlayers] = useState(players),
        //[currentTeam, setCurrentTeam] = useState(),
        { name, maxedPicks } = draftingTeam,
        playerFilterValues = {
            all: 'All',
            ...positionCodes,
        },
        //TODO: This pattern is used to call child methods in parent maybe can be custom hook
        setFilterCallables = (callables) => {
            filterCallables = callables;
        },
        //draft player action
        draftPlayer = (playerRank) => {
            const draftedPlayer = availablePlayers.find((player) => player.RANK === playerRank),
                updatedAvailablePlayers = removeItemFromArray(availablePlayers, draftedPlayer),
                draftingTeamIndex = teams.findIndex(team => team.name === draftingTeam.name);

            //Update state w/ updated draft candiates
            updateAvailablePlayers(updatedAvailablePlayers);
            addDraftedPlayer({ draftedPlayer: draftedPlayer, teamIndex: draftingTeamIndex });
            //IF last team go to first team else go to next team
            setDraftingTeam(draftingTeamIndex + 1 === teams.length ? teams[0] : teams[draftingTeamIndex + 1]);
            filterCallables.resetSelect();
        },
        //Handles the change of the position filter - easy to search
        filterPositions = (position) => {
            if (position !== 'All') {
                const filteredPlayers = availablePlayers.filter(player => player.POS === position);
                displayPlayers(filteredPlayers);
            } else {
                displayPlayers(availablePlayers);
            }
        };

        // isPlayerDraftable = pos => {
        //     //TODO this needs to be an effect
        //     const isPosMaxed = currentTeam.maxPicks[pos];
        //         //isRosterMaxed = teamObject.maxPicks.full;
            
        //     return isPosMaxed;
        // };

    // useEffect(() => {
    //     setDraftingTeam(teams[0]);
    //     //setCurrentTeam(teams[0])
    // }, []); //Adding the [] means only happens once - this watches state or props to update then fires iseffect


    useEffect(() => {
        displayPlayers(availablePlayers);
    }, [availablePlayers]);

    return (
        <div className="d--flex w--full ">
            <section className="draft-board">
                <section className="d--flex flex-justify-between draft-board__header">
                    <h2>Drafting Team: {name}</h2>
                    <Select optionsProps={playerFilterValues} changeListener={filterPositions} setCallables={setFilterCallables} />
                </section>

                <section className="draft-board__available-players">
                    {displayedAvailablePlayers.map(player => {
                        const pos = player.POS.toLowerCase();
                        return teamStructure.positions[pos].onRoster ? <PlayerCard player={player} isDraftable={!maxedPicks[pos]} draftPlayer={draftPlayer} key={player.RANK} /> : null
                    })}
                </section>
            </section>

            <section className="team-view">
                {teams.map(team => (<TeamCard team={team} key={team.name} />))}
            </section>
        </div>
    );
}

export default connect(mapStateToProps, mapDispatcherstoProps)(DraftBoard);