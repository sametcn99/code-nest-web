"use client";
import { postData } from "@/actions/editor-actions";
import useValidData from "@/lib/hooks/useValidData";
import { Button, Textarea } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { LuPlus } from "react-icons/lu";
import { toast } from "sonner";

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

  const { isValid, errors } = useValidData(components);

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
    if (components.length >= 7) return;
    setComponents([...components, { value: "", filename: "" }]);
    setFileTitleFocused(components.length);
  };

  const saveComponents = () => {
    if (!isValid) {
      toast.error(errors.join("\n"));
      return;
    }
    postData(components, title, description).then((res) => {
      if (res !== null) router.push(res.pathname);
      else alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    });
  };

  const handleRemove = (index: number) => {
    if (components.length === 1) return;
    const newComponents = [...components];
    newComponents.splice(index, 1);
    setComponents(newComponents);
    setFileTitleFocused(newComponents.length - 1);
  };

  return (
    <section className="container mx-auto min-w-[20rem] rounded-xl p-6 backdrop-blur-sm">
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
            maxLength={80}
            onChange={(e) => setTitle(e.target.value)}
            className="h-10 resize-none rounded-xl bg-transparent focus:outline-none"
          />
          <Textarea
            value={description}
            className="resize-none"
            maxLength={500}
            placeholder="Açıklama girin"
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="flex flex-row place-items-center justify-between gap-2">
          <div className="inline-flex gap-2 overscroll-x-auto">
            {components.map((component, index) => (
              <div
                className="inline-flex w-full justify-start gap-2 rounded-xl border-1 border-[#29292B] hover:border-[#67676b]"
                key={index}
              >
                <input
                  type="text"
                  placeholder="Dosya adı"
                  value={component.filename}
                  maxLength={25}
                  onFocus={() => {
                    setFileTitleFocused(index);
                  }}
                  onChange={(e) => handleFilenameChange(index, e)}
                  className="mb-[1px] h-10 w-full bg-transparent px-3 text-sm placeholder:text-sm focus:outline-none"
                />
                <Button
                  className="bg-transparant flex w-[10px] text-red-600 hover:text-red-600"
                  onClick={() => handleRemove(index)}
                  title="Remove File"
                >
                  <IoClose />
                </Button>
              </div>
            ))}
          </div>
          <Button
            onClick={addComponent}
            className="bg-transparant color-green-600 w-auto"
          >
            <LuPlus />
          </Button>
        </div>
        <Textarea
          className="resize-none"
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
            base: "resize-y min-h-[25rem] ",
            input: "resize-y min-h-[25rem] ",
          }}
        />
      </div>

      <Button onClick={saveComponents} className="mt-4 w-full">
        Save
      </Button>
    </section>
  );
}
