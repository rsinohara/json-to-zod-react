import React, { useState, useEffect } from "react";
import { jsonToZod } from "json-to-zod";
import copy from "copy-to-clipboard";
import json5 from "json5";

export const JsonToZod = () => {
  const [json, setJson] = useState("{}");
  const [zod, setZod] = useState("");
  const [errors, setErrors] = useState("");
  const [name, setName] = useState("schema");
  const [module, setModule] = useState(false);

  useEffect(() => {
    try {
      setZod(jsonToZod(json5.parse(json), name || "schema", module));
      setErrors("");
    } catch (e) {
      setErrors(`Errors:\n${e}`);
    }
  }, [json, name, module]);

  return (
    <>
      <h1>Json To Zod</h1>
      <div style={{ display: "flex" }}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: 10,
            padding: 10,
            border: "1px solid grey",
          }}
        >
          <b>Schema name</b>
          <input value={name} onChange={(e) => setName(e.target.value)}></input>
          <b>Module</b>
          <input
            type="checkbox"
            checked={module}
            onChange={(e) => setModule(e.target.checked)}
          ></input>
          <b>Json</b>
          <textarea
            style={{ width: 400 }}
            value={json}
            onChange={(e) => setJson(e.target.value)}
          ></textarea>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            margin: 10,
            padding: 10,
            border: "1px solid grey",
          }}
        >
          <b>Result</b>
          <textarea
            style={{
              width: 400,
              color: errors ? "red" : "black",
            }}
            value={errors || zod}
            // @ts-ignore
            onClick={(e) => e.target.select()}
          ></textarea>
          <button
            style={{ width: "100%" }}
            disabled={!!errors}
            onClick={() => copy(zod)}
          >
            Copy
          </button>
        </div>
      </div>
      <a href="https://www.npmjs.com/package/json-to-zod">Get the CLI NPM package here</a>
    </>
  );
};

export default JsonToZod;
