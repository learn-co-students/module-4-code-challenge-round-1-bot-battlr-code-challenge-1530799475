import React from "react";

import BotCollection from "./BotCollection";
import YourBotArmy from "./YourBotArmy";

const URL = "https://bot-battler-api.herokuapp.com/api/v1/bots";
class BotsPage extends React.Component {
	//start here with your code for step one
	constructor(props) {
		super(props);
		this.state = {
			bots: [],
			army: []
		};
		this.addToArmy = this.addToArmy.bind(this);
	}

	addToArmy(bot) {
		if (this.state.army.find(armyBot => armyBot.id === bot.id)) {
			this.setState({
				army: this.state.army.filter(armyBot => armyBot.id !== bot.id)
			});
		} else {
			this.setState({ army: [...this.state.army, bot] });
		}
	}

	componentDidMount() {
		this.fetchBots();
	}

	fetchBots() {
		fetch(URL)
			.then(resp => resp.json())
			.then(json => this.setState({ bots: json }));
	}

	render() {
		return (
			<div>
				<YourBotArmy
					army={this.state.army}
					addToArmy={this.addToArmy}
				/>
				<BotCollection
					bots={this.state.bots}
					addToArmy={this.addToArmy}
				/>
			</div>
		);
	}
}

export default BotsPage;
