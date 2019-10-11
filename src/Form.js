import React, { Component } from "react";
import { Form, Submit, Clear, ObjectOf, ArrayOf } from "react-form-mobx";
import Input from "./Input";
import validate from "validate.js";
import { observable, toJS } from "mobx";
import { observer } from "mobx-react";

@observer
class FkForm extends Component {
    @observable formStateData = {
        data: {
            email: "asasd@asdsd."
            // height: 172,
            // starships: ["X-wing", "Imperial shuttle"],
            // colors: {
            //     hair: "blond",
            //     skin: "fair"
            // }
        },
        isValid: true
    };
    @observable myRef = null;

    handleSubmit = (formData, { isValid }) => {
        if (isValid) {
            this.formStateData.data = formData;
            const { data } = toJS(this.formStateData);
            console.info("VALID DATA", data);
        } else {
            // console.info(
            //     "Console --- ",
            //     this.myRef,
            //     this.myRef.formStore.isValid,
            //     this.myRef.formStore.isChecked
            // );
            console.warn("invalid");
        }
    };

    handleValid = b => {
        this.formStateData.isValid = b;
    };

    render() {
        const { data, isValid } = this.formStateData;

        return (
            <div className="container">
                <Form
                    ref={ref => {
                        this.myRef = ref;
                    }}
                    className="form"
                    value={data}
                    onSubmit={this.handleSubmit}
                    onValid={() => {
                        this.handleValid(true);
                    }}
                    onInvalid={() => {
                        this.handleValid(false);
                    }}
                >
                    <Input
                        label="email"
                        name="email"
                        // errorText={"Bad email?"}
                        required
                        validation={v => {
                            let va = validate.single(v, { presence: true, email: true }); //validate({ from: value }, constraints);
                            let [message] = va;
                            va = va === undefined;
                            if (va === false) {
                                /**
                                 * This is how we set error message with error
                                 */
                                throw Error(message);
                            }
                            return va;
                        }}
                    />
                    <Input label="height" name="height" format="integer" />
                    <Input label="date" name="date" format="date" />
                    <Input label="time" name="time" format="time" />
                    <Input label="boolean" name="boolean" format="boolean" />
                    <Input label="dateTime" name="dateTime" format="dateTime" />
                    <Input label="number" name="number" format="number" />
                    <Input
                        label="Enum (One, Two, or Three)"
                        name="enum"
                        enum={["One", "Two", "Three"]}
                    />
                    <ArrayOf name="starships">
                        {(starships, { push, removeBy }) => (
                            <div className="array">
                                {starships.map(starship => (
                                    <div key={starship}>
                                        <Input
                                            label="starship"
                                            name={starship}
                                            display="inline-block"
                                        />
                                        <button type="button" onClick={removeBy(starship)}>
                                            remove
                                        </button>
                                    </div>
                                ))}
                                <button type="button" onClick={push}>
                                    add starship
                                </button>
                            </div>
                        )}
                    </ArrayOf>
                    <ObjectOf name="colors">
                        <Input label="hair color" name="hair" defaultValue="black" />
                        <Input label="skin color" name="skin" />
                    </ObjectOf>

                    <div className="actions">
                        <Submit>SUBMIT</Submit>
                        <Clear>clear</Clear>
                    </div>
                </Form>
            </div>
        );
    }
}

export default FkForm;
