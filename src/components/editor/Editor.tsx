"use client";
import { Button, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { postData } from "./actions";

export default function Editor() {
  const [components, setComponents] = useState<FileTypes[]>([
    { value: "", filename: "" },
  ]);
  const [focused, setFocused] = useState(false);
  const router = useRouter();

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newComponents = [...components];
    newComponents[index].value = event.target.value;
    setComponents(newComponents);
  };

  const handleFilenameChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newComponents = [...components];
    newComponents[index].filename = event.target.value;
    setComponents(newComponents);
  };

  const addComponent = () => {
    if (components.length >= 5) return;
    setComponents([...components, { value: "", filename: "" }]);
  };

  const saveComponents = () => {
    postData(components).then((res) => {
      if (res !== null) {
        router.push(res.pathname);
      } else {
        alert("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    });
  };

  const handleRemove = (index: number) => {
    if (components.length === 1) return;
    const newComponents = [...components];
    newComponents.splice(index, 1);
    setComponents(newComponents);
  };

  return (
    <section className="max-w-2xl min-w-[30rem] mx-auto">
      {components.map((component, index) => (
        <div key={index} className="p-2 backdrop-blur-sm rounded-xl ">
          <div className="flex flex-row gap-2 place-items-center">
            <input
              type="text"
              placeholder="Dosya adı"
              value={component.filename}
              onChange={(e) => handleFilenameChange(index, e)}
              className="border rounded-xl w-full bg-transparent h-10 px-3 "
            />
            <button
              className="border-gray-500 border p-2 rounded-xl w-10 h-10"
              onClick={() => handleRemove(index)}
            >
              X
            </button>
          </div>
          <Textarea
            label="Code"
            variant="bordered"
            placeholder="Kodunuzu buraya yapıştırın"
            value={component.value}
            onChange={(e) => handleChange(index, e)}
            onFocusChange={(focus) => {
              setFocused(focus);
            }}
            disableAnimation
            disableAutosize
            aria-label="Code Editor"
            classNames={{
              base: "resize-y min-h-[25rem]",
              input: "resize-y min-h-[25rem]",
            }}
          />
        </div>
      ))}
      <Button onClick={addComponent}>+</Button>
      <Button onClick={saveComponents}>Save</Button>
    </section>
  );
}
