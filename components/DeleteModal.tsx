"use-client";

interface DeleteModalProps {
  title: string;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function DeleteModal({
  title,
  onCancel,
  onConfirm,
}: DeleteModalProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-foreground/80 backdrop-blur-sm">
      <div className="bg-background border border-foreground/10 rounded-xl p-6 max-w-md w-full mx-4 shadow-xl">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18"></path>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </div>
          <h3 className="text-xl font-bold text-foreground">
            Delete Learning Path
          </h3>
        </div>

        <p className="text-foreground/80 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-medium text-primary">&quot;{title}&quot;</span>?
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-lg border border-foreground/20 hover:bg-foreground/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg bg-red-600 text-background hover:bg-red-400 transition-colors duration-300"
          >
            Delete Path
          </button>
        </div>
      </div>
    </div>
  );
}
