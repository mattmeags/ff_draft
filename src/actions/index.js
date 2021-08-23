import * as ACTION_CONSTANTS from '../constants/action-types';

export function addDraftedPlayer(payload) {
    return { type: ACTION_CONSTANTS.ADD_DRAFTED_PLAYER, payload };
};

export function setDraftingTeam(payload) {
    return { type: ACTION_CONSTANTS.SET_DRAFTING_TEAM, payload };
}

export function setTeams(payload) {
    return { type: ACTION_CONSTANTS.SET_TEAMS, payload }
}

export function setTeamConfigs(payload) {
    console.log('set team configs');
    return { type: ACTION_CONSTANTS.SET_TEAM_CONFIGS, payload }
}

export function setDraftReady(payload) {
    console.log(payload);
    return { type: ACTION_CONSTANTS.SET_DRAFT_READY, payload }
}