import React, { useState, useEffect } from 'react';
import Select from '../controls/Select';
import ToggleButton from '../controls/ToggleButton';
import { positions, teamSpots, teamStructure, basicCounter } from '../../constants/positions';
import { setTeamConfigs } from '../../actions';
import { connect } from 'react-redux';
import { LAUNCH_STEP } from '../../constants/steps';

const mapDispatcherToProps = dispatch => {
    return {
        setTeamConfigs: (config) => dispatch(setTeamConfigs(config))
    }
}
//TODO: comment everything
/**
 * 
 * @param {Object} props Compnent props
 * @param {Function} props.controlListener - 
 * @param {} props.defaultConfig
 */
function PositionControl({ controlListener, defaultConfig }) {
    //TODO: need a flexable control
    //console.log(defaultConfig);
    const starterCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        maxCount = [2, 3, 4, 5, 6, 7, 8, 9, 10],
        [showPosition, togglePosition] = useState(),
        [isInfinitePosition, toggleInfinitePosition] = useState(true),
        [positionConfigObject, setPositionConfigObject] = useState({}),
        { infinite, starter, amount, isFlexable, name, posName, onRoster } = defaultConfig,
        handleInfinite = value => {
            toggleInfinitePosition(value);
            setPositionConfigObject({
                ...positionConfigObject,
                infinite: value
            });
        },
        handlePositionShow = value => {
            togglePosition(value);
            setPositionConfigObject({
                ...positionConfigObject,
                onRoster: value
            });
        },
        handleStarterAmount = value => {
            setPositionConfigObject({
                ...positionConfigObject,
                starter: parseInt(value, 10)
            });
        },
        handleMaxAmount = value => {
            setPositionConfigObject({
                ...positionConfigObject,
                starter: value
            });
        };

    
    useEffect(() => {
        togglePosition(onRoster);
        console.log(defaultConfig);
        //let posSaveTemplate = postionConfigTemplate;
        //TODO: use key to set name from poscodes

        setPositionConfigObject(defaultConfig);
    }, []);

    useEffect(() => {
        controlListener(positionConfigObject)
    }, [positionConfigObject]);

    return (
        <fieldset>
            <legend>{posName}</legend>
            {/* have this position? */}
            <ToggleButton label={`${posName} Roster Spot`} active={onRoster} toggleListener={handlePositionShow}/>

            {showPosition && (
                <React.Fragment>
                    {/* //# of starters  */}
                    <Select optionsProps={basicCounter} label={`Number of starting ${posName}s`} changeListener={handleStarterAmount} defaultValue={starter}/>

                    {/* // Max amount on team
                    //Infiite?  */}
                    <ToggleButton label={'Roster Spot Amount'} toggleListener={handleInfinite} active={true}/>
                    {/* if not select amount */}
                    {!isInfinitePosition && (
                        <Select optionsProps={maxCount} changeListener={handleMaxAmount}/>
                    )}
                </React.Fragment>
            )}
        </fieldset>
    )
}

/**
 * 
 * @param {Object} props 
 * @param {setActiveStepListener} setActiveStepListener
 */
function TeamPositionForm({ setActiveStepListener, setTeamConfigs}) {
    const [positionSettings, setPositionSettings] = useState(teamStructure),
        saveTeamPositionConfigs = (event) => {
            event.preventDefault();
            // setPositionSettings({
            //     ...positionSettings,
            //     //rosterSpots: getRosterSize()
            // });
            console.log('boutta launch an action!!');
            setTeamConfigs(positionSettings);
            console.log(positionSettings);
            setActiveStepListener(LAUNCH_STEP);
        },
        positionControlUpdateListener = (config) => {
            console.log('update here positionControlUpdateListener: ', config);
            console.log(positionSettings);
            if (config && 'name' in config) {
                setPositionSettings({
                    ...positionSettings,
                    positions: {
                        ...positionSettings.positions,
                        [config.name.toLowerCase()]: config
                    }
                    
                });
            }
        },
        setBenchAmount = amount => {
            setPositionSettings({
                ...positionSettings,
                benchSpots: parseInt(amount, 10)
            });
        },
        setFlexAmount = amount => {
            setPositionSettings({
                ...positionSettings,
                flexSpots: parseInt(amount, 10)
            });
        },
        getRosterSize = () => {
            const positions = positionSettings.positions;
            let count = 0;
            for (let position in positions) {
                if (positions[position].onRoster) {
                    count += positions[position].starter;
                }
            }
            count += positionSettings.benchSpots;
            count += positionSettings.flexSpots;
            return count;
        };

        //console.log(teamSpots);

    return (
        <form onSubmit={saveTeamPositionConfigs}>
            {/* Need starter count Need position count if infite isn't checked and if have type like idp  */}
            {teamSpots.map(({ posCode }) => <PositionControl controlListener={positionControlUpdateListener} defaultConfig={positionSettings.positions[posCode.toLowerCase()]}/>)}
            
            <Select label="Number of Bench Spots" optionsProps={basicCounter} changeListener={setBenchAmount} defaultValue={positionSettings.benchSpots}/>
            <Select label="Number of Flex Spots" optionsProps={basicCounter} changeListener={setFlexAmount} defaultValue={positionSettings.flexSpots}/>
            
            <button type="submit">Save</button>
        </form>
    );
}

export default connect(null, mapDispatcherToProps)(TeamPositionForm);