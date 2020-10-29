import { jsx } from 'slate-hyperscript';

const ELEMENT_TAGS: { [key: string]: (el: any) => any } = {
    A: (el) => ({
        type: 'link',
        url: el.getAttribute('href'),
        openInNewTab: el.getAttribute('target') === '_blank',
    }),
    BLOCKQUOTE: () => ({ type: 'block-quote' }),
    CODEBLOCK:()=> ({type:'code-block'}),
    H1: () => ({ type: 'heading-one' }),
    H2: () => ({ type: 'heading-two' }),
    LI: () => ({ type: 'list-item' }),
    OL: () => ({ type: 'numbered-list' }),
    P: () => ({ type: 'paragraph' }),
    UL: () => ({ type: 'bulleted-list' }),
};

const TEXT_TAGS: { [key: string]: (el: any) => any } = {
    CODE: () => ({ code: true }),
    EM: () => ({ italic: true }),
    STRONG: () => ({ bold: true }),
    U: () => ({ underlined: true }),
};

const deserializer = (el: any): any => {
    if (el.nodeType === 3) {
        return el.textContent;
    } else if (el.nodeType !== 1) {
        return null;
    } else if (el.nodeName === 'BR') {
        return '\n';
    }

    const { nodeName } = el;
    let parent = el;

    if (
        nodeName === 'PRE' &&
        el.childNodes[0] &&
        el.childNodes[0].nodeName === 'CODE'
    ) {
        parent = el.childNodes[0];
    }
    const children = Array.from(parent.childNodes).map(deserializer).flat();

    if (el.nodeName === 'BODY') {
        return jsx('fragment', {}, children);
    }
    //serialize elements
    if (ELEMENT_TAGS[nodeName]) {
        const attrs = ELEMENT_TAGS[nodeName](el);
        return jsx('element', attrs, children);
    }
    //deserialize leaf nodes
    if (TEXT_TAGS[nodeName]) {
        const attrs = TEXT_TAGS[nodeName](el);
        return children.map((child) => jsx('text', attrs, child));
    }

    return children;
};

export default deserializer;