import React from 'react';
import { TextLayout, TextLayoutProps } from '@Layouts/TextLayout';

export interface ParagraphProps extends TextLayoutProps {}

export const Paragraph: React.FC<ParagraphProps> = ({
    children,
    ...props
}): React.ReactElement => <TextLayout {...props}>{children}</TextLayout>;

export default Paragraph;
