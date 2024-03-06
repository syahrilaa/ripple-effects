import React from "react"

export type ColorType = string
export type ColorRGBAType = { R: number, G: number, B: number, A: number }
export type RippleDOMRect = DOMRect
export type RippleElementCircle = HTMLElement
export type RippleElementCircleRadius = number
export type RippleElemenetEvent = MouseEvent | React.MouseEvent<HTMLElement, MouseEvent>
export type RippleElementChildren = React.ReactNode