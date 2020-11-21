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
import { DroppableContainerContents } from './DroppableContainerContents';
import { MainInterface, ResponsiveInterface } from '../../Utils/BaseStyles';

export interface DroppableElementProps extends MainInterface, ResponsiveInterface, React.HTMLAttributes<HTMLDivElement> {
    droppableLabels: string[][],
    isPreview?: boolean,
};

const NO_OF_ITEMS_DELETED = 1;
const REMOVE_NO_ITEMS = 0;
const FIRST_LABEL = 0;

export const DroppableElement: React.FC<DroppableElementProps> = ({
    droppableLabels,
    isPreview,
    ...props
}): React.ReactElement => {
    const [items, setItems] = useState(droppableLabels);

    /**
     * Reorders the draggable elements in a list
     * @param {string[][]} list - list of objects to reorder
     * @param {number} startIndex - index of where the element originates from
     * @param {number} endIndex - index of where the element will be placed
     */
    const reorder = (list: string[][], startIndex: number, endIndex: number): string[][] => {   
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

    const getDraggableComponent = () => {
        droppableLabels.map((droppableLabel, index) => (
            <Draggable
                key={droppableLabel[FIRST_LABEL]}
                draggableId={droppableLabel[FIRST_LABEL]}
                index={index}
                isDragDisabled={isPreview}
            >
                {(providedDraggable: DraggableProvided, snapshotDraggable: DraggableStateSnapshot) => (
                    <Wrapper
                        ref={providedDraggable.innerRef}
                        {...providedDraggable.draggableProps}
                        {...providedDraggable.dragHandleProps}
                        style={providedDraggable.draggableProps.style}
                    >
                        <DroppableContainer isPreview={isPreview} isDragging={snapshotDraggable.isDragging}> 
                            <DroppableContainerContents droppableLabel={droppableLabel} />
                        </DroppableContainer>
                    </Wrapper>
                )}
            </Draggable>
        ))};

    return (
        <Wrapper {...props}>
            <DragDropContext onDragEnd={onDrag}>
                <Droppable droppableId="templateDroppable">
                    {(provided: DroppableProvided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {getDraggableComponent}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </Wrapper>
    );
}

const Wrapper = styled.div``;

interface DroppableContainerProps {
    isDragging?: boolean,
    isColumn?: boolean,
    isPreview?: boolean
};
const DroppableContainer = styled.div<DroppableContainerProps>`
    width: 349px;
    border-radius: 4px;
    margin: 10px;
    ${({ theme, isDragging, isPreview }): string => `
        background-color: ${isPreview ? theme.colors.background : theme.colors.input.default};
        border: ${isDragging? `solid 1px ${theme.colors.text}` : theme.colors.background};
        color: ${isPreview ? theme.colors.border : theme.colors.text}
        padding: ${isPreview ? '0 0 0 0' : '10px 0 0 0'};
        height: ${isPreview ? '10px' : '35px'};
    `}
`;