import * as React from "react"
import { Upload, X, File, Image as ImageIcon } from "lucide-react"
import { clx } from "@medusajs/ui"

interface FileUploadProps {
  value?: File[]
  onChange?: (files: File[]) => void
  accept?: string
  multiple?: boolean
  maxSize?: number // in bytes
  maxFiles?: number
  disabled?: boolean
  className?: string
}

export function FileUpload({
  value = [],
  onChange,
  accept,
  multiple = false,
  maxSize = 10 * 1024 * 1024, // 10MB default
  maxFiles = 5,
  disabled = false,
  className
}: FileUploadProps) {
  const [isDragging, setIsDragging] = React.useState(false)
  const [error, setError] = React.useState<string | null>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const validateFiles = (files: File[]): File[] => {
    setError(null)
    const validFiles: File[] = []

    for (const file of files) {
      if (file.size > maxSize) {
        setError(`File "${file.name}" exceeds ${formatSize(maxSize)} limit`)
        continue
      }
      if (accept) {
        const acceptedTypes = accept.split(",").map((t) => t.trim())
        const fileType = file.type
        const fileExt = `.${file.name.split(".").pop()}`
        const isAccepted = acceptedTypes.some(
          (type) => type === fileType || type === fileExt || (type.endsWith("/*") && fileType.startsWith(type.replace("/*", "")))
        )
        if (!isAccepted) {
          setError(`File "${file.name}" type not accepted`)
          continue
        }
      }
      validFiles.push(file)
    }

    return validFiles
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (disabled) return

    const droppedFiles = Array.from(e.dataTransfer.files)
    const validFiles = validateFiles(droppedFiles)
    
    if (multiple) {
      const newFiles = [...value, ...validFiles].slice(0, maxFiles)
      onChange?.(newFiles)
    } else {
      onChange?.(validFiles.slice(0, 1))
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    
    const selectedFiles = Array.from(e.target.files)
    const validFiles = validateFiles(selectedFiles)
    
    if (multiple) {
      const newFiles = [...value, ...validFiles].slice(0, maxFiles)
      onChange?.(newFiles)
    } else {
      onChange?.(validFiles.slice(0, 1))
    }
    
    e.target.value = ""
  }

  const removeFile = (index: number) => {
    const newFiles = value.filter((_, i) => i !== index)
    onChange?.(newFiles)
    setError(null)
  }

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) return <ImageIcon className="w-5 h-5" />
    return <File className="w-5 h-5" />
  }

  return (
    <div className={clx("space-y-3", className)}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={clx(
          "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all",
          isDragging
            ? "border-cyan-500 bg-cyan-500/10"
            : "border-zinc-700 hover:border-zinc-600 bg-zinc-900/50",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleFileSelect}
          disabled={disabled}
          className="hidden"
        />
        
        <Upload className={clx(
          "w-10 h-10 mx-auto mb-4",
          isDragging ? "text-cyan-500" : "text-zinc-500"
        )} />
        
        <p className="text-white font-medium mb-1">
          {isDragging ? "Drop files here" : "Drag and drop files here"}
        </p>
        <p className="text-zinc-500 text-sm mb-3">
          or click to browse
        </p>
        <p className="text-zinc-600 text-xs">
          {accept && `Accepted: ${accept}`}
          {accept && " | "}
          Max size: {formatSize(maxSize)}
          {multiple && ` | Max files: ${maxFiles}`}
        </p>
      </div>

      {error && (
        <p className="text-red-400 text-sm">{error}</p>
      )}

      {value.length > 0 && (
        <div className="space-y-2">
          {value.map((file, index) => (
            <div
              key={`${file.name}-${index}`}
              className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900 border border-zinc-800"
            >
              <div className="text-zinc-400">
                {getFileIcon(file)}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm truncate">{file.name}</p>
                <p className="text-zinc-500 text-xs">{formatSize(file.size)}</p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile(index)
                }}
                className="p-1 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
