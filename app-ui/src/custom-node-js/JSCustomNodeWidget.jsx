import * as React from "react";
import { PortWidget } from "@projectstorm/react-diagrams";

export function JSCustomNodeWidget({ engine, node }) {
  return (
    <div className="custom-node">
      <PortWidget engine={engine} port={node.getPort("in")}>
        <div className="circle-port" />
      </PortWidget>
      <PortWidget engine={engine} port={node.getPort("out")}>
        <div className="circle-port" />
      </PortWidget>
      <div
        className="custom-node-color"
        style={{ backgroundColor: node.color }}
      />
    </div>
  );
}
