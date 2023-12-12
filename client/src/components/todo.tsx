import React, { useEffect, useState } from "react"

export interface ITodo {
  id: number,
  content: string
}

export default function Todo ( {content} : ITodo) {
  return (
    <li>
      {content}
    </li>
  )
}