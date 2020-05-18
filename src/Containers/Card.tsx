import React from 'react';
import styled from 'styled-components';
import {
    Main,
    MainInterface,
    Responsive,
    ResponsiveInterface,
} from '../Utils/BaseStyles';
import { transition } from '../Utils/Mixins';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    animated?: boolean;
    flat?: boolean;
}

export const Card: React.FC<CardProps> = ({
    children,
    ...props
}): React.ReactElement => <CardBox {...props}>{children}</CardBox>;

const CardBox = styled.div<CardProps & MainInterface & ResponsiveInterface>`
    background-color: white;

    // Theme Stuff
${({ theme, ...props }): string => `
    border-radius: ${theme.dimensions.radius};
    font-family: ${theme.font.family};
    color: ${theme.colors.text};
    ${Main({
        padding: theme.dimensions.padding.container,
        ...props,
    })}
    `}

    // Flat
    box-shadow: ${({ flat, theme }): string => theme.depth[flat ? 0 : 1]};

    // Animated
    ${({ animated, flat, theme }): string =>
        animated
            ? `
        ${transition(['box-shadow'])}
        &:hover {
            box-shadow: ${theme.depth[flat ? 1 : 2]};
        }
    `
            : ''}

    // Base Styles
    ${Responsive}
`;

export default Card;
