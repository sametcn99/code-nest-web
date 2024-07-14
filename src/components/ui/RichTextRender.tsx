import React from "react";

/**Rich Text Render component props */
type RichTextRenderProps = {
  /**Rich text content */
  content: string;

  /**Class name for the paragraph element */
  className?: React.HTMLProps<HTMLParagraphElement>["className"];

  /**Class name for the link element */
  linkClassName?: React.HTMLProps<HTMLParagraphElement>["className"];
};

const RichTextRender: React.FC<RichTextRenderProps> = ({
  content,
  className = "",
  linkClassName = "",
}) => {
  const renderText = (text: string) => {
    const linkRegex = /(https?:\/\/[^\s]+)/g;
    const links = text.match(linkRegex);

    if (links) {
      return text.split(linkRegex).map((item, index) => {
        if (index % 2 === 0) {
          return item;
        } else {
          return (
            <a
              key={index}
              href={links[index - 1]}
              className={linkClassName}
              target="_blank"
              rel="noopener noreferrer"
            >
              {links[index - 1]}
            </a>
          );
        }
      });
    } else {
      return text;
    }
  };

  const renderContent = () => {
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g;
    const paragraphs = content.split("\n");

    return paragraphs.map((paragraph, index) => (
      <p key={index} className={className}>
        {paragraph.split(emailRegex).map((item, index) =>
          emailRegex.test(item) ? (
            <a key={index} href={`mailto:${item}`} className={linkClassName}>
              {item}
            </a>
          ) : (
            renderText(item)
          ),
        )}
      </p>
    ));
  };

  return <div>{renderContent()}</div>;
};

export default RichTextRender;
