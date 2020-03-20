import React, { useState } from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, text } from '@storybook/addon-knobs';
import MaskedInput, {
    DOLLAR_FORMAT_MASK,
    PERCENT_FORMAT_MASK,
} from '../../src/Inputs/MaskedInput';

storiesOf('MaskedInput', module)
    .addDecorator(withKnobs)
    .add('with dollar formatter', () => {
        const [value, setValue] = useState('90');
        return (
            <MaskedInput
                name="demo"
                label={text('Enter a value', 'Enter a value')}
                placeholder={text('Enter a value', 'Enter a value')}
                description={text('Enter a value', 'Enter a value')}
                realValue={value}
                onRealValueChange={setValue}
                mask={DOLLAR_FORMAT_MASK}
            />
        );
    })
    .add('with percentage formatter', () => {
        const [value, setValue] = useState('0');
        return (
            <MaskedInput
                name="demo"
                label={text('Enter a number', 'Enter a number')}
                description={text(
                    'Enter a number below',
                    'Enter a number below',
                )}
                placeholder={text('10.00', '10.00')}
                realValue={value}
                onRealValueChange={setValue}
                mask={PERCENT_FORMAT_MASK}
            />
        );
    });
