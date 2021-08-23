import * as ACTION_CONSTANTS from '../constants/action-types'
import { positionCodes } from '../constants/positions';
import { getPlayerPosition, sumObjectOfArraysLength } from '../assets/scripts/utilities';
import { replaceItemInArray } from '../assets/scripts/utilities';

//TODO: write sample state helpers so can easily call w/ param to test part of app like admin only
const initialState = {
    pickedPlayers: {
        qb: [],
        rb: [],
        wr: [],
        te: [],
        def: [],
        k: []
    },
    // teamStructure: {
    //     positions: {
    //         qb: {
    //             infinite: true,
    //             starter: 1,
    //             amount: 1,
    //             isFlexable: false,
    //             name: positionCodes.qb
    //         },
    //         rb: {
    //             infinite: false,
    //             starter: 2,
    //             amount: 4,
    //             isFlexable: true,
    //             name: positionCodes.rb
    //         },
    //         wr: {
    //             infinite: true,
    //             starter: 2,
    //             amount: 4,
    //             isFlexable: true,
    //             name: positionCodes.wr
    //         },
    //         te: {
    //             infinite: true,
    //             starter: 1,
    //             isFlexable: true,
    //             amount: 4,
    //             name: positionCodes.te
    //         },
    //         def: {
    //             infinite: true,
    //             starter: 1,
    //             isFlexable: false,
    //             amount: 2,
    //             name: positionCodes.d
    //         },
    //         k: {
    //             infinite: true,
    //             starter: 1,
    //             isFlexable: false,
    //             amount: 2,
    //             name: positionCodes.k
    //         },
    //     },
    //     //TODO: this will be dynmaiclaly set
    //     rosterSpots: 13,
    //     benchSpots: 4,
    //     flexSpots: 1
    // },
    draftReady: false,
    teamObject: {
        name: null,
        pickedPlayers: {
            qb: [],
            rb: [],
            wr: [],
            te: [],
            def: [],
            k: []
        },
        maxedPicks: {
            qb: false,
            rb: false,
            wr: false,
            te: false,
            d: false,
            k: false,
            full: false
        },
    },
    draftingTeam: null
}

//Remember two key points for avoiding mutations in Redux:

// use concat, slice, or the spread operator for arrays
// use Object.assign or object spread of objects
function rootReducer(state = initialState, action) {
    console.log('root ruducer');
    console.log(action.type);
    if (action.type === ACTION_CONSTANTS.ADD_DRAFTED_PLAYER) {
        // state.pickedPlayers.concat(action.payload);
        //doing this because push is impure - it updates the original array which is against redux principles
        //creating a new property and concating both arrays


        //const updatedTeams = state.teams[action.payload.teamIndex].pickedPlayers[pos] = [...state.teams[action.payload.teamIndex].pickedPlayers[pos], action.payload.draftedPlayer];
        
        /**
         * Add Drafted Player to a Team object
         */
        const teamIndex = action.payload.teamIndex,
            draftedPlayer = action.payload.draftedPlayer,
            pos = getPlayerPosition(action.payload.draftedPlayer),
            { teamStructure } = state,
            //Update teams array in state with new players
            updatedTeam = state.teams.map(team => {
                //Using index to see which team to update w/ the drafted player
                if (team.name === state.teams[teamIndex].name) {

                    let setPosMaxPicks = false,
                        setMaxPicks = false;

                    //Check if team has drafted max amount of position
                    if (!teamStructure.positions[pos].infinite) {
                        if (team.pickedPlayers[pos].length === teamStructure.positions[pos].amount) {
                            setPosMaxPicks = true;
                        }
                    }
                    //Check if team has drafted roster max
                    if (sumObjectOfArraysLength(team.pickedPlayers) === teamStructure.rosterSpots) {
                        setMaxPicks = true;
                    }

                    return { 
                        name: team.name,
                        pickedPlayers: {
                            ...team.pickedPlayers,
                            [pos]: [...team.pickedPlayers[pos], draftedPlayer]
                        },
                        maxedPicks: {
                            ...team.maxedPicks,
                            [pos]: setPosMaxPicks,
                            full: setMaxPicks
                        }
                    }
                } else {
                    return team;
                }
            });

        return {
            ...state,
            teams: [
                ...updatedTeam
            ]
        }
    } else if (action.type === ACTION_CONSTANTS.SET_DRAFTING_TEAM) {
        return {
            ...state,
            draftingTeam: action.payload
        }
    } else if (action.type === ACTION_CONSTANTS.SET_TEAMS) {
        // Creates a team object and push it in order
        let teamObjects = [];
        for (let team in action.payload) {
            let teamObject = {...state.teamObject};
            teamObject.name = action.payload[team];
            teamObjects.push(teamObject);
        }
        return {
            ...state,
            teams: teamObjects
        };
    } else if (action.type === ACTION_CONSTANTS.SET_TEAM_CONFIGS) {
        //Sets the rules for each team 
        const positions = action.payload.positions;
        let count = 0;
        for (let position in positions) {
            if (positions[position].onRoster) {
                count += positions[position].starter;
            }
        }
        count += action.payload.benchSpots;
        count += action.payload.flexSpots;
        action.payload.rosterSpots = count;

        return {
            ...state,
            teamStructure: action.payload
        }
    } else if (action.type === ACTION_CONSTANTS.SET_DRAFT_READY) {
        //Is app ready to draft
        return {
            ...state,
            draftReady: true
        }
    }
    return state;

};

export default rootReducer;