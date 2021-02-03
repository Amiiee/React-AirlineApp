import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import AdminHome from "./AdminHome";
import Card from "@material-ui/core/Card";

configure({ adapter: new Adapter() });

describe("<AdminHome/>", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<AdminHome />);
  });

  it("should render wrapper", () => {
    wrapper.setProps({ isAdmin: false });
    expect(wrapper.exists()).toBe(true);
  });

  it("should check wrapper instance", () => {
    expect(wrapper.instance()).toBeTruthy();
  });

  it("should check state content initially", () => {
    expect(wrapper.instance().state.items[0].airline).toBe("");
    expect(wrapper.instance().state.items[0].from).toBe("");
    expect(wrapper.instance().state.items[0].to).toBe("");
    expect(wrapper.instance().state.items[0].departure).toBe("");
    expect(wrapper.instance().state.items[0].arrival).toBe("");
  });

  it("should render <Card /> initially", () => {
    wrapper.setProps({ isAdmin: false });
    expect(wrapper.find(Card)).toHaveLength(1);
  });

  it("should check state content after api call", () => {
    wrapper.instance().state = {
      items: [
        {
          id: 1,
          airline: "AirIndia",
          from: "Delhi",
          to: "Bangalore",
          departure: "10-24-2019 9:00",
          arrival: "10-24-2019 11:00",
        },
      ],
    };
    expect(wrapper.instance().state.items[0].airline).toBe("AirIndia");
    expect(wrapper.instance().state.items[0].from).toBe("Delhi");
    expect(wrapper.instance().state.items[0].to).toBe("Bangalore");
    expect(wrapper.instance().state.items[0].departure).toBe("10-24-2019 9:00");
    expect(wrapper.instance().state.items[0].arrival).toBe("10-24-2019 11:00");
  });

  it("should check <Card /> length", () => {
    wrapper.instance().state = {
      items: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
    };
    expect(wrapper.find(Card)).toHaveLength(1);
    expect(wrapper.instance().state.items).toHaveLength(10);
  });
});
