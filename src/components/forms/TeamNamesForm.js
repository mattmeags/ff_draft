import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import FormField from '../controls/FormField';
import Select from '../controls/Select';
import { setTeams } from '../../actions';
import { TEAM_CONFIG_STEP } from '../../constants/steps';

const mapDispatcherToProps = displatch => {
    return {
        setTeams: (teams) => displatch(setTeams(teams))
    }
}

function TeamNamesForm({ setTeams, setActiveStepListener }) {
    const teamNameLabel = 'Team Name:',
        //TODO: this should proably be a constant
        teamNumberOptions = [2, 4, 6, 8, 10, 12, 14, 16],
        TeamNameFormField = ({ inputName, label }) => <FormField inputName={inputName} label={teamNameLabel} changeListener={recordTeams} />,
        initialTeamNameFields = [
            <TeamNameFormField inputName="TeamName1" />,
            <TeamNameFormField inputName="TeamName2" />
        ],
        [teamNameFields, updateTeamNameFields] = useState(initialTeamNameFields),
        [teamNames, setTeamNames] = useState({});

    // useEffect(() => {
    //     console.log('teamNames useeffect:', teamNames);
    // }, [teamNames]);

    
    function recordTeams({name, value}) {
        let teamObject = teamNames;
  
        teamObject[name] = value;
        setTeamNames({ ...teamObject });
    }

    function setInputArray(amount) {
        let i = 0,
            updatedTeamFields = [];

        while (i <= amount + 1) {
            updatedTeamFields.push(
                <TeamNameFormField inputName={`TeamName${i + 1}`} />,
                <TeamNameFormField inputName={`TeamName${i + 2}`} />
            );
            //TODO: there is probably a better way to do this
            i++;
            i++;
        };

        return updatedTeamFields;
    }

    function addTeamInputs(amount) {
        const baseAmount = 2,
            existingTeamFields = teamNameFields.length;

        if (amount !== baseAmount) {
            if (amount > existingTeamFields) {
                //Add Fields
                const amountToAdd = amount - existingTeamFields,
                    newFields = setInputArray(amountToAdd);

                updateTeamNameFields(newFields);
                    //updateTeamNameFields(currentTeamFields => [...currentTeamFields, ...newFields]);
            } else {
                //Remove Fields
                const newFields = setInputArray(amount);
                updateTeamNameFields(newFields);
            }
        }
    }

    function saveTeamNames(event) {
        event.preventDefault();
        console.log(Object.keys(teamNames).length)
        console.log(teamNames);
        setTeams(teamNames);
        setActiveStepListener(TEAM_CONFIG_STEP);
    }

    return (
        <React.Fragment>
            
            <Select optionsProps={teamNumberOptions} changeListener={addTeamInputs}></Select>
            <form onSubmit={saveTeamNames}>
                <fieldset>
                    <legend>Team Names</legend>

                    {teamNameFields}

                </fieldset>
                <button type="submit">Click here</button>
            </form>
            
        </React.Fragment>
    );
}

export default connect(null, mapDispatcherToProps)(TeamNamesForm);