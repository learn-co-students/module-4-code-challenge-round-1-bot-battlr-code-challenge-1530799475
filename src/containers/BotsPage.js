import React from "react";

import BotCollection from "./BotCollection";
import YourBotArmy from "./YourBotArmy";
import BotSpecs from "../components/BotSpecs";

const URL = "https://bot-battler-api.herokuapp.com/api/v1/bots";
class BotsPage extends React.Component {
	//start here with your code for step one
	constructor(props) {
		super(props);
		this.state = {
			bots: [],
			army: [],
			specsView: null
		};
		this.addToArmy = this.addToArmy.bind(this);
		this.showSpecs = this.showSpecs.bind(this);
		this.goBack = this.goBack.bind(this);
	}

	addToArmy(bot) {
		if (this.state.army.find(armyBot => armyBot.id === bot.id)) {
			this.setState({
				army: this.state.army.filter(armyBot => armyBot.id !== bot.id)
			});
		} else {
			this.setState({ army: [...this.state.army, bot] });
		}
		this.setState({ specsView: null });
	}

	componentDidMount() {
		this.fetchBots();
	}

	fetchBots() {
		fetch(URL)
			.then(resp => resp.json())
			.then(json => this.setState({ bots: json }));
	}

	showSpecs(bot) {
		this.setState({ specsView: bot.id });
	}

	goBack() {
		this.setState({ specsView: null });
	}

	render() {
		return (
			<div>
				<YourBotArmy
					army={this.state.army}
					addToArmy={this.addToArmy}
					showSpecs={this.showSpecs}
				/>
				{this.state.specsView === null ? (
					<BotCollection
						bots={this.state.bots}
						addToArmy={this.addToArmy}
						showSpecs={this.showSpecs}
					/>
				) : (
					<BotSpecs
						bot={this.state.bots.find(
							bot => bot.id === this.state.specsView
						)}
						goBack={this.goBack}
						addToArmy={this.addToArmy}
					/>
				)}
			</div>
		);
	}
}

export default BotsPage;
