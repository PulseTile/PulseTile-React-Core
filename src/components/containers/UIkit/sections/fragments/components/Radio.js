import React, { Component } from 'react';

export default class Radio extends Component {

    state = {
        isRadioTest1: false,
        isRadioTest2: false,
        isRadioInlineChange1: false,
        isRadioInlineChange2: false,
        isRadioInlineChange3: false,
    };

    onRadioChange1 = () => {
        this.setState({
            isRadioTest1: true,
            isRadioTest2: false,
        });
    };

    onRadioChange2 = () => {
        this.setState({
            isRadioTest1: false,
            isRadioTest2: true,
        });
    };

    onRadioInlineChange1 = () => {
        this.setState({
            isRadioInlineChange1: true,
            isRadioInlineChange2: false,
            isRadioInlineChange3: false,
        });
    };

    onRadioInlineChange2 = () => {
        this.setState({
            isRadioInlineChange1: false,
            isRadioInlineChange2: true,
            isRadioInlineChange3: false,
        });
    };

    onRadioInlineChange3 = () => {
        this.setState({
            isRadioInlineChange1: false,
            isRadioInlineChange2: false,
            isRadioInlineChange3: true,
        });
    };

    render() {
        const { isRadioTest1, isRadioTest2, isRadioInlineChange1, isRadioInlineChange2, isRadioInlineChange3 } = this.state;
        return (
            <div id="radio" className="ui-section">
                <strong className="ui-title">Radio</strong>
                <div className="form-group-wrapper">
                    <form action="">
                        <div className="form-group">
                            <div className="input-holder">
                                <div className="input-holder">
                                    <div className="wrap-fcustominp">
                                        <div className="fcustominp" onClick={() => this.onRadioChange1()}>
                                            <input type="radio" id="radioTest1" name="radio-test" checked={isRadioTest1} />
                                            <label for="radioTest1"></label>
                                        </div>
                                        <label className="fcustominp-label">Radio Test 1</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-holder">
                                <div className="input-holder">
                                    <div className="wrap-fcustominp">
                                        <div className="fcustominp" onClick={() => this.onRadioChange2()}>
                                            <input type="radio" id="radioTest2" name="radio-test" checked={isRadioTest2} />
                                            <label for="radioTest2"></label>
                                        </div>
                                        <label className="fcustominp-label">Radio Test 2</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-holder">
                                <div className="input-holder">
                                    <div className="wrap-fcustominp">
                                        <div className="fcustominp-state disabled">
                                            <div className="fcustominp">
                                                <input type="radio" id="radioTest6" name="radio-test" disabled />
                                                <label for="radioTest6"></label>
                                            </div>
                                            <label className="fcustominp-label">Radio Test 3</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="form-group">
                        <div className="input-holder">
                            <div className="input-holder">
                                <div className="wrap-fcustominps-inline">
                                    <div className="wrap-fcustominp">
                                        <div className="fcustominp" onClick={() => this.onRadioInlineChange1()}>
                                            <input type="radio" id="radioTest3" name="radio-test-inline" checked={isRadioInlineChange1} />
                                            <label for="radioTest3"></label>
                                        </div>
                                        <label className="fcustominp-label">Radio Test Inline 1</label>
                                    </div>
                                    <div className="wrap-fcustominp">
                                        <div className="fcustominp" onClick={() => this.onRadioInlineChange2()}>
                                            <input type="radio" id="radioTest4" name="radio-test-inline" checked={isRadioInlineChange2} />
                                            <label for="radioTest4"></label>
                                        </div>
                                        <label className="fcustominp-label">Radio Test Inline 2</label>
                                    </div>
                                    <div className="wrap-fcustominp">
                                        <div className="fcustominp" onClick={() => this.onRadioInlineChange3()}>
                                            <input type="radio" id="radioTest5" name="radio-test-inline" checked={isRadioInlineChange3} />
                                            <label for="radioTest5"></label>
                                        </div>
                                        <label className="fcustominp-label">Radio Test Inline 3</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};
