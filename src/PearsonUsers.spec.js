import React from "react";
import { shallow } from "enzyme";
import { PearsonUsers } from "./PearsonUsers";
import { PearsonUser } from './PearsonUser'

const userMock = [{"id":4,"first_name":"George","last_name":"Bluth","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg"},{"id":2,"first_name":"Janet","last_name":"Weaver","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/josephstein/128.jpg"},{"id":3,"first_name":"Emma","last_name":"Wong","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/olegpogodaev/128.jpg"}];
const resultMock = {"page":1,"per_page":10,"total":12,"total_pages":2,"data":[{"id":1,"first_name":"George","last_name":"Bluth","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg"}]};

describe("PearsonUsers", () => {
  let component;
  window.fetch = jest.fn().mockImplementation(() => {
      var result = new Promise((resolve, reject) => {
        resolve({
          json: () => resultMock
        });
      });

      return result;
  });

  beforeEach(() => {
    component = shallow(<PearsonUsers />);
  });

  it("renders a h1", () => {
    const h1 = component.find("h1");
    expect(h1.text()).toEqual("Pearson User Management");
  });

  it("Should render 3 PearsonUser(s) from state", () => {
    expect(component.render().find('.user').length).toBe(3);
  });

  it("fetchUsers", async () => {
    const ids = [4,2,3];
    const result = await component.instance().fetchUsers(userMock, ids);
    expect(window.fetch).toHaveBeenCalled();
    expect(result).toEqual([...userMock, ...resultMock.data]);
  });

  it("filters existing items on fetchUsers", async () => {
    const ids = [4,2,1];
    const result = await component.instance().fetchUsers(userMock, ids);
    const filteredResults = resultMock.data.filter(user => !ids.includes(user.id))
    expect(result).toEqual([...userMock, ...filteredResults]);
  });

  it("onDelete should delete item from state", async () => {
    const updatedState = [{"id":1,"first_name":"George","last_name":"Bluth","avatar":"https://s3.amazonaws.com/uifaces/faces/twitter/calebogden/128.jpg"}];
    component.instance().onDelete(4)
    component.instance().onDelete(5)
    component.instance().onDelete(6)
    const state = component.state();
    expect(state.users).toEqual(updatedState);
  });

});
