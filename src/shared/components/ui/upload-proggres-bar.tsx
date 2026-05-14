"use client"

import * as React from "react"
import { Progress } from "@/src/shared/components/ui/progress"

interface ProgressBarProps {
  value?: number
}

export function ProgressBar({ value = 0 }: ProgressBarProps) {
  return <Progress value={value} className="w-full" />
}
