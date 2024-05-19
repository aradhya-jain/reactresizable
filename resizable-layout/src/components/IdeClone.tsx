import React, { useState, useEffect, ChangeEvent } from "react";
import SampleSplitter from "./SampleSplitter";
import { useResizable } from "react-resizable-layout";
import { cn } from "../utils/cn";
import { addData, updateData, getCount } from "../apiService";

const IdeClone: React.FC = (): JSX.Element => {
  const {
    isDragging: isTerminalDragging,
    position: terminalH,
    splitterProps: terminalDragBarProps
  } = useResizable({
    axis: "y",
    initial: 150,
    min: 50,
    reverse: true
  });
  const {
    isDragging: isFileDragging,
    position: fileW,
    splitterProps: fileDragBarProps
  } = useResizable({
    axis: "x",
    initial: 250,
    min: 50
  });
  const {
    isDragging: isPluginDragging,
    position: pluginW,
    splitterProps: pluginDragBarProps
  } = useResizable({
    axis: "x",
    initial: 200,
    min: 50,
    reverse: true
  });

  interface FormData {
    id: string;
    name: string;
  }

  const [formData, setFormData] = useState<FormData>({ id: '', name: '' });
  const [count, setCount] = useState<{ add: number; update: number }>({ add: 0, update: 0 });

  useEffect(() => {
    fetchCount();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAdd = async (): Promise<void> => {
    await addData(formData);
    setFormData({ id: '', name: '' });
    fetchCount();
  };

  const handleUpdate = async (): Promise<void> => {
    await updateData(formData.id, { name: formData.name });
    setFormData({ id: '', name: '' });
    fetchCount();
  };

  const fetchCount = async (): Promise<void> => {
    const countData = await getCount();
    setCount(countData);
  };

  return (
    <div className={"flex flex-column h-screen bg-dark font-mono color-white overflow-hidden"}>
      <div className={"flex grow"}>
        <div className={cn("shrink-0 contents", isFileDragging && "dragging")} style={{ width: fileW }}>
          <div>
            <input
              type="text"
              name="id"
              placeholder="Input Data"
              value={formData.id}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <button onClick={handleAdd}>Add</button>
            <button onClick={handleUpdate}>Update</button>
          </div>
        </div>
        <SampleSplitter isDragging={isFileDragging} {...fileDragBarProps} />
        <div className={"flex grow"}>
          <div className={"grow bg-darker contents"}>Component 2</div>
          <SampleSplitter isDragging={isPluginDragging} {...pluginDragBarProps} />
        </div>
      </div>
      <SampleSplitter dir={"horizontal"} isDragging={isTerminalDragging} {...terminalDragBarProps} />
      <div className={cn("shrink-0 bg-darker contents", isTerminalDragging && "dragging")} style={{ height: terminalH }}>
        <div>
          Component 3
          <div>
            <h2>Operation Count</h2>
            <p>Add Count: {count.add}</p>
            <p>Update Count: {count.update}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdeClone;