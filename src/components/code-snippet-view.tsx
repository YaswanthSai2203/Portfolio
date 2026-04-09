"use client";

import * as React from "react";

const CSHARP_KEYWORDS =
  /\b(async|await|break|case|catch|class|const|continue|default|do|else|enum|false|finally|for|foreach|goto|if|in|interface|internal|is|lock|namespace|new|null|operator|out|override|params|private|protected|public|readonly|ref|return|sealed|sizeof|stackalloc|static|string|struct|switch|this|throw|true|try|typeof|using|var|virtual|void|volatile|while|Task|CancellationToken)\b/g;

function highlightCSharp(code: string): React.ReactNode[] {
  const parts: React.ReactNode[] = [];
  let last = 0;
  let key = 0;
  const re = new RegExp(CSHARP_KEYWORDS.source, "g");
  let m: RegExpExecArray | null;
  while ((m = re.exec(code)) !== null) {
    if (m.index > last) {
      parts.push(
        <span key={key++} className="text-foreground/90">
          {code.slice(last, m.index)}
        </span>,
      );
    }
    parts.push(
      <span key={key++} className="text-sky-400">
        {m[0]}
      </span>,
    );
    last = m.index + m[0].length;
  }
  if (last < code.length) {
    parts.push(
      <span key={key++} className="text-foreground/90">
        {code.slice(last)}
      </span>,
    );
  }
  return parts.length ? parts : [<span key={0}>{code}</span>];
}

export function CodeSnippetView({
  title,
  code,
}: {
  title: string;
  code: string;
}) {
  const lines = code.split("\n");
  return (
    <div className="overflow-hidden rounded-xl border border-border/50 bg-background/90">
      <div className="flex items-center justify-between border-b border-border/40 px-3 py-2">
        <span className="text-xs font-medium text-muted">{title}</span>
        <span className="text-[10px] uppercase text-muted">C#</span>
      </div>
      <pre className="max-h-[min(420px,50vh)] overflow-auto p-4 font-mono text-[11px] leading-relaxed">
        {lines.map((line, i) => (
          <div key={i} className="flex gap-3">
            <span className="w-6 shrink-0 select-none text-right text-muted/50">
              {i + 1}
            </span>
            <span className="min-w-0 flex-1 whitespace-pre-wrap break-all">
              {highlightCSharp(line)}
            </span>
          </div>
        ))}
      </pre>
    </div>
  );
}
