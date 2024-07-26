import { cn } from '@/utils/cn'
import React from 'react'

/**Rich Text Render component props */
type RichTextRenderProps = {
  /**Rich text content */
  content?: string

  /**Class name for the paragraph element */
  className?: React.HTMLProps<HTMLParagraphElement>['className']

  /**Class name for the link element */
  linkClassName?: React.HTMLProps<HTMLParagraphElement>['className']

  /**Link target */
  target?: '_blank' | '_self' | '_parent' | '_top'
}

/**
 * Renders rich text content with support for links and email addresses.
 *
 * @param content - The rich text content to render.
 * @param className - The CSS class name for the rendered content.
 * @param linkClassName - The CSS class name for the rendered links.
 * @param target - The target attribute for the rendered links.
 */
const RichTextRender: React.FC<RichTextRenderProps> = ({
  content = '',
  className = '',
  linkClassName = '',
  target = '_blank',
}) => {
  /**
   * Renders a text string with embedded links.
   *
   * @param text - The text string to render.
   * @returns The rendered text with embedded links.
   */
  const renderText = (text: string) => {
    const linkRegex = /(https?:\/\/[^\s]+)/g
    const links = text.match(linkRegex)

    if (links) {
      return text.split(linkRegex).map((item, index) => {
        if (index % 2 === 0) {
          return item
        } else {
          return (
            <a
              key={index}
              href={links[index - 1]}
              className={cn('break-all text-blue-500', linkClassName)}
              target={target}
              rel="noopener noreferrer"
            >
              {links[index - 1]}
            </a>
          )
        }
      })
    } else {
      return text
    }
  }

  /**
   * Renders the rich text content.
   *
   * @returns The rendered rich text content.
   */
  const renderContent = () => {
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g
    const paragraphs = content.split('\n')

    return paragraphs.map((paragraph, index) => (
      <p
        key={index}
        className={cn('inline-flex flex-wrap break-all', className)}
      >
        {paragraph.split(emailRegex).map((item, index) =>
          emailRegex.test(item) ? (
            <a
              key={index}
              href={`mailto:${item}`}
              className={cn('text-blue-500', linkClassName)}
              target={target}
            >
              {item}
            </a>
          ) : (
            renderText(item)
          )
        )}
      </p>
    ))
  }

  return <div>{renderContent()}</div>
}

export default RichTextRender
