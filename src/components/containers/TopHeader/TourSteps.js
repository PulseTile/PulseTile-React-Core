import React from 'react';

function getStepsArray(steps) {
    let result = [];
    for (let i = 0, n = steps.length; i < n; i++) {
        let item = steps[i];
        result[i] = {
            title: (
                <h2 align="left">{item.title}</h2>
            ),
            target: item.target,
            content: (
                <div>
                    <h4 align="left">{item.lowTitle}</h4>
                    <p>{item.content}</p>
                </div>
            ),
            placement: item.placement,
            disableOverlayClicks: true,
            showSkipButton: true,
        }
    }
    return result;
}

const steps = [];

export const tourSteps = getStepsArray(steps);

export const toursStyles = {};

export const locale = {};
