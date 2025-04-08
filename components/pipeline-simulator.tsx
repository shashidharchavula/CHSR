"use client"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlayIcon, PauseIcon, RefreshCwIcon, InfoIcon } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

type DataPacket = {
  id: number
  status: "source" | "transform" | "load" | "complete"
  x: number
  y: number
  color: string
}

const PipelineSimulator = () => {
  const [isRunning, setIsRunning] = useState(false)
  const [packets, setPackets] = useState<DataPacket[]>([])
  const [packetCount, setPacketCount] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationFrameRef = useRef<number>(0)
  const packetsRef = useRef<DataPacket[]>([]) // Ref to hold the latest packets

  // Define the pipeline stages and their positions
  const stages = {
    source: { x: 100, y: 100, width: 120, height: 60, label: "Data Sources" },
    transform: { x: 350, y: 100, width: 120, height: 60, label: "Transform" },
    load: { x: 600, y: 100, width: 120, height: 60, label: "Load" },
  }

  // Lines connecting the stages
  const connections = [
    { from: "source", to: "transform" },
    { from: "transform", to: "load" },
  ]

  // Create a new data packet at random intervals
  useEffect(() => {
    if (!isRunning) return

    const interval = setInterval(() => {
      if (packets.length < 25) {
        const newPacket: DataPacket = {
          id: packetCount,
          status: "source",
          x: stages.source.x + stages.source.width / 2,
          y: stages.source.y + stages.source.height / 2,
          color: `hsl(${Math.floor(Math.random() * 30) + 20}, 90%, 60%)`, // Orange-ish hues
        }

        setPackets((prev) => [...prev, newPacket])
        setPacketCount((prev) => prev + 1)
      }
    }, 500)

    return () => clearInterval(interval)
  }, [isRunning, packets.length, packetCount])

  // Move packets through the pipeline
  useEffect(() => {
    if (!isRunning || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    packetsRef.current = packets // Update the ref with the latest packets

    // Store animation frame ID for cleanup
    let animationFrameId = 0

    const drawPipeline = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw connections (lines between stages)
      ctx.strokeStyle = "#e2e8f0"
      ctx.lineWidth = 3

      connections.forEach((conn) => {
        const fromStage = stages[conn.from]
        const toStage = stages[conn.to]

        ctx.beginPath()
        ctx.moveTo(fromStage.x + fromStage.width, fromStage.y + fromStage.height / 2)
        ctx.lineTo(toStage.x, toStage.y + toStage.height / 2)
        ctx.stroke()

        // Draw arrow
        ctx.fillStyle = "#e2e8f0"
        ctx.beginPath()
        ctx.moveTo(toStage.x - 10, toStage.y + toStage.height / 2 - 5)
        ctx.lineTo(toStage.x, toStage.y + toStage.height / 2)
        ctx.lineTo(toStage.x - 10, toStage.y + toStage.height / 2 + 5)
        ctx.fill()
      })

      // Draw stages (boxes)
      Object.entries(stages).forEach(([key, stage]) => {
        // Create gradient for boxes
        const gradient = ctx.createLinearGradient(stage.x, stage.y, stage.x + stage.width, stage.y + stage.height)
        gradient.addColorStop(0, "#f97316")
        gradient.addColorStop(1, "#ea580c")

        ctx.fillStyle = gradient
        ctx.strokeStyle = "#c2410c"
        ctx.lineWidth = 2

        // Draw rounded rectangle
        ctx.beginPath()
        const radius = 8
        ctx.moveTo(stage.x + radius, stage.y)
        ctx.lineTo(stage.x + stage.width - radius, stage.y)
        ctx.quadraticCurveTo(stage.x + stage.width, stage.y, stage.x + stage.width, stage.y + radius)
        ctx.lineTo(stage.x + stage.width, stage.y + stage.height - radius)
        ctx.quadraticCurveTo(
          stage.x + stage.width,
          stage.y + stage.height,
          stage.x + stage.width - radius,
          stage.y + stage.height,
        )
        ctx.lineTo(stage.x + radius, stage.y + stage.height)
        ctx.quadraticCurveTo(stage.x, stage.y + stage.height, stage.x, stage.y + stage.height - radius)
        ctx.lineTo(stage.x, stage.y + radius)
        ctx.quadraticCurveTo(stage.x, stage.y, stage.x + radius, stage.y)
        ctx.closePath()
        ctx.fill()
        ctx.stroke()

        // Add text shadow for better readability
        ctx.fillStyle = "rgba(0, 0, 0, 0.2)"
        ctx.font = "bold 14px 'Poppins', sans-serif"
        ctx.textAlign = "center"
        ctx.textBaseline = "middle"
        ctx.fillText(stage.label, stage.x + stage.width / 2 + 1, stage.y + stage.height / 2 + 1)

        // Draw text
        ctx.fillStyle = "white"
        ctx.fillText(stage.label, stage.x + stage.width / 2, stage.y + stage.height / 2)
      })

      // Update packet positions and draw them
      const updatedPackets = packetsRef.current
        .map((packet) => {
          let { status, x, y } = packet

          // Move packet based on its current status
          if (status === "source") {
            if (x < stages.transform.x - 15) {
              x += 3
            } else {
              status = "transform"
            }
          } else if (status === "transform") {
            if (x < stages.load.x - 15) {
              x += 3
            } else {
              status = "load"
            }
          } else if (status === "load") {
            if (x < stages.load.x + stages.load.width + 50) {
              x += 3
            } else {
              status = "complete"
            }
          }

          return { ...packet, status, x, y }
        })
        .filter((packet) => packet.status !== "complete")

      // Draw each packet with glow effect
      updatedPackets.forEach((packet) => {
        // Draw glow
        const glow = ctx.createRadialGradient(packet.x, packet.y, 0, packet.x, packet.y, 12)
        glow.addColorStop(0, packet.color)
        glow.addColorStop(1, "rgba(255, 255, 255, 0)")
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(packet.x, packet.y, 12, 0, Math.PI * 2)
        ctx.fill()

        // Draw packet
        ctx.fillStyle = packet.color
        ctx.beginPath()
        ctx.arc(packet.x, packet.y, 6, 0, Math.PI * 2)
        ctx.fill()

        // Add highlight
        ctx.fillStyle = "rgba(255, 255, 255, 0.7)"
        ctx.beginPath()
        ctx.arc(packet.x - 2, packet.y - 2, 2, 0, Math.PI * 2)
        ctx.fill()
      })

      // Only update state if packets have actually changed
      if (JSON.stringify(updatedPackets) !== JSON.stringify(packetsRef.current)) {
        // Use a timeout to avoid updating state during render
        setTimeout(() => {
          setPackets(updatedPackets)
        }, 0)
      }

      animationFrameId = requestAnimationFrame(drawPipeline)
    }

    animationFrameId = requestAnimationFrame(drawPipeline)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [isRunning]) // Only depend on isRunning, not packets

  const toggleSimulation = () => {
    setIsRunning((prev) => !prev)
  }

  const resetSimulation = () => {
    setIsRunning(false)
    setPackets([])
    setPacketCount(0)

    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext("2d")
      if (ctx) {
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      }
    }
  }

  return (
    <Card className="overflow-hidden border border-gray-100 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm">
      <CardHeader className="border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50 pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-medium text-gray-800 dark:text-white font-poppins flex items-center">
            ETL Pipeline Visualization
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="ml-2 h-6 w-6">
                    <InfoIcon className="h-4 w-4 text-gray-500" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="max-w-xs">
                    This visualization demonstrates data flowing through an ETL pipeline from source systems through
                    transformation to the data warehouse.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardTitle>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={toggleSimulation}
              className="flex items-center gap-1 rounded-full h-8"
            >
              {isRunning ? (
                <>
                  <PauseIcon className="h-4 w-4" /> Pause
                </>
              ) : (
                <>
                  <PlayIcon className="h-4 w-4" /> Start
                </>
              )}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={resetSimulation}
              className="flex items-center gap-1 rounded-full h-8"
            >
              <RefreshCwIcon className="h-4 w-4" /> Reset
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="bg-white dark:bg-gray-900 relative">
          <canvas ref={canvasRef} width={800} height={200} className="w-full h-full" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 border-t border-gray-100 dark:border-gray-700">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-800 dark:text-white mb-2 font-poppins">Data Extraction</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300">Sources: Database, API, Streaming, Files</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-800 dark:text-white mb-2 font-poppins">
                Data Transformation
              </h3>
              <p className="text-xs text-gray-600 dark:text-gray-300">Cleaning, Enrichment, Aggregation, Filtering</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
              <h3 className="text-sm font-medium text-gray-800 dark:text-white mb-2 font-poppins">Data Loading</h3>
              <p className="text-xs text-gray-600 dark:text-gray-300">Data Warehouse, Data Lake, Analytical Storage</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PipelineSimulator

