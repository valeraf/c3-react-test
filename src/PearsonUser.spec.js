import React from "react";
import { shallow } from "enzyme";
import { PearsonUser } from './PearsonUser'

const userMock = {"id":4,"first_name":"George","last_name":"Bluth","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg"};

describe("PearsonUsers", () => {
    let user;
    const spyOnDelete = jest.fn();
    window.confirm = jest.fn(() => true)

    beforeEach(() => {
        user = shallow(<PearsonUser user={ userMock } onDelete={ spyOnDelete } />);
    });

    it("renders PearsonUser", () => {
        expect(user).toBeTruthy();
    });

    it("should render user_name with `first_name last_name`", () => {
        const userName = user.find('.user_name');
        expect(userName.text()).toEqual(`${userMock.first_name} ${userMock.last_name}`);
    });

    it("should render .user_avatar if avatar exists in user props", () => {
        let userAvatar = user.find('.user_avatar');
        expect(userAvatar.length).toBe(1);

        const userMockNoAvatar = {"id":4,"first_name":"George","last_name":"Bluth"};
        user = shallow(<PearsonUser user={ userMockNoAvatar } onDelete={ spyOnDelete } />);
        userAvatar = user.find('.user_avatar');
        expect(userAvatar.length).toBe(0);
    });

    it("should call onDelete when .delete clicked", () => {
        user.find('.delete').simulate('click');
        expect(spyOnDelete).toHaveBeenCalled();
    });
})