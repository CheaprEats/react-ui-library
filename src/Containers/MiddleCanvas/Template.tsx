import React, { useState } from 'react';
import styled from 'styled-components';
import { 
    DragDropContext, 
    Droppable,
    DroppableProvided,
    Draggable,
    DraggableProvided,
    DraggableStateSnapshot,
    DropResult,
} from 'react-beautiful-dnd';
import { ITemplatePrefill } from './MiddleCanvasTypes';
import { TableComponent } from './TableComponent';
import { DroppableElement } from './DroppableElement';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

export interface TemplateProps extends MainInterface, ResponsiveInterface {
    isPreview?: boolean,
    templatePrefills: ITemplatePrefill
};

const NO_OF_ITEMS_DELETED = 1;
const REMOVE_NO_ITEMS = 0;

export const Template: React.FC<TemplateProps> = ({
    isPreview,
    templatePrefills,
    ...props
}): React.ReactElement => {
    const typedTemplate: ITemplatePrefill[] = Object.values(templatePrefills);
    const [items, setItems] = useState(typedTemplate);

    /**
     * Reorders the draggable elements in a list
     * @param {ITemplatePrefill} list - list of objects to reorder
     * @param {number} startIndex - index of where the element originates from
     * @param {number} endIndex - index of where the element will be placed
     */
    const reorder = (list: ITemplatePrefill[], startIndex: number, endIndex: number): ITemplatePrefill[] => {
        const [removed] = list.splice(startIndex, NO_OF_ITEMS_DELETED);
        list.splice(endIndex, REMOVE_NO_ITEMS, removed);
        return list;
    };
    
    /**
     * Handles the draggable elements when dragged - required function
     * @param {DropResult} result - react-beautiful-dnd object that gives access to source and destination ids
     */
    const onDrag = (result: DropResult): void => {
        const { source, destination } = result;
    
        if(!destination) {
            return;
        }

        const reorderedList = reorder(items, source.index, destination.index);
        setItems(reorderedList);
    };

    /**
     * Returns a header component based on component type
     * @param {componentType} componentType - type of component (like a table)
     * @param {string[][]} labels - labels needed to be mapped in each individual component
     */
    const conditionalHeaderComponent = (componentType: string | undefined, labels: string[][]): React.ReactElement | undefined => {
        switch(componentType) {
        case 'table':
            return (
                <TableComponent 
                    droppableLabels={labels}
                    isPreview={isPreview}
                />
            )
        default: 
            return (
                <DroppableElement
                    droppableLabels={labels}
                    isPreview={isPreview}
                />
            );
        }
    };

    const getDraggableComponent = () => Object.values(items).map((templatePrefill, index) => (
        <Draggable
            key={templatePrefill.title}
            draggableId={templatePrefill.title}
            index={index}
            isDragDisabled={isPreview}
        >
            {(providedDraggable: DraggableProvided, snapshotDraggable: DraggableStateSnapshot) => (
                <DraggableWrapper
                    ref={providedDraggable.innerRef}
                    {...providedDraggable.draggableProps}
                    {...providedDraggable.dragHandleProps}
                    style={providedDraggable.draggableProps.style}
                    isDragging={snapshotDraggable.isDragging}
                >
                    {!isPreview && (
                        <Header>
                            {templatePrefill.title}
                        </Header>
                    )}
                    {conditionalHeaderComponent(templatePrefill.componentType, templatePrefill.labels)}
                </DraggableWrapper>
            )}
        </Draggable>
    ));

    return (
        <Wrapper isPreview={isPreview} {...props}>
            <DragDropContext onDragEnd={onDrag}>
                <Droppable droppableId="templateDroppable">
                    {(provided: DroppableProvided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {getDraggableComponent()}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </Wrapper>
    );
}

interface WrapperProps {
    isPreview?: boolean;
};
const Wrapper = styled.div<WrapperProps>`
    width: 364px;
    font-weight: bold;
    line-height: 1.25;
    margin: 3vh 0;
    padding: auto;
    ${({ theme, isPreview }): string => `
        font-size: ${theme.font.size.small};
        border: dotted 0.5px ${theme.colors.text};
        background-color: ${theme.colors.background};
        padding: ${isPreview ? '10px 0 2px 0' : ''};
    `};
`;

interface DraggableWrapperProps {
    isDragging?: boolean;
};
const DraggableWrapper = styled.div<DraggableWrapperProps>`
    ${({ theme, isDragging }): string => `
        background-color: ${isDragging ? theme.colors.border : theme.colors.background};
        border: ${isDragging? `solid 1px ${theme.colors.text}` : theme.colors.background};
        padding-bottom: 10px;
    `};
`;

const Header = styled.div`
    margin: 5px 0 0 5px;
`;