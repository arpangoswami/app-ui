import React from "react";
import styled from "@emotion/styled";

export const Toolbar = styled.div`
  padding: 5px;
  display: flex;
  flex-shrink: 0;
`;

export const Content = styled.div`
  flex-grow: 1;
  height: 100%;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border-radius: 5px;
  overflow: hidden;
`;

export function DemoWorkspaceWidget({ buttons, children }) {
  return (
    <Container>
      <Toolbar>{buttons}</Toolbar>
      <Content>{children}</Content>
    </Container>
  );
}
