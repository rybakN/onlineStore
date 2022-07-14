import { App } from './script/app';
import './main.css';
import { IApp } from './type/IApp';
import * as noUiSlider from 'nouislider';
import 'nouislider/dist/nouislider.css';

export const nonLinearStepSlider = document.getElementById('slider-non-linear-step');
export const snapSlider = document.getElementById('slider-snap');

export function slider1() {

    noUiSlider.create(nonLinearStepSlider, {
        start: [2000, 2022],
        step: 1,
        range: {
            'min': [2000],

            'max': [2022],
        },
    });
    const nonLinearStepSliderValueElement = document.getElementById('slider-non-linear-step-value');
    nonLinearStepSlider.noUiSlider.on('update', function (values) {
        nonLinearStepSliderValueElement.innerHTML = values.join(' - ');
    });
}

export function slider2() {
    noUiSlider.create(snapSlider, {
        start: [1, 20],
        step: 1,
        range: {
            'min': 1,
            'max': 20,
        },
    });
    const snapValues = [
        document.getElementById('slider-snap-value-lower'),
        document.getElementById('slider-snap-value-upper')
    ];
    snapSlider.noUiSlider.on('update', function (values, handle) {
        snapValues[handle].innerHTML = values[handle];
    });
}

slider1();
slider2();

const app: IApp = new App();

app.start();
