interface ContentBlockProps {
  block: {
    type: 'text' | 'image' | 'video' | 'quote' | 'cta' | 'gallery'
    content?: string
    src?: string
    alt?: string
    author?: string
    buttonText?: string
    buttonLink?: string
    images?: { url: string; alt?: string }[]
  }
}

export function ContentBlock({ block }: ContentBlockProps) {
  switch (block.type) {
    case 'text':
      return (
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: block.content || '' }}
        />
      )

    case 'image':
      return (
        <figure className="my-8">
          <img 
            src={block.src} 
            alt={block.alt || ''} 
            className="w-full rounded-lg"
          />
          {block.alt && (
            <figcaption className="text-center text-sm text-gray-500 mt-2">
              {block.alt}
            </figcaption>
          )}
        </figure>
      )

    case 'video':
      return (
        <div className="my-8 aspect-video">
          <iframe
            src={block.src}
            title={block.alt || 'Video'}
            className="w-full h-full rounded-lg"
            allowFullScreen
          />
        </div>
      )

    case 'quote':
      return (
        <blockquote className="my-8 border-l-4 border-gray-300 pl-6 py-2">
          <p className="text-xl italic text-gray-700">{block.content}</p>
          {block.author && (
            <cite className="text-sm text-gray-500 mt-2 block">- {block.author}</cite>
          )}
        </blockquote>
      )

    case 'cta':
      return (
        <div className="my-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-8 text-center text-white">
          <p className="text-xl font-medium mb-4">{block.content}</p>
          {block.buttonLink && (
            <a 
              href={block.buttonLink}
              className="inline-block px-6 py-3 bg-white text-blue-600 font-medium rounded-lg hover:bg-gray-100"
            >
              {block.buttonText || 'Learn More'}
            </a>
          )}
        </div>
      )

    case 'gallery':
      return (
        <div className="my-8 grid grid-cols-2 md:grid-cols-3 gap-4">
          {block.images?.map((image, index) => (
            <img 
              key={index}
              src={image.url} 
              alt={image.alt || ''} 
              className="w-full aspect-square object-cover rounded-lg"
            />
          ))}
        </div>
      )

    default:
      return null
  }
}
