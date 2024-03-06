import React from 'react'
import { ColorRGBAType, ColorType, RippleDOMRect, RippleElemenetEvent, RippleElementCircle, RippleElementCircleRadius } from '../types'

interface RippleStyledProps {
    elementCircle: RippleElementCircle
    color: ColorType
    rect: RippleDOMRect
    radius: RippleElementCircleRadius
    event: RippleElemenetEvent
}

interface RippleRGBAColor {
    r: ColorRGBAType['R']
    g: ColorRGBAType['G']
    b: ColorRGBAType['B']
    a: ColorRGBAType['A']
}

interface RippleCircleRadius {
    clientX: number
    clientY: number
    rectX: number
    rectY: number
    offWidth: number
    offHeight: number
}

class Ripple {
    private x: number = 0
    private y: number = 0
    private z: number = 0

    private setRippleStyles({ color, elementCircle, event, radius, rect }: RippleStyledProps) {
        elementCircle.classList.add('avioui-ripple')
        elementCircle.style.backgroundColor = color
        elementCircle.style.borderRadius = '50%'
        elementCircle.style.pointerEvents = 'none'
        elementCircle.style.position = 'absolute'
        elementCircle.style.left = event.clientX - rect.left - radius + 'px'
        elementCircle.style.top = event.clientY - rect.top - radius + 'px'
        elementCircle.style.width = elementCircle.style.height = radius * 2 + 'px'
    }

    private getCircleRadius({ clientX, clientY, offHeight, offWidth, rectX, rectY}: RippleCircleRadius) {
        this.x = clientX - rectX > offWidth / 1.5 ? 0 : offWidth
        this.y = clientY - rectY > offHeight / 1.5 ? 0 : offHeight
        this.z = Math.hypot(
            this.x - (clientX - rectX),
            this.y - (clientY - rectY),
        )
        return this.z
    }

    private getParentBackground(element: HTMLElement) {
        const parentBackground = window.getComputedStyle(element).backgroundColor || window.getComputedStyle(element).background
        return parentBackground
    }

    private setRippleColor(color: string): string {
        let rgba: RippleRGBAColor

        const convertHEX = (hex: string): RippleRGBAColor => {
            const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
            hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b)
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
            return result ? {
              r: parseInt(result[1], 16),
              g: parseInt(result[2], 16),
              b: parseInt(result[3], 16),
              a: 1
            } : { r: 0, g: 0, b: 0, a: 0 }
        }

        const getContrast = (color1: RippleRGBAColor, color2: RippleRGBAColor): number => {
            const blendedColor = {
                r: color1.r * color1.a + color2.r * (1 - color1.a),
                g: color1.g * color1.a + color2.g * (1 - color1.a),
                b: color1.b * color1.a + color2.b * (1 - color1.a),
                a: 1
            }
            const brightness1 = (blendedColor.r * 299 + blendedColor.g * 587 + blendedColor.b * 114) / 1000
            const brightness2 = (color2.r * 299 + color2.g * 587 + color2.b * 114) / 1000
            return Math.abs(brightness1 - brightness2)
        }
    
        const rgbaArray = color.match(/\d+/g)?.map(Number)!

        if (color.startsWith('rgba')) {
            const alpha = parseFloat(color.split(',')[3])
            if (alpha === 0) {
                return 'rgba(17, 24, 39, 0.2)'
            }
        }
        
        if(color.startsWith('rgb')) {
            rgba = { r: rgbaArray[0], g: rgbaArray[1], b: rgbaArray[2], a: 1 } 
        } else if (color.startsWith('#')) {
            rgba = { ...convertHEX(color), a: 1 }
        } else {
            return 'rgba(0,0,0,0)'
        }
    
        const applyColor = (getContrast(rgba!, { r: 255, g: 255, b: 255, a: 1 }) > getContrast(rgba!, { r: 0, g: 0, b: 0, a: 1 })) ?
            'rgba(255, 255, 255, 0.3)' : 'rgba(17, 24, 39, 0.2)'
        return applyColor
    }

    new(element: Array<React.RefObject<HTMLElement>>) {
        element.map((el, _) => {
            const currentElement = el.current
            if (!currentElement) return
            currentElement.style.position = 'relative'
            currentElement.style.overflow = 'hidden'
            const rect = currentElement.getBoundingClientRect()

            currentElement.addEventListener('mouseup', (ev) => {
                const radius = this.getCircleRadius({ 
                    clientX: ev.clientX,
                    clientY: ev.clientY,
                    rectY: rect.top,
                    rectX: rect.right,
                    offHeight: currentElement.offsetHeight,
                    offWidth: currentElement.offsetWidth
                })

                const parentBackground = this.getParentBackground(currentElement)
                const createCircle = document.createElement('span')
                createCircle.animate([{ transform: 'scale(0)', opacity: 1 }, { transform: 'scale(1.5)', opacity: 0 }], { duration: 600, easing: 'linear', })
        
                this.setRippleStyles({
                    elementCircle: createCircle,
                    color: this.setRippleColor(parentBackground),
                    rect: rect,
                    radius: radius,
                    event: ev
                })
        
                currentElement.appendChild(createCircle)
                setTimeout(() => createCircle.remove(), 600)
            })
        })
    }

    add(event: React.MouseEvent<HTMLElement, MouseEvent>): void {
        const currentElement = event.currentTarget
        currentElement.style.position = 'relative'
        currentElement.style.overflow = 'hidden'
        const rect = currentElement.getBoundingClientRect()

        const radius = this.getCircleRadius({ 
            clientX: event.clientX,
            clientY: event.clientY,
            rectY: rect.top,
            rectX: rect.right,
            offHeight: currentElement.offsetHeight,
            offWidth: currentElement.offsetWidth
        })
        
        const parentBackground = this.getParentBackground(currentElement)
        const createCircle = document.createElement('span')
        createCircle.animate([{ transform: 'scale(0)', opacity: 1 }, { transform: 'scale(1.5)', opacity: 0 }], { duration: 600, easing: 'linear', })

        this.setRippleStyles({
            elementCircle: createCircle,
            color: this.setRippleColor(parentBackground)!,
            rect: rect,
            radius: radius,
            event: event
        })

        currentElement.appendChild(createCircle)
        setTimeout(() => createCircle.remove(), 600)
    }
}

export default Ripple