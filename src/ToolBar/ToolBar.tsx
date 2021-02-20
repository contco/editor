import * as React from 'react';
import { useRef } from 'react';
import { StyledMenu } from '../Helpers/HelperStyle';
import { BlockButton } from '../Helpers/BlockHelper';
import { MarkButton } from '../Helpers/MarkHelper';

// icons
import { ReactComponent as Bold } from '../assets/bold.svg';
import { ReactComponent as Coding } from '../assets/coding.svg';
import { ReactComponent as Italic } from '../assets/italic.svg';
import { ReactComponent as Quote } from '../assets/quote.svg';
import { ReactComponent as Underline } from '../assets/underline.svg';
import { ReactComponent as H1 } from '../assets/h1.svg';
import { ReactComponent as H2 } from '../assets/h2.svg';
import { ReactComponent as CLEAR_FORMAT } from '../assets/clear_format.svg';

const ICON_COLOR = '#b5b9c6';
export const Menu: any = React.forwardRef(({ ...props }, ref: React.Ref<HTMLDivElement>) => (
  <StyledMenu ref={ref} {...props} />
));

export interface ToolBarProps {}

export const ToolBar: React.FC<ToolBarProps> = () => {
  const ref = useRef();

  return (
    <Menu ref={ref} isFixed style={{ padding: '7px 25px 6px' }}>
      <MarkButton format="bold" icon={Bold} iconColor={ICON_COLOR} />
      <MarkButton format="italic" icon={Italic} iconColor={ICON_COLOR} />
      <MarkButton format="underlined" icon={Underline} iconColor={ICON_COLOR} />
      <BlockButton format="heading-one" icon={H1} iconColor={ICON_COLOR} />
      <BlockButton format="heading-two" icon={H2} iconColor={ICON_COLOR} />
      <BlockButton format="block-quote" icon={Quote} iconColor={ICON_COLOR} />
      <MarkButton format="code" icon={Coding} iconColor={ICON_COLOR} />
      <BlockButton format="clear-format" icon={CLEAR_FORMAT} iconColor={ICON_COLOR} />
    </Menu>
  );
};
