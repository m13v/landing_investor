import { useMDXComponent } from "next-contentlayer/hooks";
import { CodeBlock } from "./code-block";
import type { MDXComponents } from "mdx/types";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

const components: MDXComponents = {
  pre: ({ children, ...props }: React.ComponentPropsWithoutRef<"pre">) => {
    const codeElement = (children as any)?.props?.children;

    const extractText = (node: any): string => {
      // If it's a string, return it
      if (typeof node === "string") return node;

      // If it's an array, map and join
      if (Array.isArray(node)) {
        return node.map(extractText).join("");
      }

      // If it has children in props
      if (node?.props?.children) {
        return extractText(node.props.children);
      }

      return "";
    };

    const rawCode = extractText(codeElement);

    return (
      <CodeBlock code={rawCode}>
        <pre {...props}>{children}</pre>
      </CodeBlock>
    );
  },
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
};

export function Mdx({ code }: { code: string }) {
  const Component = useMDXComponent(code);
  return (
    <div className="mdx">
      <Component components={components} />
    </div>
  );
}
