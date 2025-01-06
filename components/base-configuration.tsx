"use client";

import * as React from "react";
import { Plus, Trash2 } from "lucide-react";
import Editor from "@monaco-editor/react";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const defaultJson = {
  type: "object",
  properties: {
    message: {
      type: "string",
    },
  },
};

type Header = {
  key: string;
  value: string;
};

// Update ConfigType to match exactly with the URL slugs from the sidebar
type ConfigType = "api-config" | "test-config" | "execution" | "load-execution";

// Configuration presets based on type
const CONFIG_PRESETS = {
  "api-config": {
    headers: [
      { key: "Content-Type", value: "application/json" },
      { key: "Authorization", value: "Bearer token" },
    ],
    defaultBody: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
  "test-config": {
    headers: [
      { key: "Content-Type", value: "application/json" },
      { key: "Test-Header", value: "test-value" },
    ],
    defaultBody: {
      type: "object",
      properties: {
        testCase: { type: "string" },
        expected: { type: "object" },
      },
    },
  },
  execution: {
    headers: [
      { key: "Content-Type", value: "application/json" },
      { key: "Execution-ID", value: "exec-123" },
    ],
    defaultBody: {
      type: "object",
      properties: {
        executionParams: { type: "object" },
        timeout: { type: "number" },
      },
    },
  },
  "load-execution": {
    headers: [
      { key: "Content-Type", value: "application/json" },
      { key: "Load-Test-ID", value: "load-123" },
    ],
    defaultBody: {
      type: "object",
      properties: {
        concurrent_users: { type: "number" },
        duration: { type: "number" },
      },
    },
  },
};

export function BSEConfiguration() {
  const pathname = usePathname();
  // Extract the last segment of the URL path to determine the config type
  const configType = pathname.split("/").pop() as ConfigType;

  const [activeTab, setActiveTab] = React.useState<
    "header" | "body" | "footer"
  >("header");
  const [jsonContent, setJsonContent] = React.useState(
    JSON.stringify(
      CONFIG_PRESETS[configType]?.defaultBody || defaultJson,
      null,
      2
    )
  );
  const [footerJsonContent, setFooterJsonContent] = React.useState(
    JSON.stringify(defaultJson, null, 2)
  );
  const [headers, setHeaders] = React.useState<Header[]>(
    CONFIG_PRESETS[configType]?.headers || []
  );

  const addHeader = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  const removeHeader = (index: number) => {
    setHeaders(headers.filter((_, i) => i !== index));
  };

  const updateHeader = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle>
            {configType
              .split("-")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="actionType">Action Type</Label>
              <Select defaultValue="socket">
                <SelectTrigger id="actionType">
                  <SelectValue placeholder="Select action type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="socket">Socket Connection</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter name"
                defaultValue="BSE Socket Connection"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="displayName">Display Name</Label>
              <Input
                id="displayName"
                placeholder="Enter display name"
                defaultValue="BSE Socket Connection"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                placeholder="Enter description"
                defaultValue="BSE Socket Connection"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-3 gap-px bg-muted p-2">
            <Button
              variant="ghost"
              className={`flex items-center justify-center rounded-md  p-2 font-medium transition-colors
                ${
                  activeTab === "header"
                    ? "bg-primary/10 text-primary hover:bg-primary/15"
                    : "hover:bg-muted/60"
                }`}
              onClick={() => setActiveTab("header")}
            >
              Message Header
            </Button>
            <Button
              variant="ghost"
              className={`flex items-center justify-center rounded-md  p-2 font-medium transition-colors
                ${
                  activeTab === "body"
                    ? "bg-primary/10 text-primary hover:bg-primary/15"
                    : "hover:bg-muted/60"
                }`}
              onClick={() => setActiveTab("body")}
            >
              Message Body
            </Button>
            <Button
              variant="ghost"
              className={`flex items-center justify-center rounded-md  p-2 font-medium transition-colors
                ${
                  activeTab === "footer"
                    ? "bg-primary/10 text-primary hover:bg-primary/15"
                    : "hover:bg-muted/60"
                }`}
              onClick={() => setActiveTab("footer")}
            >
              Message Footer
            </Button>
          </div>

          {activeTab === "header" && (
            <div className="p-2">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[20px]"></TableHead>
                    <TableHead>Key</TableHead>
                    <TableHead>Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {headers.map((header, index) => (
                    <TableRow key={index}>
                      <TableCell className="py-0 flex items-end justify-center">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeHeader(index)}
                          className="h-6 w-6 pt-5 hover:bg-transparent flex items-center justify-center"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </TableCell>
                      <TableCell className="p-1">
                        <Input
                          value={header.key}
                          onChange={(e) =>
                            updateHeader(index, "key", e.target.value)
                          }
                          placeholder="Enter key"
                          className="h-8"
                        />
                      </TableCell>
                      <TableCell className="p-1">
                        <Input
                          value={header.value}
                          onChange={(e) =>
                            updateHeader(index, "value", e.target.value)
                          }
                          placeholder="Enter value"
                          className="h-8"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button
                variant="outline"
                size="sm"
                className="mt-2 w-full border-dashed"
                onClick={addHeader}
              >
                <Plus className="mr-1 h-3 w-3" /> Add Header
              </Button>
            </div>
          )}

          {activeTab === "body" && (
            <div className="h-[400px] w-full border-t">
              <Editor
                height="100%"
                defaultLanguage="json"
                value={jsonContent}
                onChange={(value) => setJsonContent(value || "")}
                theme="vs-light"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  formatOnPaste: true,
                  formatOnType: true,
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
          )}

          {activeTab === "footer" && (
            <div className="h-[400px] w-full border-t">
              <Editor
                height="100%"
                defaultLanguage="json"
                value={footerJsonContent}
                onChange={(value) => setFooterJsonContent(value || "")}
                theme="vs-light"
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  formatOnPaste: true,
                  formatOnType: true,
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
