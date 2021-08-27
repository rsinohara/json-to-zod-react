import React, { useState, useEffect } from "react";
import { jsonToZod } from "json-to-zod";
import  styled  from 'styled-components';
import copy from "copy-to-clipboard";
import json5 from "json5";


const JsonArea = styled.textarea<{errors?:string}>`{
  width: 400px;
  color: ${props => props.errors ? "red" : "black"};
  flex-grow: 1;
  margin-top: 5px;
  margin-bottom: 5px;
  min-height: 200px;
}`

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
          <JsonArea
            value={json}
            onChange={(e) => setJson(e.target.value)}
          ></JsonArea>
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
          <JsonArea
            readOnly
            errors={errors}
            value={errors || zod}
          ></JsonArea>
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
