"use client";
import { useState } from "react";
import { Textarea } from "@nextui-org/react";
import { Select, SelectSection, SelectItem } from "@nextui-org/select";

export default function Editor() {
  const [components, setComponents] = useState([{ value: "", language: "", filename: "" }]);

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newComponents = [...components];
    newComponents[index].value = event.target.value;
    setComponents(newComponents);
  };
  
  const handleLanguageChange = (index: number, event: React.ChangeEvent<HTMLSelectElement>) => {
    const newComponents = [...components];
    newComponents[index].language = event.target.value;
    setComponents(newComponents);
  };
  
  const handleFilenameChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newComponents = [...components];
    newComponents[index].filename = event.target.value;
    setComponents(newComponents);
  };

  const addComponent = () => {
    setComponents([...components, { value: "", language: "", filename: "" }]);
  };

  const saveComponents = () => {
    console.log("Components Data:", components);
  };

  const languages = [
    { key: "javascript", value: "babel", label: "JavaScript" },
    { key: "html", value: "html", label: "HTML" },
    { key: "css", value: "css", label: "CSS" },
    { key: "python", value: "python", label: "Python" },
    { key: "java", value: "java", label: "Java" },
    { key: "cpp", value: "cpp", label: "C++" },
    { key: "ruby", value: "ruby", label: "Ruby" },
  ];

  return (
    <section className="max-w-xs min-w-[30rem]">
      {components.map((component, index) => (
        <div key={index} className="mb-4">
          <input
            type="text"
            placeholder="Enter file name"
            value={component.filename}
            onChange={(e) => handleFilenameChange(index, e)}
            className="mb-2 p-2 border rounded w-full"
          />
          <Select
            onChange={(e) => handleLanguageChange(index, e)}
            aria-label="Select Language"
            placeholder="Select Language"
            value={component.language}
          >
            <SelectSection title="Programming Languages">
              {languages.map((lang) => (
                <SelectItem key={lang.key} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectSection>
          </Select>
          <Textarea
            label="Code"
            variant="bordered"
            placeholder="Enter your code"
            value={component.value}
            onChange={(e) => handleChange(index, e)}
            disableAnimation
            disableAutosize
            aria-label="Code Editor"
            classNames={{
              input: "resize-y min-h-[30rem]",
            }}
          />
        </div>
      ))}
      <button
        onClick={addComponent}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        +
      </button>
      <button
        onClick={saveComponents}
        className="mt-4 ml-4 p-2 bg-green-500 text-white rounded"
      >
        Save
      </button>
    </section>
  );
}
