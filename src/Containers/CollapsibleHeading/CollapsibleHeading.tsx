import React from 'react';
import styled from 'styled-components';
import { AngleDown } from '@styled-icons/fa-solid/AngleDown';
import { MainInterface, ResponsiveInterface } from '@Utils/BaseStyles';
import { flex, transition } from '@Utils/Mixins';
import { Heading } from '@Text/Heading';

export interface ICollapsibleHeadingProps extends MainInterface,
        ResponsiveInterface,
        React.HTMLAttributes<HTMLDivElement>{
    title?: string;
    ChildElement?: React.ReactElement;
    isCollapsed?: boolean;
    setCollapsed?: () => void;
};

export const CollapsibleHeading: React.FC<ICollapsibleHeadingProps> = ({
    title,
    ChildElement,
    isCollapsed,
    setCollapsed,
    ...props
}): React.ReactElement => (
    <Wrapper {...props}>
        <Row>
            <Container>
                <Heading bold type="h2" size="1.2rem" padding="0 0 0 5px">
                    {title}
                </Heading>
            </Container>
            <Icon
                as={AngleDown}
                isCollapsed={isCollapsed}
                onClick={setCollapsed}
            />
        </Row>
        {!!isCollapsed && ChildElement}
    </Wrapper>
);

const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    height: auto;
`;
const Row = styled.div`
    ${flex('space-between')};
`;
const Container = styled.div`
    ${flex('row')};
`;
interface IconProps {
    isCollapsed?: boolean;
};
const Icon = styled.svg<IconProps>`
    ${transition(['transform'])}
    transform: rotate(${({ isCollapsed }): string =>
        isCollapsed ? '180deg' : '0'});
    height: 25px;
    margin: 5px 12px;
`;
