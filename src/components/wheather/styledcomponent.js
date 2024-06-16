import styled from "styled-components";

export const MainContainer = styled.div`
     color: ${(props) => (props.mode ? "#222222" : "#ffffff")};
     background-color: ${(props) => (props.mode? "#ffffff" : "#222222")};
     height:100%;
     width:100%;
     background-size:cover;
     display:flex;
     flex-direction:column;
     overflow:auto;


`;