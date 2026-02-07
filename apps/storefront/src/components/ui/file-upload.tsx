import { useState, useRef, useCallback } from "react"
import { clx } from "@medusajs/ui"
import { XMark, ArrowUpTray, DocumentText, Photo } from "@medusajs/icons"

interface FileUploadProps {
  value?: File[]
  onChange?: (files: File[]) => void
  accept?: string
  multiple?: boolean
  maxFiles?: number
  maxSize?: number
  disabled?: boolean
  className?: string
  label?: string
  error?: string
  hint?: string
}

export function FileUpload({
  value = [],
  onChange,
  accept,
  multiple = false,
  maxFiles = 5,
  maxSize = 10 * 1024 * 1024,
  disabled = false,
  className,
  label,
  error,
  hint,
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    if (!disabled) setIsDragging(true)
  }, [disabled])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (disabled) return

    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFiles(droppedFiles)
  }, [disabled])

  const handleFiles = (files: File[]) => {
    let newFiles = files.filter(file => {
      if (maxSize && file.size > maxSize) {
        console.warn(`File ${file.name} exceeds max size`)
        return false
      }
      if (accept) {
        const acceptedTypes = accept.split(",").map(t => t.trim())
        const fileType = file.type
        const fileExt = "." + file.name.split(".").pop()
        if (!acceptedTypes.some(t => fileType.match(t) || fileExt === t)) {
          console.warn(`File ${file.name} type not accepted`)
          return false
        }
      }
      return true
    })

    if (!multiple) {
      newFiles = newFiles.slice(0, 1)
    } else if (maxFiles) {
      newFiles = newFiles.slice(0, maxFiles - value.length)
    }

    onChange?.([...value, ...newFiles])
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(Array.from(e.target.files))
    }
  }

  const removeFile = (index: number) => {
    const newFiles = [...value]
    newFiles.splice(index, 1)
    onChange?.(newFiles)
  }

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB"
    return (bytes / (1024 * 1024)).toFixed(1) + " MB"
  }

  const getFileIcon = (file: File) => {
    if (file.type.startsWith("image/")) {
      return <Photo className="w-5 h-5 text-cyan-400" />
    }
    return <DocumentText className="w-5 h-5 text-neutral-400" />
  }

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-neutral-300 mb-1.5">
          {label}
        </label>
      )}

      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && inputRef.current?.click()}
        className={clx(
          "relative border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all",
          isDragging
            ? "border-cyan-500 bg-cyan-500/10"
            : "border-neutral-700 hover:border-neutral-600",
          disabled && "opacity-50 cursor-not-allowed",
          error && "border-red-500"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleInputChange}
          disabled={disabled}
          className="hidden"
        />
        
        <ArrowUpTray className="w-10 h-10 text-neutral-500 mx-auto mb-4" />
        <p className="text-white font-medium mb-1">
          {isDragging ? "Drop files here" : "Drag & drop files here"}
        </p>
        <p className="text-sm text-neutral-500">
          or <span className="text-cyan-400">browse</span> to upload
        </p>
        {hint && (
          <p className="text-xs text-neutral-600 mt-2">{hint}</p>
        )}
      </div>

      {error && (
        <p className="mt-1 text-sm text-red-400">{error}</p>
      )}

      {value.length > 0 && (
        <ul className="mt-4 space-y-2">
          {value.map((file, index) => (
            <li
              key={`${file.name}-${index}`}
              className="flex items-center gap-3 p-3 bg-neutral-900 border border-neutral-800 rounded-lg"
            >
              {file.type.startsWith("image/") ? (
                <img
                  src={URL.createObjectURL(file)}
                  alt={file.name}
                  className="w-10 h-10 object-cover rounded"
                />
              ) : (
                getFileIcon(file)
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-white truncate">{file.name}</p>
                <p className="text-xs text-neutral-500">{formatFileSize(file.size)}</p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  removeFile(index)
                }}
                className="p-1.5 hover:bg-neutral-800 rounded-lg transition-colors"
              >
                <XMark className="w-4 h-4 text-neutral-400" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
