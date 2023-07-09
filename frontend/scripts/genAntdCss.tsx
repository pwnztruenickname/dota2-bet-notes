import fs from "fs";
import { extractStyle } from "@ant-design/static-style-extract";
import withTheme from "../src/theme";

const outputPath = "./public/antd.min.css";

const css = extractStyle(withTheme);

fs.writeFileSync(outputPath, css);

console.log(`🎉 Antd CSS generated at ${outputPath}`);
