import React from 'react';
import { Accordion, AccordionProps } from '../../index';
import { Paragraph } from '../../index';
import { createStoryTitle } from '../../Constants';
import { Meta, Story } from '@storybook/react';

const defaultActiveStyle = () => `
    color: #ee2434;
    font-weight: bold;
`;

export default {
    title: createStoryTitle('Accordion'),
    component: Accordion,
} as Meta;

export const Basic: Story<AccordionProps> = (args) => (
    <Accordion {...args} activeStyle={defaultActiveStyle}>
        {/* @ts-ignore */}
        <section header={'Accordion Header 1'}>
            <Paragraph>{'Accordion children 1'}.</Paragraph>
            <Paragraph>{'Accordion children 1'}.</Paragraph>
            <Paragraph>{'Accordion children 1'}.</Paragraph>
            <Paragraph>{'Accordion children 1'}.</Paragraph>
            <Paragraph>{'Accordion children 1'}.</Paragraph>
        </section>
        {/* @ts-ignore */}
        <section header={'Accordion Header 2'}>
            <Paragraph>{'Accordion children 2'}.</Paragraph>
            <Paragraph>{'Accordion children 2'}.</Paragraph>
            <Paragraph>{'Accordion children 2'}.</Paragraph>
            <Paragraph>{'Accordion children 2'}.</Paragraph>
            <Paragraph>{'Accordion children 2'}.</Paragraph>
        </section>
    </Accordion>
);