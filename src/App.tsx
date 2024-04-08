import React, { useState } from "react";
import { invoke } from "@tauri-apps/api/tauri";
// @deno-types="@types/file"
import denoLogo from "../public/deno.svg";
// @deno-types="@types/file"
import tauriLogo from "../public/tauri.svg";
// @deno-types="@types/file"
import reactLogo from "../public/react.svg";

export default function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>

      <div className="row">
        <a href="https://deno.com" target="_blank">
          <img
            src={denoLogo}
            className="logo deno"
            alt="Deno logo bit modified from https://github.com/denolib/high-res-deno-logo"
          />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src={tauriLogo} className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <p>Click on the Tauri, Deno, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>

      <p>{greetMsg}</p>
    </div>
  );
}
