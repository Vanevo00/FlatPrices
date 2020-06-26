import styled from 'styled-components'

export const Heading1 = styled.h1`
  margin-bottom: 1rem;
`

export const Heading1Centered = styled.h1`
  text-align: center;
  margin: 1rem 0;
`

export const Heading2 = styled.h2`
  margin-bottom: 1rem;
`

export const Heading2Centered = styled.h2`
  margin: 1rem 0;
  text-align: center;
`

export const Heading2CenteredColor = styled.h2`
  width: 100%;
  text-align: center;
  color: ${props => props.theme.colors.main};
`

export const Heading3UnderlineColor = styled.h3`
  width: 100%;
  border-bottom: solid 1px ${props => props.theme.colors.main};
  color: ${props => props.theme.colors.main};
  margin: 0 .25rem 1rem .25rem;
`
