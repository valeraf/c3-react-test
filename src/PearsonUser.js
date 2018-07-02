/* eslint-disable no-restricted-globals */
import React, { Component } from "react";

export class PearsonUser extends Component {

    onDeleteUser(id, onDelete) {
        // Asking confirmation, to doublecheck if Delete wasn't clicked occasionally
        if (confirm('Are you sure?')) {
            onDelete(id);
        }
    }

    render() {
        const {
            user: { first_name, last_name, avatar, id },
            onDelete,
        } = this.props;
        return (
            <div className="user">
                <div className="user_content">
                    {
                        avatar &&
                        <div className="user_avatar"><img src={avatar} alt={`${first_name} ${last_name}`} /></div>
                    }
                    <div className="user_name">{`${first_name} ${last_name}`}</div>
                    <a href="javascript:void(0);" className="delete" onClick={() => this.onDeleteUser(id, onDelete)}>delete</a>
                </div>
            </div>
        )
    }
}