import styled from 'styled-components';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

export const Wrapper = styled.div`
  margin: 40px;
  margin-top: 10px;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  //box-shadow: rgba(0, 255, 255, 0.5) 0 0 0 10px;
`;

export const StyledButton = styled(IconButton)`
  // position: fixed;
  // z-index: 100;
  // right: 20px;
  // top: 20px;
`;

export const SiteTitle = styled(Typography)`
  padding: 20px;
`;