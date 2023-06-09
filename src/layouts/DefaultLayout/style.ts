import styled from 'styled-components'

export const LayoutContainer = styled.div`
  max-width: 75rem;
  height: calc(100vh - 2rem);
  margin: 1rem auto;
  padding: 2.5rem;

  background: ${(props) => props.theme['gray-800']};
  border-radius: 8px;

  display: flex;
  flex-direction: column;
`
