import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Upload, FileType, CheckCircle, X, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface UploadedFile {
  name: string;
  size: number;
  status: "uploading" | "done" | "error";
}

const FileUploadSection = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [dragOver, setDragOver] = useState(false);

  const handleFiles = useCallback((fileList: FileList) => {
    const newFiles: UploadedFile[] = Array.from(fileList).map((f) => ({
      name: f.name,
      size: f.size,
      status: "uploading" as const,
    }));
    setFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload completion
    newFiles.forEach((file, i) => {
      setTimeout(() => {
        setFiles((prev) =>
          prev.map((f) =>
            f.name === file.name && f.status === "uploading"
              ? { ...f, status: "done" }
              : f
          )
        );
      }, 1500 + i * 500);
    });
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files);
    },
    [handleFiles]
  );

  const removeFile = (name: string) => {
    setFiles((prev) => prev.filter((f) => f.name !== name));
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <section id="upload" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Upload Your <span className="text-gradient-primary">STL File</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Drag and drop your 3D model files. We support STL, OBJ, and 3MF formats up to 50MB.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <label
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed p-12 cursor-pointer transition-all duration-300 ${
              dragOver
                ? "border-primary bg-primary/5 glow-primary"
                : "border-border hover:border-primary/50 bg-card"
            }`}
          >
            <input
              type="file"
              accept=".stl,.obj,.3mf"
              multiple
              className="sr-only"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
            />
            <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <Upload className="w-8 h-8 text-primary" />
            </div>
            <p className="text-lg font-semibold text-foreground mb-1">
              Drop your files here
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              or click to browse
            </p>
            <div className="flex gap-2">
              {["STL", "OBJ", "3MF"].map((ext) => (
                <span
                  key={ext}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary"
                >
                  .{ext}
                </span>
              ))}
            </div>
          </label>

          {files.length > 0 && (
            <div className="mt-6 space-y-3">
              {files.map((file) => (
                <motion.div
                  key={file.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-3 p-4 rounded-xl glass"
                >
                  <FileType className="w-5 h-5 text-primary shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatSize(file.size)}
                    </p>
                  </div>
                  {file.status === "uploading" && (
                    <Loader2 className="w-5 h-5 text-primary animate-spin" />
                  )}
                  {file.status === "done" && (
                    <CheckCircle className="w-5 h-5 text-primary" />
                  )}
                  <button
                    onClick={() => removeFile(file.name)}
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
              <Button className="w-full mt-4 glow-primary" size="lg" asChild>
                <Link to="/3d-printing#quote">Get Instant Quote</Link>
              </Button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default FileUploadSection;
