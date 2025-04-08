"use client"
import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { InfoIcon, ExternalLinkIcon, DatabaseIcon, TableIcon } from "lucide-react"

const SchemaViewer = () => {
  // Define the schema tables and relationships
  const [activeTable, setActiveTable] = useState<string | null>(null)

  const schemas = [
    {
      id: "retail",
      name: "E-Commerce Retail",
      tables: [
        {
          name: "customers",
          displayName: "Customers",
          description: "Customer master data including contact information and preferences",
          position: { x: 150, y: 100 },
          columns: [
            { name: "customer_id", type: "INT", isPrimary: true, description: "Unique identifier for the customer" },
            { name: "email", type: "VARCHAR(255)", isPrimary: false, description: "Customer email address" },
            { name: "first_name", type: "VARCHAR(100)", isPrimary: false, description: "Customer first name" },
            { name: "last_name", type: "VARCHAR(100)", isPrimary: false, description: "Customer last name" },
            {
              name: "created_at",
              type: "TIMESTAMP",
              isPrimary: false,
              description: "Timestamp of customer account creation",
            },
          ],
        },
        {
          name: "orders",
          displayName: "Orders",
          description: "Order transactions and metadata",
          position: { x: 450, y: 100 },
          columns: [
            { name: "order_id", type: "INT", isPrimary: true, description: "Unique identifier for the order" },
            { name: "customer_id", type: "INT", isPrimary: false, description: "Foreign key to customers table" },
            { name: "order_date", type: "DATE", isPrimary: false, description: "Date when order was placed" },
            { name: "status", type: "VARCHAR(50)", isPrimary: false, description: "Current order status" },
            { name: "total_amount", type: "DECIMAL(10,2)", isPrimary: false, description: "Total order amount" },
          ],
        },
        {
          name: "order_items",
          displayName: "Order Items",
          description: "Individual line items within orders",
          position: { x: 450, y: 300 },
          columns: [
            { name: "item_id", type: "INT", isPrimary: true, description: "Unique identifier for the order item" },
            { name: "order_id", type: "INT", isPrimary: false, description: "Foreign key to orders table" },
            { name: "product_id", type: "INT", isPrimary: false, description: "Foreign key to products table" },
            { name: "quantity", type: "INT", isPrimary: false, description: "Quantity of product ordered" },
            {
              name: "unit_price",
              type: "DECIMAL(10,2)",
              isPrimary: false,
              description: "Price per unit at time of order",
            },
          ],
        },
        {
          name: "products",
          displayName: "Products",
          description: "Product catalog information",
          position: { x: 150, y: 300 },
          columns: [
            { name: "product_id", type: "INT", isPrimary: true, description: "Unique identifier for the product" },
            { name: "name", type: "VARCHAR(255)", isPrimary: false, description: "Product name" },
            {
              name: "category_id",
              type: "INT",
              isPrimary: false,
              description: "Foreign key to product_categories table",
            },
            { name: "price", type: "DECIMAL(10,2)", isPrimary: false, description: "Current product price" },
            { name: "stock_quantity", type: "INT", isPrimary: false, description: "Current inventory quantity" },
          ],
        },
        {
          name: "product_categories",
          displayName: "Product Categories",
          description: "Hierarchical product categorization",
          position: { x: 150, y: 500 },
          columns: [
            { name: "category_id", type: "INT", isPrimary: true, description: "Unique identifier for the category" },
            { name: "name", type: "VARCHAR(100)", isPrimary: false, description: "Category name" },
            { name: "parent_category_id", type: "INT", isPrimary: false, description: "Self-referencing foreign key" },
            { name: "description", type: "TEXT", isPrimary: false, description: "Category description" },
          ],
        },
      ],
      relationships: [
        { from: "customers", to: "orders", fromColumn: "customer_id", toColumn: "customer_id", type: "one-to-many" },
        { from: "orders", to: "order_items", fromColumn: "order_id", toColumn: "order_id", type: "one-to-many" },
        { from: "products", to: "order_items", fromColumn: "product_id", toColumn: "product_id", type: "one-to-many" },
        {
          from: "product_categories",
          to: "products",
          fromColumn: "category_id",
          toColumn: "category_id",
          type: "one-to-many",
        },
        {
          from: "product_categories",
          to: "product_categories",
          fromColumn: "category_id",
          toColumn: "parent_category_id",
          type: "self",
        },
      ],
    },
    {
      id: "iot",
      name: "IoT Monitoring",
      tables: [
        {
          name: "devices",
          displayName: "Devices",
          description: "IoT device registry and metadata",
          position: { x: 150, y: 100 },
          columns: [
            {
              name: "device_id",
              type: "VARCHAR(50)",
              isPrimary: true,
              description: "Unique identifier for the device",
            },
            { name: "device_type", type: "VARCHAR(50)", isPrimary: false, description: "Type of device" },
            { name: "location_id", type: "INT", isPrimary: false, description: "Foreign key to locations table" },
            {
              name: "firmware_version",
              type: "VARCHAR(50)",
              isPrimary: false,
              description: "Current firmware version",
            },
            {
              name: "registered_at",
              type: "TIMESTAMP",
              isPrimary: false,
              description: "Device registration timestamp",
            },
          ],
        },
        {
          name: "locations",
          displayName: "Locations",
          description: "Physical locations where IoT devices are deployed",
          position: { x: 450, y: 100 },
          columns: [
            { name: "location_id", type: "INT", isPrimary: true, description: "Unique identifier for the location" },
            { name: "name", type: "VARCHAR(100)", isPrimary: false, description: "Location name" },
            { name: "address", type: "VARCHAR(255)", isPrimary: false, description: "Physical address" },
            {
              name: "type",
              type: "VARCHAR(50)",
              isPrimary: false,
              description: "Type of location (e.g., warehouse, office)",
            },
          ],
        },
        {
          name: "sensor_data",
          displayName: "Sensor Data",
          description: "Time-series data collected from device sensors",
          position: { x: 150, y: 300 },
          columns: [
            {
              name: "reading_id",
              type: "BIGINT",
              isPrimary: true,
              description: "Unique identifier for the sensor reading",
            },
            { name: "device_id", type: "VARCHAR(50)", isPrimary: false, description: "Foreign key to devices table" },
            { name: "sensor_type", type: "VARCHAR(50)", isPrimary: false, description: "Type of sensor" },
            { name: "value", type: "FLOAT", isPrimary: false, description: "Sensor reading value" },
            { name: "timestamp", type: "TIMESTAMP", isPrimary: false, description: "Time when reading was recorded" },
          ],
        },
        {
          name: "alerts",
          displayName: "Alerts",
          description: "Anomaly detection and alert events",
          position: { x: 450, y: 300 },
          columns: [
            { name: "alert_id", type: "INT", isPrimary: true, description: "Unique identifier for the alert" },
            { name: "device_id", type: "VARCHAR(50)", isPrimary: false, description: "Foreign key to devices table" },
            { name: "alert_type", type: "VARCHAR(50)", isPrimary: false, description: "Type of alert" },
            { name: "severity", type: "VARCHAR(20)", isPrimary: false, description: "Alert severity level" },
            { name: "message", type: "TEXT", isPrimary: false, description: "Alert description" },
            { name: "triggered_at", type: "TIMESTAMP", isPrimary: false, description: "Time when alert was triggered" },
            {
              name: "resolved_at",
              type: "TIMESTAMP",
              isPrimary: false,
              description: "Time when alert was resolved (null if unresolved)",
            },
          ],
        },
      ],
      relationships: [
        { from: "locations", to: "devices", fromColumn: "location_id", toColumn: "location_id", type: "one-to-many" },
        { from: "devices", to: "sensor_data", fromColumn: "device_id", toColumn: "device_id", type: "one-to-many" },
        { from: "devices", to: "alerts", fromColumn: "device_id", toColumn: "device_id", type: "one-to-many" },
      ],
    },
  ]

  // Replace the renderERDiagram function with this improved version
  const renderERDiagram = (schema: any) => {
    const canvasWidth = 800
    const canvasHeight = 600
    const tableWidth = 200
    const tableHeight = 80

    const relationships = useMemo(() => {
      return schema.relationships.map((rel: any, idx: number) => {
        const fromTable = schema.tables.find((t: any) => t.name === rel.from)
        const toTable = schema.tables.find((t: any) => t.name === rel.to)

        if (!fromTable || !toTable) return null

        const fromX = fromTable.position.x + tableWidth / 2
        const fromY = fromTable.position.y + tableHeight / 2
        const toX = toTable.position.x + tableWidth / 2
        const toY = toTable.position.y + tableHeight / 2

        // Calculate control points for the curve
        const midX = (fromX + toX) / 2
        const midY = (fromY + toY) / 2

        // For self-referencing relationships, create a loop
        if (rel.type === "self") {
          return (
            <g key={idx}>
              <path
                d={`M ${fromX + tableWidth / 2} ${fromY} C ${fromX + tableWidth} ${fromY - 50}, ${fromX + tableWidth} ${fromY + 50}, ${fromX + tableWidth / 2} ${fromY}`}
                fill="none"
                stroke="#d1d5db"
                strokeWidth="2"
                className="transition-colors hover:stroke-orange-500"
              />
              <circle
                cx={fromX + tableWidth / 2}
                cy={fromY}
                r="4"
                fill="#d1d5db"
                className="transition-colors hover:fill-orange-500"
              />
            </g>
          )
        }

        // Draw the relationship line
        return (
          <g key={idx}>
            <path
              d={`M ${fromX} ${fromY} Q ${midX} ${midY}, ${toX} ${toY}`}
              fill="none"
              stroke="#d1d5db"
              strokeWidth="2"
              strokeDasharray={rel.type === "many-to-many" ? "5,5" : "none"}
              className="transition-colors hover:stroke-orange-500"
            />

            {/* Add arrow to the end for one-to-many */}
            {rel.type === "one-to-many" && (
              <circle cx={toX} cy={toY} r="4" fill="#d1d5db" className="transition-colors hover:fill-orange-500" />
            )}

            {/* Add a small label for the relationship type */}
            <text
              x={midX}
              y={midY - 10}
              textAnchor="middle"
              fontSize="10"
              fill="#6b7280"
              className="select-none pointer-events-none"
            >
              {rel.type}
            </text>
          </g>
        )
      })
    }, [schema.relationships, schema.tables, tableWidth, tableHeight])

    const tables = useMemo(() => {
      return schema.tables.map((table: any, idx: number) => (
        <g
          key={idx}
          className="cursor-pointer"
          onClick={() => setActiveTable(activeTable === table.name ? null : table.name)}
        >
          <rect
            x={table.position.x}
            y={table.position.y}
            width={tableWidth}
            height={tableHeight}
            rx="5"
            ry="5"
            fill={activeTable === table.name ? "#f97316" : "#f9fafb"}
            stroke={activeTable === table.name ? "#ea580c" : "#e5e7eb"}
            strokeWidth="2"
            className="transition-colors dark:fill-gray-800 dark:stroke-gray-700 hover:fill-orange-100 dark:hover:fill-orange-900/30"
          />
          <text
            x={table.position.x + tableWidth / 2}
            y={table.position.y + 30}
            textAnchor="middle"
            fontSize="14"
            fontWeight="bold"
            fill={activeTable === table.name ? "white" : "#374151"}
            className="select-none pointer-events-none dark:fill-gray-300 font-poppins"
          >
            {table.displayName}
          </text>
          <text
            x={table.position.x + tableWidth / 2}
            y={table.position.y + 50}
            textAnchor="middle"
            fontSize="12"
            fill={activeTable === table.name ? "white" : "#6b7280"}
            className="select-none pointer-events-none dark:fill-gray-400"
          >
            {table.columns.length} columns
          </text>
        </g>
      ))
    }, [schema.tables, activeTable, tableWidth, tableHeight])

    return (
      <div className="relative w-full overflow-auto bg-white dark:bg-gray-900 rounded-lg border border-gray-100 dark:border-gray-700 p-4">
        <svg width={canvasWidth} height={canvasHeight} className="mx-auto">
          {/* Render relationships */}
          {relationships}

          {/* Render tables */}
          {tables}
        </svg>

        {/* Table details panel */}
        {activeTable && (
          <div className="mt-6 border border-gray-100 dark:border-gray-700 rounded-lg p-4 bg-gray-50 dark:bg-gray-800">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800 dark:text-white font-poppins">
                {schema.tables.find((t: any) => t.name === activeTable)?.displayName}
              </h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setActiveTable(null)}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 rounded-full"
              >
                Close
              </Button>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm">
              {schema.tables.find((t: any) => t.name === activeTable)?.description}
            </p>
            <div className="overflow-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-100 dark:bg-gray-900">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Column
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Key
                    </th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {schema.tables
                    .find((t: any) => t.name === activeTable)
                    ?.columns.map((col: any, idx: number) => (
                      <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100 font-medium">{col.name}</td>
                        <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">{col.type}</td>
                        <td className="px-4 py-2 text-sm">
                          {col.isPrimary ? (
                            <span className="px-2 py-1 text-xs rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-200">
                              Primary
                            </span>
                          ) : (
                            <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                              {col.name.includes("_id") ? "Foreign" : ""}
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-2 text-sm text-gray-600 dark:text-gray-300">{col.description}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <Card className="overflow-hidden border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
      <CardHeader className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium text-gray-800 dark:text-white font-poppins flex items-center">
            <DatabaseIcon className="h-5 w-5 mr-2 text-orange-500" />
            Database Schema Explorer
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-2 h-6 w-6">
                    <InfoIcon className="h-4 w-4 text-gray-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    Click on any table in the diagram to view its detailed structure. This interactive schema viewer
                    demonstrates data modeling for different business domains.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="retail" className="w-full">
          <TabsList className="w-full justify-start px-4 pt-2 bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-700 rounded-none">
            {schemas.map((schema) => (
              <TabsTrigger
                key={schema.id}
                value={schema.id}
                className="data-[state=active]:bg-orange-500 data-[state=active]:text-white rounded-full px-4"
                onClick={() => setActiveTable(null)}
              >
                {schema.name}
              </TabsTrigger>
            ))}
          </TabsList>

          {schemas.map((schema) => (
            <TabsContent key={schema.id} value={schema.id} className="mt-0">
              {renderERDiagram(schema)}

              <div className="p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700">
                <h3 className="text-sm font-bold text-gray-800 dark:text-white mb-2 font-poppins flex items-center">
                  <TableIcon className="h-4 w-4 mr-2 text-orange-500" />
                  Sample Query
                </h3>

                <pre className="bg-white dark:bg-gray-900 p-4 rounded-md overflow-auto text-sm text-gray-800 dark:text-gray-200 border border-gray-100 dark:border-gray-700">
                  {schema.id === "retail"
                    ? `SELECT 
c.first_name, 
c.last_name, 
o.order_id, 
o.order_date,
p.name AS product_name,
oi.quantity,
oi.unit_price,
(oi.quantity * oi.unit_price) AS item_total
FROM 
customers c
JOIN 
orders o ON c.customer_id = o.customer_id
JOIN 
order_items oi ON o.order_id = oi.order_id
JOIN 
products p ON oi.product_id = p.product_id
WHERE 
o.order_date >= '2023-01-01'
ORDER BY 
o.order_date DESC, o.order_id;`
                    : `SELECT 
d.device_id,
d.device_type,
l.name AS location_name,
sd.sensor_type,
AVG(sd.value) AS avg_value,
MIN(sd.value) AS min_value,
MAX(sd.value) AS max_value,
COUNT(*) AS reading_count
FROM 
devices d
JOIN 
locations l ON d.location_id = l.location_id
JOIN 
sensor_data sd ON d.device_id = sd.device_id
WHERE 
sd.timestamp >= NOW() - INTERVAL '24 HOURS'
AND sd.sensor_type IN ('temperature', 'humidity')
GROUP BY 
d.device_id, d.device_type, l.name, sd.sensor_type
HAVING 
COUNT(*) > 10
ORDER BY 
l.name, d.device_id;`}
                </pre>

                <div className="mt-4">
                  <h3 className="text-sm font-bold text-gray-800 dark:text-white mb-2 font-poppins">
                    Implementation Notes
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                    {schema.id === "retail"
                      ? "This schema is optimized for an e-commerce data warehouse with star schema principles. For high-volume implementations, consider partitioning the orders table by date and using columnar storage for analytics."
                      : "Time-series data from IoT devices is best stored in a purpose-built time-series database like InfluxDB or TimescaleDB. For very high volume sensor data, implement a hot/warm/cold data strategy with automated tiering."}
                  </p>
                  <Button variant="outline" size="sm" className="flex items-center gap-1 rounded-full">
                    <ExternalLinkIcon className="h-4 w-4" />
                    <span>View Documentation</span>
                  </Button>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
    </Card>
  )
}

export default SchemaViewer

