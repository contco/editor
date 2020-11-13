import styled from 'styled-components';

const Code = styled.code`
  padding: 5px;
  color: ${({ theme }) => (theme.colors !== undefined ? theme.colors.text : '#050b21')};
  background: ${({ theme }) => (theme.colors !== undefined ? theme.colors.codeblock : '#050b210d')};
`;
export default Code;
