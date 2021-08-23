import React, { useState } from 'react';
import TeamNamesForm from './forms/TeamNamesForm';
import TeamPositionsForm from './forms/TeamPositionsForm';
import FormField from './controls/FormField';
import { connect } from 'react-redux';
import { setDraftingTeam, setDraftReady } from '../actions'
import * as STEP_CONSTANTS from '../constants/steps';

const mapDispatcherToProps = dispatch => {
    return {
        setDraftingTeam: (team) => dispatch(setDraftingTeam(team)),
        setDraftReady: (isDraftReady) => dispatch(setDraftReady(isDraftReady))
    }
};

const mapStateToProps = state => {
    return {
        teams: state.teams
    }
};

function AdminLaunch({ setDraftReady, teams, setDraftingTeam }) {
    const [teamNamesStep, setStepToTeamNamesStep] = useState(true),
        [teamConfigStep, setStepToTeamConfigStep] = useState(false),
        [launchDraftStep, setStepToLaunchStep] = useState(false)
    
    const leagueNameLabel = 'Enter your league name (optional)';

    // function setTeamNames(event) {
    //     event.preventDefault();
        
    //     setStepToTeamsStep(false);
    // }

    const startDraft = () => {
        console.log('seetting draft ready here');
        setDraftReady(true);
        setDraftingTeam(teams[0]);
    }

    //TODO: there is something better we can do here
    const setActiveStep = (stepName) => {
        setStepToTeamNamesStep(stepName === STEP_CONSTANTS.TEAM_NAME_STEP);
        setStepToTeamConfigStep(stepName === STEP_CONSTANTS.TEAM_CONFIG_STEP);
        setStepToLaunchStep(stepName === STEP_CONSTANTS.LAUNCH_STEP);
    }
     
    return (
        <section>
            <form>
                <FormField inputName="LeagueName" label={leagueNameLabel} />
            </form>
            
            { teamNamesStep && <TeamNamesForm setActiveStepListener={setActiveStep}/> }

            { teamConfigStep && <TeamPositionsForm setActiveStepListener={setActiveStep}/> }

            { launchDraftStep && (
                <div>
                    <button onClick={() => startDraft()}>Start Draft</button>
                    <button>Edit Team Settings</button>
                </div>
            )}
        
        </section>
    );
}

export default connect(mapStateToProps, mapDispatcherToProps)(AdminLaunch);