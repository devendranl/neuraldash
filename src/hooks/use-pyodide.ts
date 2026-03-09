"use client";

import { useState, useRef, useCallback } from "react";

interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<unknown>;
  globals: { get: (name: string) => unknown };
}

declare global {
  interface Window {
    loadPyodide?: (config: { indexURL: string }) => Promise<PyodideInterface>;
  }
}

const PYODIDE_CDN = "https://cdn.jsdelivr.net/pyodide/v0.27.7/full";

let pyodidePromise: Promise<PyodideInterface> | null = null;

function loadPyodideSingleton(): Promise<PyodideInterface> {
  if (pyodidePromise) return pyodidePromise;

  pyodidePromise = new Promise<PyodideInterface>((resolve, reject) => {
    // Load the script if not already loaded
    if (window.loadPyodide) {
      window
        .loadPyodide({ indexURL: PYODIDE_CDN })
        .then(resolve)
        .catch(reject);
      return;
    }

    const script = document.createElement("script");
    script.src = `${PYODIDE_CDN}/pyodide.js`;
    script.onload = () => {
      if (!window.loadPyodide) {
        reject(new Error("Pyodide failed to load"));
        return;
      }
      window
        .loadPyodide({ indexURL: PYODIDE_CDN })
        .then(resolve)
        .catch(reject);
    };
    script.onerror = () => {
      pyodidePromise = null;
      reject(new Error("Failed to load Pyodide script"));
    };
    document.head.appendChild(script);
  });

  return pyodidePromise;
}

export function usePyodide() {
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const pyodideRef = useRef<PyodideInterface | null>(null);

  const initialize = useCallback(async () => {
    if (pyodideRef.current) {
      setReady(true);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const pyodide = await loadPyodideSingleton();
      pyodideRef.current = pyodide;
      setReady(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to initialize Pyodide"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const runCode = useCallback(async (code: string) => {
    const pyodide = pyodideRef.current;
    if (!pyodide) {
      setError("Pyodide not initialized");
      return;
    }

    setRunning(true);
    setOutput("");
    setError(null);

    try {
      // Redirect stdout/stderr to capture output
      const wrappedCode = `
import sys, io
__stdout = io.StringIO()
__stderr = io.StringIO()
sys.stdout = __stdout
sys.stderr = __stderr
try:
${code
  .split("\n")
  .map((line) => "    " + line)
  .join("\n")}
except Exception as __e:
    print(str(__e), file=sys.stderr)
finally:
    sys.stdout = sys.__stdout
    sys.stderr = sys.__stderr
(__stdout.getvalue(), __stderr.getvalue())
`;
      const result = await pyodide.runPythonAsync(wrappedCode);
      const [stdout, stderr] = result as [string, string];

      if (stderr) {
        setError(stderr);
      }
      setOutput(stdout);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Error running Python code"
      );
    } finally {
      setRunning(false);
    }
  }, []);

  return { loading, ready, output, error, running, initialize, runCode };
}
