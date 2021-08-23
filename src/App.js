// import './App.css';
import './assets/styles/design/design.scss';

import DraftBoard from './components/DraftBoard';
import TeamsView from './components/TeamsView';
import AdminLaunch from './components/AdminLaunch';
import { connect } from 'react-redux';
import { setDraftingTeam } from './actions'

// import { useEffect } from 'react';

const mapStateToProps = (state) => {
	return {
		draftReady: state.draftReady,
		teams: state.teams,
		draftingTeam: state.draftingTeam
	}
}

const mapDispatcherToProps = dispatch => {
	return {
		setDraftingTeam: (team) => dispatch(setDraftingTeam(team))
	}
}

function App({ draftReady, setDraftingTeam, draftingTeam }) {

	return (
		<div className="App">
			<main className="d--flex w--full">
				{draftReady ? (
					<DraftBoard />
				) : (
					<AdminLaunch />
				)}
			</main>
			
		
		</div>
	);
}

export default connect(mapStateToProps, mapDispatcherToProps)(App);
