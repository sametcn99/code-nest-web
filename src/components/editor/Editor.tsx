"use client";
import { Button, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaEdit } from "react-icons/fa";
import { IoCloseCircleSharp } from "react-icons/io5";
import { postData } from "./actions";

export default function Editor() {
  const router = useRouter();
  const [components, setComponents] = useState<FileTypes[]>([
    { value: "", filename: "" },
  ]);
  const [fileTitleFocused, setFileTitleFocused] = useState(0);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [focusedComponent, setFocusedComponent] = useState<FileTypes>({
    value: "",
    filename: "",
  });

  useEffect(() => {
    const focusedComponent = components[fileTitleFocused];
    setFocusedComponent(focusedComponent);
  }, [components, fileTitleFocused]);

  const handleFilenameChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
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
    postData(components, title, description).then((res) => {
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
    <section className="mx-auto w-full min-w-[20rem] px-4 backdrop-blur-sm">
      <div className="flex flex-col gap-6 rounded-xl">
        <div>
          <h1 className="text-2xl font-bold">Editor</h1>
          <p className="text-sm text-gray-500">
            Kodlarınızı buraya yapıştırın ve kaydedin.
          </p>
        </div>
        <div className="flex flex-col gap-4">
          <Textarea
            value={title}
            placeholder="Başlık girin"
            onChange={(e) => setTitle(e.target.value)}
            className="h-10 w-full rounded-xl bg-transparent focus:outline-none"
          />
          <Textarea
            value={description}
            placeholder="Açıklama girin"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-row place-items-center justify-between gap-2">
          <div className="inline-flex gap-2">
            {components.map((component, index) => (
              <div
                className="inline-flex w-full justify-start gap-2 rounded-xl border"
                key={index}
              >
                <input
                  type="text"
                  placeholder="Dosya adı"
                  value={component.filename}
                  onFocus={() => {
                    setFileTitleFocused(index);
                  }}
                  onChange={(e) => handleFilenameChange(index, e)}
                  className="h-10 w-full bg-transparent px-3 focus:outline-none"
                />
                <button
                  className="h-10 w-10"
                  onClick={() => handleRemove(index)}
                  title="Edit File"
                >
                  <FaEdit />
                </button>
                <button
                  className="h-10 w-10"
                  onClick={() => handleRemove(index)}
                  title="Remove File"
                >
                  <IoCloseCircleSharp />
                </button>
              </div>
            ))}
          </div>
          <Button onClick={addComponent}>+</Button>
        </div>
        <Textarea
          label="Code"
          variant="bordered"
          placeholder="Kodunuzu buraya yapıştırın"
          value={focusedComponent.value}
          disableAnimation
          disableAutosize
          maxRows={500}
          maxLength={10000}
          // Textarea bileşenindeki onChange handler'ını güncelleyin
          onChange={(e) => {
            const newValue = e.target.value;
            setFocusedComponent((prev) => ({ ...prev, value: newValue }));
            // Aynı zamanda components array'ini de güncelleyin
            const newComponents = [...components];
            newComponents[fileTitleFocused].value = newValue;
            setComponents(newComponents);
          }}
          aria-label="Code Editor"
          classNames={{
            base: "resize-y min-h-[25rem]",
            input: "resize-y min-h-[25rem]",
          }}
        />
      </div>
      <Button onClick={saveComponents} className="mt-4 w-full">
        Save
      </Button>
    </section>
  );
}
