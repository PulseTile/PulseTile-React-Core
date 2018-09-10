import React from 'react';

function getStepsArray(steps) {
    let result = [];
    for (let i = 0, n = steps.length; i < n; i++) {
        let item = steps[i];
        result[i] = {
            title: item.title,
            target: item.target,
            content: item.content,
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
