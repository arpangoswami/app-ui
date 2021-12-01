import React, { useState, useEffect } from "react";
import createEngine, {
  DiagramModel,
  DefaultNodeModel,
} from "@projectstorm/react-diagrams";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import { DemoCanvasWidget } from "./DemoCanvasWidget";
import { DemoWorkspaceWidget } from "./DemoWorkspaceWidget";
import Button from "@mui/material/Button";
import axios from "axios";
const CanvasDragToggle = ({ engine, model }) => {
  const [dragAllowed, setDragAllowed] = useState(true);
  const dragDisabled = () => {
    setDragAllowed(false);
    const state = engine.getStateMachine().getCurrentState();
    state.dragCanvas.config.allowDrag = false;
  };
  const dragEnabled = () => {
    setDragAllowed(true);
    const state = engine.getStateMachine().getCurrentState();
    state.dragCanvas.config.allowDrag = true;
  };
  return (
    <DemoWorkspaceWidget
      buttons={[
        <Button
          key={1}
          onClick={dragEnabled}
          disabled={dragAllowed}
          variant="contained"
          color="primary"
        >
          Enable canvas drag
        </Button>,
        <Button
          key={2}
          color="secondary"
          onClick={dragDisabled}
          disabled={!dragAllowed}
          variant="contained"
        >
          Disable canvas drag
        </Button>,
      ]}
    >
      <DemoCanvasWidget>
        <CanvasWidget engine={engine} />
      </DemoCanvasWidget>
    </DemoWorkspaceWidget>
  );
};

export default function BasicConnection() {
  // create an instance of the engine
  const engine = createEngine();
  let sendingObject = {
    components: [],
    links: [],
  };
  // create a diagram model
  const model = new DiagramModel();

  const node1 = new DefaultNodeModel("Source Node", "rgb(0,192,255)");
  const port1 = node1.addOutPort("Source");
  node1.setPosition(100, 100);

  const node2 = new DefaultNodeModel("Destination Node", "rgb(192,255,0)");
  const port2 = node2.addInPort("Destination");
  node2.setPosition(400, 100);

  const link1 = port1.link(port2);
  link1.addLabel("Transfer from source to destination");

  let models = model.addAll(node1, node2, link1);
  useEffect(() => {
    models.forEach((item) => {
      item.registerListener({
        eventDidFire: console.log(item),
      });
      if (item.options.name) {
        let newArr = [
          ...sendingObject.components,
          { id: item.options.id, name: item.options.name },
        ];
        sendingObject.components = newArr;
      } else {
        let newLinks = [
          ...sendingObject.links,
          { src: item.sourcePort.options.id, dest: item.targetPort.options.id },
        ];
        sendingObject.links = newLinks;
      }
      console.log(sendingObject);
      axios.post("http://localhost:3000/api/state/cache", sendingObject, {
        headers: {},
      });
    });
  }, [models]);

  http: engine.setModel(model);
  return (
    <DemoCanvasWidget>
      <CanvasDragToggle
        className="diagram-container"
        engine={engine}
        model={model}
      />
      {/* <CanvasWidget className="diagram-container" engine={engine} /> */}
    </DemoCanvasWidget>
  );
}
