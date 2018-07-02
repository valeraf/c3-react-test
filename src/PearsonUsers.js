import React, { Component } from "react";
import { PearsonUser } from './PearsonUser';

export class PearsonUsers extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [
        {
          id: 4,
          first_name: "Eve",
          last_name: "Holt",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
        },
        {
          id: 5,
          first_name: "Charles",
          last_name: "Morris",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
        },
        {
          id: 6,
          first_name: "Tracey",
          last_name: "Ramos",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
        }
      ]
    };
  }

  componentDidMount() {
    const { users } = this.state;
    const stateIds = users.map(user => user.id); // -> create an array of IDs from state
    // fetching data and filtering existing users from response
    this.fetchUsers(users, stateIds)
      .then(res => this.updateState(res));
  }

  fetchUsers(users, stateIds) {
    return fetch('https://reqres.in/api/users?page=1&per_page=10')
      .then(res => res.json())
      .then(res => res.data)
      .then(res => {
        // filter existing users from response
        const newResult = Array.isArray(res) ? res.filter(user => !stateIds.includes(user.id)) : [];
        // returning updated/filtered array of users, ready to update the State
        return users.concat(newResult);
      });
  }

  updateState(fetchedUsers) {
    this.setState({
      users: fetchedUsers,
    })
  }

  onDelete = (id) => {
    const { users } = this.state;
    // removing element by ID
    const updatedUsers = users.filter((user) => user.id !== id);
    this.setState({
      users: updatedUsers,
    })
  }

  renderItems(users) {
    return users.map((user) => <PearsonUser key={user.id} user={ user } onDelete={ this.onDelete } />)
  }

  render() {
    const { users } = this.state;

    return (
      <div className="pearon-users">
        <h1>Pearson User Management</h1>
        {
          users.length &&
          <div className="users_list">
            {this.renderItems(users)}
          </div>
        }
      </div>
    );
  }
}
