"use client";

import { useState, useRef, useCallback } from "react";

interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<unknown>;
  runPython: (code: string) => unknown;
  globals: { get: (name: string) => unknown };
  setStdout: (options: { batched: (text: string) => void }) => void;
  setStderr: (options: { batched: (text: string) => void }) => void;
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

    // Collect stdout and stderr via Pyodide's built-in redirect
    let stdoutText = "";
    let stderrText = "";

    try {
      pyodide.setStdout({
        batched: (text: string) => {
          stdoutText += text + "\n";
        },
      });
      pyodide.setStderr({
        batched: (text: string) => {
          stderrText += text + "\n";
        },
      });

      await pyodide.runPythonAsync(code);

      if (stderrText.trim()) {
        setError(stderrText.trim());
      }
      if (stdoutText.trim()) {
        setOutput(stdoutText.trim());
      } else if (!stderrText.trim()) {
        setOutput("(No output)");
      }
    } catch (err) {
      const msg =
        err instanceof Error ? err.message : "Error running Python code";
      setError(msg);
    } finally {
      setRunning(false);
    }
  }, []);

  return { loading, ready, output, error, running, initialize, runCode };
}
