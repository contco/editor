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

export const Menu: any = React.forwardRef(({ ...props }, ref: React.Ref<HTMLDivElement>) => (
  <StyledMenu ref={ref} {...props} />
));

export interface ToolBarProps {}

export const ToolBar: React.FC<ToolBarProps> = () => {
  const ref = useRef();

  return (
    <Menu ref={ref} isFixed style={{ background: 'gray', padding: '7px 25px 6px' }}>
      <MarkButton format="bold" icon={Bold} />
      <MarkButton format="italic" icon={Italic} />
      <MarkButton format="underlined" icon={Underline} />
      <BlockButton format="heading-one" icon={H1} />
      <BlockButton format="heading-two" icon={H2} />
      <BlockButton format="block-quote" icon={Quote} />
      <MarkButton format="code" icon={Coding} />
      <BlockButton format="clear-format" icon={CLEAR_FORMAT} />
    </Menu>
  );
};
