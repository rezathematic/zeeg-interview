'use client'
import { useState, useEffect } from 'react'
const BOX_DATA = [
  [1, 1, 1],
  [1, 0, 0],
  [1, 1, 1]
]

type CheckedItem = {
  row: number
  col: number
}

export default function Zeeg() {
  const colCount = BOX_DATA[0].length
  const totalEmptyBoxNumber = BOX_DATA.flat().filter(box => box === 1).length
  const [divChecked, setDivChecked] = useState<CheckedItem[]>([])
  const [isDeselecting, setIsDeselecting] = useState<boolean>(false)

  const isChecked = (row: number, col:number) => {
    return divChecked.find(item => item.row === row && item.col === col)
  }

  // Handlers
  const checkedHandler = (row: number, col:number) => {
    if (!isDeselecting && !isChecked(row, col)) {
      setDivChecked(prev => {
        const newDivChecked = [
          ...prev,
          {
            row: row,
            col: col
          }
        ]

        if (newDivChecked.length === totalEmptyBoxNumber) {
          setIsDeselecting(true)
        }

        return newDivChecked
      })
    }
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (divChecked.length > 0 && isDeselecting) {
        divChecked.shift()
        setDivChecked([...divChecked])
      } else if (divChecked.length === 0 && isDeselecting) {
        setIsDeselecting(false)
      }
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [divChecked, isDeselecting])

  return (
    <main>
      <section className="container mx-auto flex flex-col items-center justify-center gap-8 py-12">
        <h1 className="font-mono text-xl">Interview Assignment</h1>
        <div
          className="flex flex-col gap-4"
          style={{
            pointerEvents: isDeselecting ? 'none' : 'auto'
          }}
        >
          {BOX_DATA.map((row, i) => {
            return (
              <div
                className="flex gap-4"
                style={{
                  columnCount: colCount
                }}
                key={i}
              >
                {row.map((box, j) => {
                  if (box === 1) {
                    return (
                      <div
                        key={j}
                        className={`h-[100px] w-[100px] border border-slate-950 cursor-pointer ${isChecked(i, j) ? 'selected' : ''}`}
                        onClick={() => checkedHandler(i, j)}
                      ></div>
                    )
                  } else {
                    return (
                      <div
                        key={j}
                        className="invisble h-[100px] w-[100px]"
                      ></div>
                    )
                  }
                })}
              </div>
            )
          })}
        </div>
      </section>
    </main>
  )
}
