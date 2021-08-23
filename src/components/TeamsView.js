import { connect } from 'react-redux';
import TeamCard from './TeamCard';

const mapStateToProps = (state) => {
    return {
        teams: state.teams,
    }
}

function TeamsView({teams}) {
    return (
        <section className="team-view">
            {teams.map(team => (<TeamCard team={team} key={team.name} />))}
        </section>
    );
}

export default connect(mapStateToProps)(TeamsView);