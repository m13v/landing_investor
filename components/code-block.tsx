import { CopyButton } from "./copy-button";

interface CodeBlockProps {
  code: string;
  children: React.ReactNode;
}

export function CodeBlock({ code, children }: CodeBlockProps) {
  return (
    <div className="relative">
      <CopyButton text={code} />
      {children}
    </div>
  );
}
