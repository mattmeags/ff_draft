import {useState, useEffect} from 'react';
// Styles
import '../assets/styles/components/playerCard.scss';

/**
 * 
 * @param {Object} props
 * @param {Object} props.player - player object
 * @param {Function} props.draftPlayer - action used by draft button to draft player
 * @param {Boolean} props.isDraftable - is player draftable
 */
function PlayerCard({ player, draftPlayer, isDraftable}) {
    const {PLAYER, POS, TEAM, RANK} = player,
        [draftable, setDraftable] = useState(isDraftable ? isDraftable : false);

    //use this hook to watch for change of isDraftable prop and update our state
    useEffect(() => {
        setDraftable(isDraftable);
    }, [isDraftable])

    return (
        <article className="player-card d--flex flex-col">
            <h2 className="player-card__name">{PLAYER}</h2>
            <dl className="player-card__details-wrapper">
                <dt className="player-card__details">Position: </dt>
                <dd className="player-card__details">{POS}</dd>
                <dt className="player-card__details">Team: </dt>
                <dd className="player-card__details">{TEAM}</dd>
            </dl>
            {draftable && (
                <section className="playerCard__footer d--flex flex-justify-end">
                    <button type="button" onClick={() => { draftPlayer(RANK) }}>Draft</button>
                </section>
            )}
        </article>
    );     
} 

// export default connect(mapStateToProps)(PlayerCard);
export default PlayerCard;