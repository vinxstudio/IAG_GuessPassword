import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { linkTo } from "@storybook/addon-links";
import { specs, describe, it } from "storybook-addon-specifications";

import Enzyme, { shallow, mount } from "enzyme";
import expect from "expect";

import GuessPassword from "../src/client/App";
import Adapter from "enzyme-adapter-react-16";

initStoryshots({ /* configuration options */ });
Enzyme.configure({ adapter: new Adapter() });

const ButtonStories = storiesOf("GuessPassword", module);

ButtonStories.add("GuessPassword", function() {
    
    const story = (<GuessPassword/>);

    specs(() =>
        describe("Guess Password Component", () => {
            it("Renders", () => {
                const wrapper = shallow(<GuessPassword />);
                expect(wrapper.exists()).toBe(true);
            });
        })
    );

    return story;
});

