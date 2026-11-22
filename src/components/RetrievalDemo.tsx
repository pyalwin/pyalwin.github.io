"use client";

import { Database, FileText } from "lucide-react";
import { useState } from "react";

const modes = [
  {
    id: "vector",
    label: "Vector only",
    result: "Finds the termination clause by similarity. The definition and exceptions are missing.",
  },
  {
    id: "hybrid",
    label: "Vector + graph",
    result: "Follows the clause’s links to the definition of “cause” and the exceptions.",
  },
] as const;

export default function RetrievalDemo() {
  const [mode, setMode] = useState<(typeof modes)[number]>(modes[1]);
  const isHybrid = mode.id === "hybrid";

  return (
    <aside className="retrieval-demo" aria-labelledby="retrieval-title">
      <div className="demo-header">
        <h2 id="retrieval-title"><Database size={16} aria-hidden="true" /> EngramDB</h2>
        <span>Retrieval demo</span>
      </div>
      <div className="demo-body">
        <fieldset className="demo-modes">
          <legend className="sr-only">Retrieval method</legend>
          {modes.map((option) => (
            <label key={option.id}>
              <input
                className="sr-only"
                type="radio"
                name="retrieval-method"
                value={option.id}
                checked={mode.id === option.id}
                onChange={() => setMode(option)}
              />
              <span>{option.label}</span>
            </label>
          ))}
        </fieldset>
        <p className="demo-question">“When can we terminate this contract?”</p>
        <div className="demo-graph" data-hybrid={isHybrid} aria-hidden="true">
          <div className="graph-node graph-anchor">
            <FileText size={16} />
            <span>Termination</span>
          </div>
          <div className="graph-edges" />
          <div className="graph-children">
            <div className="graph-node"><span>Definition of cause</span></div>
            <div className="graph-node"><span>Exceptions</span></div>
          </div>
        </div>
        <p className="demo-result" role="status">{mode.result}</p>
      </div>
      <div className="demo-footer">
        <span>Illustrative example</span>
        <a href="#engramdb">About EngramDB</a>
      </div>
    </aside>
  );
}
