import type React from "react"

interface ChartTooltipProps {
  active?: boolean
  payload?: any[]
  label?: string
}

export const ChartTooltip: React.FC<ChartTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-md p-3 shadow-md">
        <p className="text-sm font-medium text-gray-800 dark:text-gray-200 font-poppins">{`${label}`}</p>
        {payload.map((item, index) => (
          <p key={`item-${index}`} className="text-xs text-gray-600 dark:text-gray-400">
            {`${item.name}: ${item.value}`}
          </p>
        ))}
      </div>
    )
  }

  return null
}

export const Chart = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export const ChartContainer = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>
}

export const ChartLegend = ({ children, className }: { children: React.ReactNode; className?: string }) => {
  return <div className={className}>{children}</div>
}

